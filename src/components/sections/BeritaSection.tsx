import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Calendar, ArrowRight, Trophy, Users, Salad } from 'lucide-react'

const BERITA = [
  {
    title: 'Friendly Match Dragon Warriors 2026',
    date: '4 Juli 2026',
    excerpt: 'Dragon Warriors mengadakan friendly match melawan Pamegarsari FC, Cibinong Monstera FC, dan Gun\'s Soccer School. Sabtu, 4 Juli 2026 pukul 13.00-16.00 WIB di Lapangan Eden Sport Center, Pengasinan-Depok.',
    category: 'Turnamen',
    icon: Trophy,
  },
  {
    title: 'Menu Pemulihan Pasca-Latihan',
    date: '26 Juni 2026',
    excerpt: 'Protein (ayam, telur, ikan) untuk reparasi otot, karbohidrat kompleks (pasta, nasi merah) untuk isi ulang energi, hidrasi (air putih, sport drink, susu coklat), dan makanan energi cepat (pisang, yogurt, buah). Target makan dalam 1 jam setelah latihan!',
    category: 'Tips',
    icon: Salad,
  },
  {
    title: 'Game #1-#4: Latihan Intensif',
    date: '25 Juni 2026',
    excerpt: 'Program latihan mingguan Dragon Warriors: Game #1 melatih kekompakan pemain, Game #2 melatih fokus, Game #3 melatih kecepatan, dan Game #4 melatih kelincahan & kefokusan pemain usia dini.',
    category: 'Latihan',
    icon: Users,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function BeritaSection() {
  return (
    <section id="berita" className="section-padding bg-bg-void relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-cyan mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Berita
            </h4>
            <h2 className="font-display text-xl md:text-4xl font-bold text-ash mt-2">
              Kabar Terbaru
            </h2>
            <p className="font-body text-ash-muted text-base md:text-md max-w-lg mt-3">
              Update kegiatan dan informasi terbaru Dragon Warriors dari Instagram.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {BERITA.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="card-surface group p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-cyan/10 flex items-center justify-center">
                    <Icon size={18} className="text-cyan-dim" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.25em] uppercase text-cyan-dim">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-ash group-hover:text-gold-light transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-ash-muted text-base mt-3 leading-relaxed flex-1">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gold/20">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-ash-muted">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                  <a
                    href="https://instagram.com/dragonwarriors26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-xs text-gold-light/60 hover:text-gold-light transition-colors"
                  >
                    IG <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
