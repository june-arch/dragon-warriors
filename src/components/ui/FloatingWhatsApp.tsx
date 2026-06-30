import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE = '6282112388428' // 0821-1238-8428 without formatting
const MESSAGE = encodeURIComponent(
  'Halo! Saya tertarik dengan Dragon Warriors Akademi Sepak Bola. Ada yang ingin saya tanyakan seputar pendaftaran dan program latihan.'
)

export default function FloatingWhatsApp() {
  const [scrolled, setScrolled] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 300)
      if (window.scrollY > 100) setShowTooltip(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Auto-hide tooltip after 8s
    const timer = setTimeout(() => setShowTooltip(false), 8000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  const waUrl = `https://wa.me/${PHONE}?text=${MESSAGE}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && !scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="bg-bg-raised border border-gold/20 rounded-lg px-4 py-3 shadow-xl shadow-black/40 max-w-[220px]">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-bg-void border border-gold/20 flex items-center justify-center text-ash-muted hover:text-ash transition-colors"
                aria-label="Tutup"
              >
                <X size={10} />
              </button>
              <p className="font-body text-xs text-ash-muted leading-relaxed">
                Ada pertanyaan? Chat via WhatsApp!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] transition-all duration-300 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 group"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle
          size={28}
          className="text-white group-hover:scale-110 transition-transform duration-300"
          fill="white"
        />
      </a>
    </div>
  )
}
