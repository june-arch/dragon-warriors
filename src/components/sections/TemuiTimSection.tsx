import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Shield, Swords, Target, Medal } from 'lucide-react'

const TIM = [
  {
    nama: 'Coach Farid',
    jabatan: 'Head Coach',
    lisensi: 'Lisensi D (in progress)',
    motto: 'Membentuk karakter juara sejak dini.',
    icon: Shield,
  },
  {
    nama: 'Coach Dede',
    jabatan: 'Technical Advisor',
    lisensi: 'Lisensi C PSSI',
    motto: 'Teknik yang benar sejak awal adalah kunci.',
    icon: Medal,
  },
  {
    nama: 'Coach Rio',
    jabatan: 'Coach U9 & U10',
    lisensi: 'Lisensi D',
    motto: 'Disiplin, kerja keras, dan kebersamaan.',
    icon: Target,
  },
  {
    nama: 'Coach Pablo',
    jabatan: 'Goalkeeper Coach',
    lisensi: 'Lisensi D',
    motto: 'Penjaga gawang tangguh, benteng terakhir.',
    icon: Swords,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function TemuiTimSection() {
  return (
    <section id="temui-tim" className="section-padding bg-bg-void relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-gold mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Temui Tim
            </h4>
            <h2 className="font-display text-xl md:text-4xl font-bold text-ash mt-2">
              Para Pelatih
            </h2>
            <p className="font-body text-ash-muted text-base md:text-md max-w-lg mt-3">
              Berkenalan dengan para coach Dragon Warriors yang berpengalaman dan bersertifikasi.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TIM.map((orang) => {
            const Icon = orang.icon
            return (
              <motion.div
                key={orang.nama}
                variants={cardVariants}
                className="card-surface group p-6 md:p-8 text-center flex flex-col"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-fire/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/40 transition-all duration-500">
                  <Icon size={28} className="text-gold-light group-hover:text-fire-glow transition-colors duration-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-ash mt-5">
                  {orang.nama}
                </h3>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-light/70 mt-2">
                  {orang.jabatan}
                </p>
                <span className="inline-block mt-3 px-3 py-1 font-mono text-xs tracking-wider text-cyan-dim border border-cyan-dim/20 rounded-sm">
                  {orang.lisensi}
                </span>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto my-4" />
                <p className="font-body text-base text-ash-muted leading-relaxed italic flex-1">
                  &ldquo;{orang.motto}&rdquo;
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="https://instagram.com/dragonwarriors26"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Ikuti Instagram Kami
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
