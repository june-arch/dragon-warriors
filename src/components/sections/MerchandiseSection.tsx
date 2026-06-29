import { motion } from 'framer-motion'
import { useRef, useState, type MouseEvent } from 'react'
import SectionReveal from '../ui/SectionReveal'

const ITEMS = [
  { name: 'Jersey Dragon', price: 'Rp 185.000', image: 'J' },
  { name: 'Training Top', price: 'Rp 150.000', image: 'T' },
  { name: 'Snapback Cap', price: 'Rp 85.000', image: 'C' },
  { name: 'Syal Supporter', price: 'Rp 55.000', image: 'S' },
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 12, y: -y * 8 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(8px)`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="card-surface overflow-hidden group"
    >
      {children}
    </div>
  )
}

export default function MerchandiseSection() {
  return (
    <section id="merchandise" data-testid="merchandise-section" className="section-padding bg-bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-gold mb-3 uppercase tracking-[0.3em]">
              Koleksi Resmi
            </h4>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ash mt-2">
              Gear Para Warrior
            </h2>
            <p className="font-body text-ash-muted text-base max-w-lg mt-3">
              Jersey, jaket, dan perlengkapan resmi Dragon Warriors.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <TiltCard>
                <div className="aspect-square bg-gradient-to-br from-gold/20 via-blood/10 to-bg-void flex items-center justify-center">
                  <span className="font-display text-6xl md:text-7xl font-black text-gold/30 group-hover:text-gold/50 transition-colors">
                    {item.image}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base md:text-lg text-ash">
                    {item.name}
                  </h3>
                  <p className="font-mono text-sm text-gold-light mt-1">{item.price}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <a href="#" className="btn-secondary text-xs">
              Lihat Semua Koleksi
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
