import { useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import MerchandiseSection from './components/sections/MerchandiseSection'
import GallerySection from './components/sections/GallerySection'
import BeritaSection from './components/sections/BeritaSection'
import JadwalSection from './components/sections/JadwalSection'
import TemuiTimSection from './components/sections/TemuiTimSection'
import SiapaKamiSection from './components/sections/SiapaKamiSection'
import AkademiSection from './components/sections/AkademiSection'
import DaftarSection from './components/sections/DaftarSection'
import ScrollProgress from './components/ui/ScrollProgress'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'
import { CustomCursor } from './components/cursor'

function LoadSequence({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1600)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
      <div data-testid="load-sequence" className="fixed inset-0 z-50 flex items-center justify-center bg-bg-void pointer-events-none">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Dragon Warriors"
          className="h-32 md:h-48 w-auto mx-auto animate-pulse"
        />
        <div className="mt-6 w-12 h-[1px] bg-gold mx-auto" />
      </div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadSequence onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-bg-void overflow-x-hidden ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <ScrollProgress />
        <Navbar />
        <CustomCursor />
        <FloatingWhatsApp />

        <main>
          <HeroSection />
          <MerchandiseSection />
          <GallerySection />
          <BeritaSection />
          <TemuiTimSection />
          <JadwalSection />
          <SiapaKamiSection />
          <AkademiSection />
          <DaftarSection />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
