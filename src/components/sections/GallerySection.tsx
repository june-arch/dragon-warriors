import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

const PHOTOS = [
  { id: 1, src: '/gallery/IMG_20260617_162305.jpg', category: 'Latihan' },
  { id: 2, src: '/gallery/IMG_20260617_162359.jpg', category: 'Latihan' },
  { id: 3, src: '/gallery/IMG_20260617_162405.jpg', category: 'Latihan' },
  { id: 4, src: '/gallery/IMG_20260617_163014.jpg', category: 'Latihan' },
  { id: 5, src: '/gallery/IMG_20260617_163259.jpg', category: 'Latihan' },
  { id: 6, src: '/gallery/IMG_20260617_163300.jpg', category: 'Latihan' },
  { id: 7, src: '/gallery/IMG_20260617_171157.jpg', category: 'Latihan' },
  { id: 8, src: '/gallery/IMG_20260617_171204.jpg', category: 'Latihan' },
  { id: 9, src: '/gallery/IMG_20260617_171239.jpg', category: 'Latihan' },
  { id: 10, src: '/gallery/IMG_20260617_174541.jpg', category: 'Latihan' },
  { id: 11, src: '/gallery/IMG_20260617_174542.jpg', category: 'Latihan' },
  { id: 12, src: '/gallery/IMG_20260617_174637.jpg', category: 'Latihan' },
  { id: 13, src: '/gallery/IMG_20260617_174843.jpg', category: 'Latihan' },
  { id: 14, src: '/gallery/IMG_20260619_171423.jpg', category: 'Turnamen' },
  { id: 15, src: '/gallery/IMG_20260619_171520.jpg', category: 'Turnamen' },
  { id: 16, src: '/gallery/IMG_20260619_171559.jpg', category: 'Turnamen' },
  { id: 17, src: '/gallery/IMG_20260619_171738.jpg', category: 'Turnamen' },
  { id: 18, src: '/gallery/IMG_20260619_171748.jpg', category: 'Turnamen' },
  { id: 19, src: '/gallery/IMG_20260619_171749.jpg', category: 'Turnamen' },
  { id: 20, src: '/gallery/IMG_20260619_173655.jpg', category: 'Turnamen' },
  { id: 21, src: '/gallery/IMG_20260619_174013.jpg', category: 'Turnamen' },
  { id: 22, src: '/gallery/IMG_20260619_174058.jpg', category: 'Turnamen' },
  { id: 23, src: '/gallery/IMG_20260619_174213.jpg', category: 'Turnamen' },
  { id: 24, src: '/gallery/IMG_20260619_174225.jpg', category: 'Turnamen' },
  { id: 25, src: '/gallery/IMG_20260619_174844.jpg', category: 'Turnamen' },
  { id: 26, src: '/gallery/IMG_20260624_154734.jpg', category: 'Tim' },
  { id: 27, src: '/gallery/IMG_20260624_155038.jpg', category: 'Tim' },
  { id: 28, src: '/gallery/IMG_20260624_155046.jpg', category: 'Tim' },
  { id: 29, src: '/gallery/IMG_20260624_155611.jpg', category: 'Tim' },
  { id: 30, src: '/gallery/IMG_20260624_155613.jpg', category: 'Tim' },
  { id: 31, src: '/gallery/IMG_20260624_155636.jpg', category: 'Tim' },
  { id: 32, src: '/gallery/IMG_20260624_155740.jpg', category: 'Tim' },
  { id: 33, src: '/gallery/IMG_20260624_160131.jpg', category: 'Tim' },
  { id: 34, src: '/gallery/IMG_20260624_160710.jpg', category: 'Tim' },
  { id: 35, src: '/gallery/IMG_20260624_160921.jpg', category: 'Tim' },
  { id: 36, src: '/gallery/IMG_20260624_162615.jpg', category: 'Tim' },
  { id: 37, src: '/gallery/IMG_20260624_174440.jpg', category: 'Tim' },
  { id: 38, src: '/gallery/IMG_20260624_174633.jpg', category: 'Tim' },
]

const FILTERS = ['Semua', 'Latihan', 'Turnamen', 'Tim'] as const
type Filter = (typeof FILTERS)[number]

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'Semua' || p.category === activeFilter
  )

  const total = filteredPhotos.length
  const idx = ((current % total) + total) % total

  const goTo = useCallback((i: number) => {
    setDir(i > idx ? 1 : -1)
    setCurrent(i)
  }, [idx])

  const next = useCallback(() => {
    setDir(1)
    setCurrent((c) => c + 1)
  }, [])

  const prev = useCallback(() => {
    setDir(-1)
    setCurrent((c) => c - 1)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  // Reset current when filter changes
  useEffect(() => {
    setCurrent(0)
  }, [activeFilter])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  }

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
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12 justify-center">
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

        {/* Slider */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden border border-gold/10">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.img
                key={filteredPhotos[idx]?.id ?? 'empty'}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                src={filteredPhotos[idx]?.src}
                alt={`Dragon Warriors ${filteredPhotos[idx]?.category}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all"
              aria-label="Berikutnya"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 z-10 font-mono text-xs text-white/80 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {idx + 1} / {total}
            </div>
          </div>

          {/* Dots */}
          <div className="flex flex-wrap justify-center gap-2 mt-5 px-4">
            {filteredPhotos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={`shrink-0 rounded-full transition-all duration-300 ${
                  i === idx
                    ? 'w-8 h-2 bg-gold-light'
                    : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
                }`}
                aria-label={`Ke foto ${i + 1}`}
              />
            ))}
          </div>
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
    </section>
  )
}
