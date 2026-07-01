import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, FileText, AlertCircle } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

interface FormData {
  nama: string
  usia: string
  ttl: string
  noWalimurid: string
  persetujuan: boolean
}

const PERSYARATAN = [
  'Melampirkan AKTE KELAHIRAN',
  'Melampirkan KARTU KELUARGA',
  'Melampirkan NISN',
  'Melampirkan KIA',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function DaftarSection() {
  const [form, setForm] = useState<FormData>({
    nama: '',
    usia: '',
    ttl: '',
    noWalimurid: '',
    persetujuan: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.nama || !form.usia || !form.ttl || !form.noWalimurid || !form.persetujuan) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="daftar" className="section-padding bg-bg-surface relative z-[1]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <CheckCircle size={64} className="text-gold-light mx-auto mb-6" />
            <h2 className="fluid-h2 font-display font-bold text-ash mb-4">
              Pendaftaran Berhasil!
            </h2>
            <p className="fluid-body text-ash-muted mb-8">
              Terima kasih, <span className="text-gold-light font-semibold">{form.nama}</span>. 
              Tim Dragon Warriors akan menghubungi Anda segera.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setForm({ nama: '', usia: '', ttl: '', noWalimurid: '', persetujuan: false })
              }}
              className="btn-secondary text-xs"
            >
              Daftar Siswa Lain
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="daftar" className="section-padding bg-bg-surface relative z-[1] overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url(/logo.png)',
          backgroundSize: '400px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionReveal>
          <div className="mb-10 md:mb-14 text-center">
            <h4 className="eyebrow eyebrow-gold mb-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Pendaftaran
            </h4>
            <h2 className="fluid-h2 font-display font-bold text-ash mt-2">
              Formulir Pendaftaran Siswa Baru
            </h2>
            <p className="fluid-body text-ash-muted max-w-lg mt-3 mx-auto">
              Isi formulir di bawah untuk mendaftarkan putra/putri Anda di Dragon Warriors Football Academy.
            </p>
          </div>
        </SectionReveal>

        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="border border-gold/20 rounded-xl p-6 md:p-10 bg-bg-void/50 backdrop-blur-sm"
        >
          {/* ── Biodata Siswa ────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <h3 className="fluid-h3 font-display font-bold text-ash mb-6 flex items-center gap-3">
              <FileText size={20} className="text-gold-light" />
              Biodata Siswa
            </h3>
          </motion.div>

          <div className="space-y-6">
            {/* Nama */}
            <motion.div variants={itemVariants}>
              <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={form.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Masukkan nama lengkap siswa"
                className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body fluid-body py-2 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
              />
            </motion.div>

            {/* Usia */}
            <motion.div variants={itemVariants}>
              <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
                Usia
              </label>
              <input
                type="text"
                required
                value={form.usia}
                onChange={(e) => handleChange('usia', e.target.value)}
                placeholder="Contoh: 9 tahun"
                className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body fluid-body py-2 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
              />
            </motion.div>

            {/* Tempat Tanggal Lahir */}
            <motion.div variants={itemVariants}>
              <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
                Tempat Tanggal Lahir
              </label>
              <input
                type="text"
                required
                value={form.ttl}
                onChange={(e) => handleChange('ttl', e.target.value)}
                placeholder="Contoh: Depok, 15 Maret 2017"
                className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body fluid-body py-2 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
              />
            </motion.div>

            {/* No Telpon Walimurid */}
            <motion.div variants={itemVariants}>
              <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
                No. Telepon Walimurid
              </label>
              <input
                type="tel"
                required
                value={form.noWalimurid}
                onChange={(e) => handleChange('noWalimurid', e.target.value)}
                placeholder="Contoh: 0821-1234-5678"
                className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body fluid-body py-2 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
              />
            </motion.div>
          </div>

          {/* ── Pernyataan ───────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-10">
            <div className="border border-gold/10 rounded-lg p-5 bg-gold/[0.02]">
              <p className="fluid-body text-ash-muted leading-relaxed">
                Dengan ini menyatakan bahwa anak saya tersebut di atas, saya izinkan mendaftar sebagai siswa{' '}
                <span className="text-gold-light font-bold">SSB DRAGON WARRIORS</span> dan bersedia mengikuti
                semua peraturan yang sudah ada.
              </p>
              <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={form.persetujuan}
                  onChange={(e) => handleChange('persetujuan', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-gold-light cursor-pointer"
                />
                <span className="fluid-caption text-ash-muted group-hover:text-ash transition-colors">
                  Saya menyetujui pernyataan di atas
                </span>
              </label>
            </div>
          </motion.div>

          {/* ── Persyaratan ──────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="fluid-h4 font-display font-bold text-ash mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-fire" />
              Persyaratan
            </h3>
            <ul className="space-y-3">
              {PERSYARATAN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-light mt-2 shrink-0" />
                  <span className="fluid-body text-ash-muted">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Submit ───────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-10">
            <button
              type="submit"
              disabled={!form.nama || !form.usia || !form.ttl || !form.noWalimurid || !form.persetujuan}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none text-xs"
            >
              <Send size={14} />
              Kirim Pendaftaran
            </button>
          </motion.div>
        </motion.form>

        {/* ── Footer info ────────────────────────────────────────── */}
        <SectionReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="fluid-caption text-ash-muted/60">
              Atau hubungi langsung via WhatsApp:{' '}
              <a href="tel:+6282112388428" className="text-gold-light hover:text-gold transition-colors">
                0821 — 1238 — 8428
              </a>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
