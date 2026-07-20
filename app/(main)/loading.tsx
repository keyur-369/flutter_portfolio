export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-10 px-4">
      <div className="relative">
        {/* Spinner card — orange theme */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl animate-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(254,127,45,0.15), rgba(35,61,77,0.25))',
            border: '1px solid rgba(254,127,45,0.2)',
          }}
        >
          <div className="w-8 h-8 rounded-full animate-spin"
            style={{
              border: '2px solid rgba(254,127,45,0.2)',
              borderTopColor: '#FE7F2D',
            }}
          />
        </div>
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl -z-10 animate-pulse blur-xl"
          style={{ background: 'rgba(254,127,45,0.12)' }} />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest animate-pulse"
        style={{ color: 'rgba(254,127,45,0.75)' }}
      >
        Loading...
      </p>
    </div>
  )
}
