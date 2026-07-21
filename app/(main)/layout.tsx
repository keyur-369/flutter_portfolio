import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/providers/PageTransition'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="relative z-10 pt-20 print:pt-0 print:m-0 print:p-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  )
}
