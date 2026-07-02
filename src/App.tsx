import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import ScrollProgress from './components/ui/ScrollProgress'
import ScrollToTop from './components/ui/ScrollToTop'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'
import { CustomCursor } from './components/cursor'
import DaftarPage from './components/pages/DaftarPage'
import AdminDashboard from './components/pages/AdminDashboard'

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

function HomePage() {
  return (
    <>
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
      </main>

      <Footer />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <ScrollToTop />
      {loading && <LoadSequence onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-bg-void overflow-x-hidden ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daftar" element={<DaftarPage />} />
          <Route path="/admin/siswa" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
