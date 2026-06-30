import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

const PHOTOS = [
  { id: 1, src: '/gallery/IMG_20260617_162305.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 2, src: '/gallery/IMG_20260617_162359.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: true },
  { id: 3, src: '/gallery/IMG_20260617_162405.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 4, src: '/gallery/IMG_20260617_163014.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 5, src: '/gallery/IMG_20260617_163259.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: true },
  { id: 6, src: '/gallery/IMG_20260617_163300.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 7, src: '/gallery/IMG_20260617_171157.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 8, src: '/gallery/IMG_20260617_171204.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: true },
  { id: 9, src: '/gallery/IMG_20260617_171239.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 10, src: '/gallery/IMG_20260617_174541.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 11, src: '/gallery/IMG_20260617_174542.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: true },
  { id: 12, src: '/gallery/IMG_20260617_174637.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 13, src: '/gallery/IMG_20260617_174843.jpg', label: 'Latihan 17/6', category: 'Latihan', tall: false },
  { id: 14, src: '/gallery/IMG_20260619_171423.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 15, src: '/gallery/IMG_20260619_171520.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: true },
  { id: 16, src: '/gallery/IMG_20260619_171559.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 17, src: '/gallery/IMG_20260619_171738.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 18, src: '/gallery/IMG_20260619_171748.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: true },
  { id: 19, src: '/gallery/IMG_20260619_171749.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 20, src: '/gallery/IMG_20260619_173655.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 21, src: '/gallery/IMG_20260619_174013.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: true },
  { id: 22, src: '/gallery/IMG_20260619_174058.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 23, src: '/gallery/IMG_20260619_174213.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 24, src: '/gallery/IMG_20260619_174225.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: true },
  { id: 25, src: '/gallery/IMG_20260619_174844.jpg', label: 'Turnamen 19/6', category: 'Turnamen', tall: false },
  { id: 26, src: '/gallery/IMG_20260624_154734.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 27, src: '/gallery/IMG_20260624_155038.jpg', label: 'Tim 24/6', category: 'Tim', tall: true },
  { id: 28, src: '/gallery/IMG_20260624_155046.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 29, src: '/gallery/IMG_20260624_155611.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 30, src: '/gallery/IMG_20260624_155613.jpg', label: 'Tim 24/6', category: 'Tim', tall: true },
  { id: 31, src: '/gallery/IMG_20260624_155636.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 32, src: '/gallery/IMG_20260624_155740.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 33, src: '/gallery/IMG_20260624_160131.jpg', label: 'Tim 24/6', category: 'Tim', tall: true },
  { id: 34, src: '/gallery/IMG_20260624_160710.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 35, src: '/gallery/IMG_20260624_160921.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 36, src: '/gallery/IMG_20260624_162615.jpg', label: 'Tim 24/6', category: 'Tim', tall: true },
  { id: 37, src: '/gallery/IMG_20260624_174440.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
  { id: 38, src: '/gallery/IMG_20260624_174633.jpg', label: 'Tim 24/6', category: 'Tim', tall: false },
]

const FILTERS = ['Semua', 'Latihan', 'Turnamen', 'Tim'] as const
type Filter = (typeof FILTERS)[number]

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [columns, setColumns] = useState(3)

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'Semua' || p.category === activeFilter
  )

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 640) setColumns(2)
      else if (w < 1024) setColumns(2)
      else if (w < 1280) setColumns(3)
      else setColumns(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : filteredPhotos.length - 1)
  }, [selectedIndex, filteredPhotos.length])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex < filteredPhotos.length - 1 ? selectedIndex + 1 : 0)
  }, [selectedIndex, filteredPhotos.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, handlePrev, handleNext])

  // Distribute photos into columns (masonry)
  const getColumnPhotos = () => {
    const cols: typeof PHOTOS[] = Array.from({ length: columns }, () => [])
    filteredPhotos.forEach((photo, i) => {
      cols[i % columns].push(photo)
    })
    return cols
  }

  const columnPhotos = getColumnPhotos()

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
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
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
                {filter !== 'Semua' && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({PHOTOS.filter((p) => p.category === filter).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Masonry Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {columnPhotos.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((photo, i) => {
                const globalIdx = filteredPhotos.indexOf(photo)
                return (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
                    className="group cursor-pointer overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-500"
                    onClick={() => setSelectedIndex(globalIdx)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(globalIdx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Buka foto ${photo.label}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="https://instagram.com/dragonwarriors26"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Lihat Lebih Banyak di Instagram
            </a>
          </div>
        </SectionReveal>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan foto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all hover:scale-105"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft size={24} />
              </button>

              <img
                src={filteredPhotos[selectedIndex].src}
                alt={filteredPhotos[selectedIndex].label}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl shadow-black/60"
              />

              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all hover:scale-105"
                aria-label="Foto berikutnya"
              >
                <ChevronRight size={24} />
              </button>

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 z-10 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Tutup"
              >
                <X size={22} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {selectedIndex + 1} / {filteredPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
