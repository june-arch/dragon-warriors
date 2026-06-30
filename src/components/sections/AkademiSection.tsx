import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { GraduationCap, Users, Calendar, Target, ChevronRight } from 'lucide-react'

const KELOMPOK_USIA = [
  { label: 'U9', usia: 'Usia 7 — 9 tahun', fokus: 'Dasar teknik & koordinasi', jadwal: 'Senin & Rabu, 15.00-17.00 WIB' },
  { label: 'U10', usia: 'Usia 9 — 10 tahun', fokus: 'Kontrol bola & passing', jadwal: 'Senin & Rabu, 15.00-17.00 WIB' },
  { label: 'U11', usia: 'Usia 10 — 11 tahun', fokus: 'Taktik & positioning', jadwal: 'Senin & Rabu, 15.00-17.00 WIB' },
  { label: 'U12', usia: 'Usia 11 — 12 tahun', fokus: 'Game intelligence & komposisi tim', jadwal: 'Senin & Rabu, 15.00-17.00 WIB' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function AkademiSection() {
  return (
    <section id="akademi" className="section-padding bg-bg-void relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-cyan mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Akademi
            </h4>
            <h2 className="font-display text-xl md:text-4xl font-bold text-ash mt-2">
              Program Latihan
            </h2>
            <p className="font-body text-ash-muted text-base md:text-md max-w-lg mt-3">
              Program pembinaan usia dini yang terstruktur untuk setiap kelompok umur.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionReveal>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-gold-light" />
                <h3 className="font-display font-bold text-lg text-ash">Metode Latihan</h3>
              </div>
              <p className="font-body text-base text-ash-muted leading-relaxed">
                Program latihan Dragon Warriors dirancang untuk mengembangkan aspek teknik, taktik, fisik, dan mental secara seimbang. Setiap sesi mencakup:
              </p>
              <ul className="space-y-3">
                {[
                  'Game #1 — Melatih kekompakan tim',
                  'Game #2 — Melatih fokus & konsentrasi',
                  'Game #3 — Melatih kecepatan & kelincahan',
                  'Game #4 — Melatih kefokusan & teknik individu',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-base text-ash-muted">
                    <Target size={14} className="text-fire mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-gold-light" />
                <h3 className="font-display font-bold text-lg text-ash">Pemulihan Pasca-Latihan</h3>
              </div>
              <p className="font-body text-base text-ash-muted leading-relaxed">
                Kami menerapkan panduan nutrisi pemulihan untuk memastikan pemain pulih optimal dan siap latihan berikutnya:
              </p>
              <ul className="space-y-3">
                {[
                  'Protein: Ayam, telur, ikan — reparasi otot & jaringan',
                  'Karbohidrat kompleks: Pasta, nasi merah — isi ulang energi',
                  'Hidrasi: Air putih, sport drink, susu coklat',
                  'Makanan energi cepat: Pisang, yogurt, buah',
                  'Target makan dalam 1 jam setelah latihan',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-base text-ash-muted">
                    <ChevronRight size={14} className="text-cyan-dim mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-8">
              <Calendar size={20} className="text-gold-light" />
              <h3 className="font-display font-bold text-lg text-ash">Kelompok Usia</h3>
            </div>
          </SectionReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {KELOMPOK_USIA.map((k) => (
              <motion.div
                key={k.label}
                variants={cardVariants}
                className="card-surface p-6"
              >
                <span className="inline-block font-display text-2xl font-bold text-gold-light mb-2">
                  {k.label}
                </span>
                <p className="font-body text-xs text-ash-muted mb-2">{k.usia}</p>
                <div className="w-6 h-[1px] bg-gold/30 mb-3" />
                <p className="font-mono text-xs text-cyan-dim mb-1">{k.fokus}</p>
                <p className="font-body text-xs text-ash-muted/70">{k.jadwal}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://instagram.com/dragonwarriors26"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              Daftar Sekarang
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
