import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Clock, MapPin, Fence } from 'lucide-react'

const JADWAL = [
  { hari: 'Senin', waktu: '15.00 — 17.00 WIB', jenis: 'Latihan Reguler', tempat: 'Lapangan Eden Sport Center', icon: Clock },
  { hari: 'Rabu', waktu: '15.00 — 17.00 WIB', jenis: 'Latihan Reguler', tempat: 'Lapangan Eden Sport Center', icon: Clock },
]

const ACARA = [
  {
    title: 'Friendly Match',
    tanggal: 'Sabtu, 4 Juli 2026',
    waktu: '13.00 — 16.00 WIB',
    tempat: 'Lapangan Eden Sport Center',
    peserta: 'Pamegarsari FC · Cibinong Monstera FC · Gun\'s Soccer School',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

function ScheduleRow({ item }: { item: typeof JADWAL[0] }) {
  return (
    <motion.div
      variants={rowVariants}
      className="px-5 py-4 md:px-6 md:py-5 hover:bg-gold/[0.03] transition-colors duration-300"
    >
      {/* Mobile: stacked layout */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-base text-ash">
            {item.hari}
          </span>
          <span className="font-mono text-xs text-cyan-dim flex items-center gap-1.5">
            <Clock size={12} />
            {item.waktu}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm text-ash-muted">
            {item.jenis}
          </span>
          <span className="text-gold/30">·</span>
          <span className="font-body text-sm text-ash-muted flex items-center gap-1">
            <MapPin size={11} className="text-gold shrink-0" />
            {item.tempat}
          </span>
        </div>
      </div>

      {/* Desktop: table layout */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
        <div className="col-span-2 font-display font-bold text-base text-ash">
          {item.hari}
        </div>
        <div className="col-span-3 flex items-center gap-2 font-mono text-sm text-cyan-dim">
          <Clock size={13} />
          {item.waktu}
        </div>
        <div className="col-span-3 font-body text-base text-ash-muted">
          {item.jenis}
        </div>
        <div className="col-span-4 flex items-center gap-2 font-body text-base text-ash-muted">
          <MapPin size={13} className="text-gold shrink-0" />
          {item.tempat}
        </div>
      </div>
    </motion.div>
  )
}

export default function JadwalSection() {
  return (
    <section id="jadwal" className="section-padding bg-bg-surface relative z-[1]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <h4 className="eyebrow eyebrow-fire mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Jadwal
            </h4>
            <h2 className="font-display text-xl md:text-4xl font-bold text-ash mt-2">
              Jam Latihan
            </h2>
            <p className="font-body text-ash-muted text-base md:text-md max-w-lg mt-3">
              Latihan rutin setiap Senin & Rabu. Ayo bergabung dan jadi bagian dari Dragon Warriors!
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="border border-gold/20 divide-y divide-gold/10 rounded-xl overflow-hidden"
          >
            {/* Table header — hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-bg-raised/50">
              <div className="col-span-2 font-mono text-xs tracking-[0.25em] uppercase text-gold">Hari</div>
              <div className="col-span-3 font-mono text-xs tracking-[0.25em] uppercase text-gold">Waktu</div>
              <div className="col-span-3 font-mono text-xs tracking-[0.25em] uppercase text-gold">Jenis</div>
              <div className="col-span-4 font-mono text-xs tracking-[0.25em] uppercase text-gold">Tempat</div>
            </div>
            {JADWAL.map((item) => (
              <ScheduleRow key={item.hari} item={item} />
            ))}
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-14">
            <h3 className="font-display text-xl md:text-2xl font-bold text-ash mb-3">
              Acara Mendatang
            </h3>
            <div className="border border-gold/20 p-6 md:p-8 hover:border-gold/40 transition-colors duration-300 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Fence size={18} className="text-fire shrink-0" />
                <h4 className="font-display font-bold text-base md:text-lg text-ash">
                  {ACARA[0].title}
                </h4>
              </div>
              <p className="font-mono text-sm text-cyan-dim mb-1">
                {ACARA[0].tanggal} · {ACARA[0].waktu}
              </p>
              <p className="flex items-center gap-2 font-body text-base text-ash-muted mb-2">
                <MapPin size={13} className="text-gold" />
                {ACARA[0].tempat}
              </p>
              <p className="font-body text-base text-ash-muted/80">
                <span className="text-ash font-semibold">Peserta:</span> {ACARA[0].peserta}
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
