import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import DaftarSection from '../sections/DaftarSection'

export default function DaftarPage() {
  return (
    <div className="min-h-screen bg-bg-void">
      <Navbar />
      <main>
        <DaftarSection />
      </main>
      <Footer />
    </div>
  )
}
