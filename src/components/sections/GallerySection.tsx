import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

const PHOTOS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  label: `Momen ${i + 1}`,
  category: i < 2 ? 'Latihan' : i < 4 ? 'Turnamen' : 'Tim',
}))

const FILTERS = ['Semua', 'Latihan', 'Turnamen', 'Tim'] as const
type Filter = (typeof FILTERS)[number]

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const filteredPhotos = PHOTOS.filter(
    (p) => activeFilter === 'Semua' || p.category === activeFilter
  )

  return (
    <section id="gallery" className="section-padding bg-bg-void">
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
              Dari lapangan Pengasinan ke panggung nasional.
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
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`card-surface overflow-hidden group ${
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedPhoto(p.id)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(p.id)}
                tabIndex={0}
                role="button"
                aria-label={`Buka ${p.label}`}
              >
                <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-blood/25 to-fire/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="font-display text-3xl md:text-5xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors">
                    {p.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedPhoto(null)}
            onKeyDown={(e) => e.key === 'Escape' && setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan foto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full aspect-video bg-gradient-to-br from-blood/30 to-fire/20 flex items-center justify-center rounded-sm border border-gold/30"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              <span className="font-display text-2xl md:text-4xl font-bold text-gold/40">
                {PHOTOS.find((p) => p.id === selectedPhoto)?.label}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-ash-muted hover:text-ash transition-colors"
                aria-label="Tutup"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
