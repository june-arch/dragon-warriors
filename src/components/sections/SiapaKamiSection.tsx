import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { MapPin, Medal, Users, Trophy, Target, Shield } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Membentuk Karakter Juara',
    desc: 'Bukan hanya teknik sepak bola, tapi juga disiplin, kerja keras, dan sportivitas sejak dini.',
  },
  {
    icon: Users,
    title: 'Pembinaan Usia Dini',
    desc: 'Program khusus U9, U10, U11, dan U12 dengan metode latihan yang menyenangkan dan terstruktur.',
  },
  {
    icon: Trophy,
    title: 'Prestasi & Turnamen',
    desc: 'Aktif mengikuti turnamen antar SSB dan friendly match untuk mengasah kemampuan bertanding.',
  },
  {
    icon: Shield,
    title: 'Lisensi Resmi',
    desc: 'Dibimbing oleh coach bersertifikasi Lisensi C PSSI dan Lisensi D yang berpengalaman.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function SiapaKamiSection() {
  return (
    <section id="siapa-kami" className="section-padding bg-bg-surface relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-gold mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Siapa Kami
            </h4>
            <h2 className="font-display text-xl md:text-4xl font-bold text-ash mt-2">
              Dragon Warriors
            </h2>
            <p className="font-body text-ash-muted text-base md:text-md max-w-lg mt-3">
              Akademi sepak bola profesional berbasis di Depok dan Bogor.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          <SectionReveal className="lg:col-span-3">
            <div className="space-y-5">
              <p className="font-body text-base md:text-md text-ash-muted leading-relaxed">
                <strong className="text-ash font-semibold">Dragon Warriors Football Academy</strong> adalah Sekolah Sepak Bola (SSB) yang berkomitmen membentuk karakter juara sejak dini. Berbasis di Depok dan Bogor, kami melayani kelompok usia U9 hingga U12 dengan program latihan yang terstruktur dan menyenangkan.
              </p>
              <p className="font-body text-base md:text-md text-ash-muted leading-relaxed">
                Didirikan dengan visi melahirkan pemain sepak bola yang tidak hanya terampil secara teknik, tetapi juga memiliki mental juara, disiplin tinggi, dan sportivitas yang kuat. Setiap pemain dibimbing oleh coach bersertifikasi resmi PSSI.
              </p>
              <p className="font-body text-base md:text-md text-ash-muted leading-relaxed">
                Dengan hombase di Lapangan Eden Sport Center, Pengasinan — Depok, kami rutin mengadakan latihan setiap Senin dan Rabu, serta aktif mengikuti turnamen dan friendly match untuk mengasah kemampuan bertanding para pemain.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 font-mono text-xs text-ash-muted">
                  <MapPin size={14} className="text-gold" />
                  Depok · Bogor
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-ash-muted">
                  <Medal size={14} className="text-gold" />
                  Lisensi C PSSI
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-ash-muted">
                  <Users size={14} className="text-gold" />
                  U9 — U12
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2} className="lg:col-span-2">
            <div className="border border-gold/20 p-6 md:p-8 space-y-5 rounded-xl">
              <h3 className="font-display font-bold text-lg text-ash">
                Info Kontak
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold-light/70 mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/dragonwarriors26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-base text-ash hover:text-gold-light transition-colors"
                  >
                    @dragonwarriors26
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold-light/70 mb-1">
                    Email
                  </p>
                  <p className="font-body text-base text-ash-muted">
                    dragonwarriors266@gmail.com
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold-light/70 mb-1">
                    Kontak (Si Draco)
                  </p>
                  <a
                    href="tel:+6282112388428"
                    className="font-mono text-base text-cyan-dim hover:text-cyan transition-colors"
                  >
                    0821 — 1238 — 8428
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold-light/70 mb-1">
                    Hombase
                  </p>
                  <p className="font-body text-base text-ash-muted">
                    Lapangan Eden Sport Center
                    <br />
                    Jl. Raya Pengasinan, Depok
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16">
          <SectionReveal>
            <h3 className="font-display text-xl md:text-2xl font-bold text-ash mb-8 text-center">
              Nilai-Nilai Kami
            </h3>
          </SectionReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  variants={cardVariants}
                  className="card-surface p-6 text-center"
                >
                  <Icon size={24} className="text-gold-light mx-auto mb-4" />
                  <h4 className="font-display font-bold text-base text-ash mb-2">{v.title}</h4>
                  <p className="font-body text-sm text-ash-muted leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
