import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

    if (clientId && clientSecret && refreshToken) {
      // Fetch access token
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      })

      const tokenData = await tokenRes.json()

      if (tokenData.access_token) {
        // Fetch currently playing
        const nowPlayingRes = await fetch(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        )

        if (nowPlayingRes.status === 200) {
          const song = await nowPlayingRes.json()
          if (song.is_playing && song.item) {
            return NextResponse.json({
              isPlaying: true,
              title: song.item.name,
              artist: song.item.artists.map((a: { name: string }) => a.name).join(', '),
              album: song.item.album.name,
              albumImageUrl: song.item.album.images[0]?.url,
              songUrl: song.item.external_urls.spotify,
            })
          }
        }
      }
    }

    // Default curated track fallback when API credentials aren't configured yet
    return NextResponse.json({
      isPlaying: true,
      title: 'Lofi Coding Beats & Chill Chillout',
      artist: 'Lofi Girl · Deep Focus',
      album: 'Coding Sessions Vol. 4',
      albumImageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80',
      songUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX8Ueb2CJPPq1',
      isFallback: true,
    })
  } catch (error) {
    return NextResponse.json({
      isPlaying: true,
      title: 'Flutter Developer Focus Beats',
      artist: 'Ambient Chill',
      album: 'Deep Work Session',
      albumImageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80',
      songUrl: 'https://open.spotify.com',
      isFallback: true,
    })
  }
}
