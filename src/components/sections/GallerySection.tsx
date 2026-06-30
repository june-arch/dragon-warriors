import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

const PHOTOS = [
  { id: 1, src: '/gallery/IMG_20260617_162305.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 2, src: '/gallery/IMG_20260617_162359.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 3, src: '/gallery/IMG_20260617_162405.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 4, src: '/gallery/IMG_20260617_163014.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 5, src: '/gallery/IMG_20260617_163259.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 6, src: '/gallery/IMG_20260617_163300.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 7, src: '/gallery/IMG_20260617_171157.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 8, src: '/gallery/IMG_20260617_171204.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 9, src: '/gallery/IMG_20260617_171239.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 10, src: '/gallery/IMG_20260617_174541.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 11, src: '/gallery/IMG_20260617_174542.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 12, src: '/gallery/IMG_20260617_174637.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 13, src: '/gallery/IMG_20260617_174843.jpg', label: 'Dragon Warriors 17/6', category: 'Latihan' },
  { id: 14, src: '/gallery/IMG_20260619_171423.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 15, src: '/gallery/IMG_20260619_171520.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 16, src: '/gallery/IMG_20260619_171559.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 17, src: '/gallery/IMG_20260619_171738.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 18, src: '/gallery/IMG_20260619_171748.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 19, src: '/gallery/IMG_20260619_171749.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 20, src: '/gallery/IMG_20260619_173655.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 21, src: '/gallery/IMG_20260619_174013.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 22, src: '/gallery/IMG_20260619_174058.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 23, src: '/gallery/IMG_20260619_174213.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 24, src: '/gallery/IMG_20260619_174225.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 25, src: '/gallery/IMG_20260619_174844.jpg', label: 'Dragon Warriors 19/6', category: 'Turnamen' },
  { id: 26, src: '/gallery/IMG_20260624_154734.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 27, src: '/gallery/IMG_20260624_155038.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 28, src: '/gallery/IMG_20260624_155046.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 29, src: '/gallery/IMG_20260624_155611.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 30, src: '/gallery/IMG_20260624_155613.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 31, src: '/gallery/IMG_20260624_155636.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 32, src: '/gallery/IMG_20260624_155740.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 33, src: '/gallery/IMG_20260624_160131.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 34, src: '/gallery/IMG_20260624_160710.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 35, src: '/gallery/IMG_20260624_160921.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 36, src: '/gallery/IMG_20260624_162615.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 37, src: '/gallery/IMG_20260624_174440.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
  { id: 38, src: '/gallery/IMG_20260624_174633.jpg', label: 'Dragon Warriors 24/6', category: 'Tim' },
]

const FILTERS = ['Semua', 'Latihan', 'Turnamen', 'Tim'] as const
type Filter = (typeof FILTERS)[number]

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'Semua' || p.category === activeFilter
  )

  const handlePrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : filteredPhotos.length - 1)
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex < filteredPhotos.length - 1 ? selectedIndex + 1 : 0)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <section id="gallery" className="section-padding bg-bg-void relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-gold mb-3 uppercase tracking-[0.3em]">
              Galeri
            </h4>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ash mt-2">
              Setiap Momen, Sebuah Legenda
            </h2>
            <p className="font-body text-ash-muted text-base max-w-lg mt-3">
              Dokumentasi latihan, turnamen, dan kebersamaan Dragon Warriors.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gold/20 text-gold-light border border-gold/40'
                    : 'bg-transparent text-ash-muted border border-transparent hover:border-gold/20 hover:text-ash'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </SectionReveal>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`card-surface overflow-hidden group ${
                  i === 0 && activeFilter === 'Semua' ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedIndex(i)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(i)}
                tabIndex={0}
                role="button"
                aria-label={`Buka foto ${p.label}`}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedIndex(null)}
            onKeyDown={(e) => e.key === 'Escape' && setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan foto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 text-ash-muted hover:text-ash bg-bg-void/60 hover:bg-bg-void/80 rounded-full transition-all"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={28} />
              </button>

              <img
                src={filteredPhotos[selectedIndex].src}
                alt={filteredPhotos[selectedIndex].label}
                className="max-h-[85vh] max-w-full object-contain rounded-sm"
              />

              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 text-ash-muted hover:text-ash bg-bg-void/60 hover:bg-bg-void/80 rounded-full transition-all"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={28} />
              </button>

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 z-10 p-2 text-ash-muted hover:text-ash transition-colors"
                aria-label="Tutup"
              >
                <X size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-ash-muted/70 bg-bg-void/60 px-3 py-1 rounded-sm">
                {selectedIndex + 1} / {filteredPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
