import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
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

// ── 3D Coverflow layout ──────────────────────────────────────────
const VISIBLE_RANGE = 2 // show current ± 2 → 5 items
const ITEM_WIDTH = 420

type LayoutSlot = {
  x: number
  rotateY: number
  scale: number
  z: number
  opacity: number
  blur: string
}

const SLOT: Record<number, LayoutSlot> = {
  [-2]: { x: -ITEM_WIDTH * 0.75, rotateY: 40, scale: 0.55, z: -300, opacity: 0.35, blur: 'blur(1px)' },
  [-1]: { x: -ITEM_WIDTH * 0.35, rotateY: 18, scale: 0.78, z: -100, opacity: 0.7, blur: 'blur(0px)' },
  [0]:  { x: 0,                   rotateY: 0,  scale: 1,    z: 0,    opacity: 1,   blur: 'blur(0px)' },
  [1]:  { x: ITEM_WIDTH * 0.35,  rotateY: -18, scale: 0.78, z: -100, opacity: 0.7, blur: 'blur(0px)' },
  [2]:  { x: ITEM_WIDTH * 0.75,  rotateY: -40, scale: 0.55, z: -300, opacity: 0.35, blur: 'blur(1px)' },
}

// ── Decorative oval component ────────────────────────────────────
function DecorativeOval({ position }: { position: 'top' | 'bottom' }) {
  const isTop = position === 'top'
  return (
    <div
      className="pointer-events-none absolute left-1/2 z-0 w-[140%] -translate-x-1/2 overflow-hidden"
      style={{
        [isTop ? 'top' : 'bottom']: isTop ? '-35%' : '-35%',
        height: '55%',
        aspectRatio: '2/1',
      }}
    >
      {/* Outer glow ellipse */}
      <div
        className="absolute inset-0 rounded-[50%] opacity-30"
        style={{
          background: isTop
            ? 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(212,175,55,0.35) 0%, transparent 80%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(212,175,55,0.35) 0%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Inner ring ellipse */}
      <div
        className="absolute inset-[5%] rounded-[50%] border border-gold/15"
        style={{
          background: isTop
            ? 'radial-gradient(ellipse 60% 50% at 50% 90%, rgba(212,175,55,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 10%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          boxShadow: isTop
            ? '0 20px 80px rgba(212,175,55,0.08) inset'
            : '0 -20px 80px rgba(212,175,55,0.08) inset',
        }}
      />
    </div>
  )
}

// ── Carousel item ────────────────────────────────────────────────
function CarouselItem({
  src,
  alt,
  slot,
  isCenter,
  onClick,
}: {
  src: string
  alt: string
  slot: LayoutSlot
  isCenter: boolean
  onClick?: () => void
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      animate={{
        x: slot.x,
        rotateY: slot.rotateY,
        scale: slot.scale,
        opacity: slot.opacity,
        zIndex: isCenter ? 20 : 10 + Math.round(slot.z / 100),
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      }}
      style={{
        transformStyle: 'preserve-3d',
        width: ITEM_WIDTH,
        filter: slot.blur,
      }}
      whileHover={isCenter ? { scale: 1.03 } : undefined}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-bg-card shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="aspect-[4/3] w-full object-cover"
          draggable={false}
        />
        {/* Gradient overlay for non-center items */}
        {!isCenter && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        )}
      </div>

      {/* Reflection */}
      {isCenter && (
        <div
          className="mx-auto mt-2 h-[1px] w-3/4 rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.6) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      )}
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const dragSpring = useSpring(dragX, { stiffness: 200, damping: 30 })

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'Semua' || p.category === activeFilter
  )
  const total = filteredPhotos.length
  const idx = ((current % total) + total) % total

  // ── navigation ──────────────────────────────────────────────────
  const goTo = useCallback(
    (i: number) => setCurrent(i),
    []
  )

  const next = useCallback(() => {
    setCurrent((c) => c + 1)
  }, [])

  const prev = useCallback(() => {
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

  useEffect(() => {
    setCurrent(0)
  }, [activeFilter])

  // ── auto-play ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  // ── build visible window ──────────────────────────────────────
  const visibleSlots: { photo: (typeof PHOTOS)[number]; offset: number }[] = []
  for (let offset = -VISIBLE_RANGE; offset <= VISIBLE_RANGE; offset++) {
    const itemIdx = ((idx + offset) % total + total) % total
    visibleSlots.push({ photo: filteredPhotos[itemIdx], offset })
  }

  return (
    <section
      id="gallery"
      className="section-padding bg-bg-void relative z-[1] overflow-hidden"
    >
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

        {/* ── 3D Coverflow Carousel ─────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{ perspective: '1200px', maxWidth: ITEM_WIDTH * 2.4 }}
        >
          {/* Decorative ovals */}
          <DecorativeOval position="top" />
          <DecorativeOval position="bottom" />

          {/* Stage */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 420 }}
          >
            {/* Drag layer */}
            <motion.div
              className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, info) => {
                const threshold = 50
                if (info.offset.x < -threshold) next()
                else if (info.offset.x > threshold) prev()
                dragX.set(0)
              }}
              style={{ x: dragSpring }}
            />

            {/* Items */}
            {visibleSlots.map(({ photo, offset }) => (
              <CarouselItem
                key={photo.id}
                src={photo.src}
                alt={`Dragon Warriors ${photo.category}`}
                slot={SLOT[offset]}
                isCenter={offset === 0}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-40 -translate-y-1/2 -translate-x-2 p-3 text-white/70 hover:text-gold-light transition-colors"
            aria-label="Sebelumnya"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-black/40 backdrop-blur-sm hover:bg-gold/10 hover:border-gold/40 transition-all">
              <ChevronLeft size={20} />
            </div>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-40 -translate-y-1/2 translate-x-2 p-3 text-white/70 hover:text-gold-light transition-colors"
            aria-label="Berikutnya"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-black/40 backdrop-blur-sm hover:bg-gold/10 hover:border-gold/40 transition-all">
              <ChevronRight size={20} />
            </div>
          </button>

          {/* Counter */}
          <div className="absolute top-0 right-0 z-40 font-mono text-xs text-white/80 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {idx + 1} / {total}
          </div>
        </div>

        {/* ── Dots ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 px-4">
          {filteredPhotos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              className={`shrink-0 rounded-full transition-all duration-300 ${
                i === idx
                  ? 'w-8 h-2 bg-gold-light shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                  : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Ke foto ${i + 1}`}
            />
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
    </section>
  )
}
