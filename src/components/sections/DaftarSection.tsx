import { useState, useRef, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  CheckCircle,
  FileText,
  AlertCircle,
  Upload,
  X,
  File,
  Loader2,
} from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'
import { daftarSiswa } from '../../lib/api'

interface FormData {
  nama: string
  usia: string
  ttl: string
  noWalimurid: string
  persetujuan: boolean
}

interface FileField {
  key: string
  label: string
  desc: string
  file: File | null
}

const PERSYARATAN_FIELDS: Omit<FileField, 'file'>[] = [
  {
    key: 'akteKelahiran',
    label: 'Akte Kelahiran',
    desc: 'Scan / foto akte kelahiran siswa yang jelas',
  },
  {
    key: 'kk',
    label: 'Kartu Keluarga (KK)',
    desc: 'Scan / foto Kartu Keluarga halaman pertama',
  },
  {
    key: 'nisn',
    label: 'NISN',
    desc: 'Nomor Induk Siswa Nasional — scan / foto bukti NISN',
  },
  {
    key: 'kia',
    label: 'KIA',
    desc: 'Kartu Identitas Anak (jika sudah punya)',
  },
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

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function DropzoneInput({
  file,
  onFile,
  onRemove,
  accept,
}: {
  file: File | null
  onFile: (f: File) => void
  onRemove: () => void
  accept: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) onFile(f)
  }

  if (file) {
    return (
      <div className="border border-emerald-500/30 rounded-lg p-4 bg-emerald-500/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <File size={20} className="text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-ash font-medium truncate">{file.name}</p>
            <p className="text-xs text-ash-muted">{formatSize(file.size)}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-ash-muted hover:text-red-400 transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-4 md:p-5 text-center cursor-pointer transition-all duration-200 ${
        dragOver
          ? 'border-gold-light bg-gold-light/10'
          : 'border-gold/20 hover:border-gold/40 bg-transparent hover:bg-gold/[0.02]'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFile(f)
        }}
      />
      <Upload size={24} className="mx-auto mb-2 text-gold-light/60" />
      <p className="text-sm text-ash-muted/80">
        <span className="text-gold-light">Klik</span> atau <span className="text-gold-light">seret file</span> ke sini
      </p>
      <p className="text-xs text-ash-muted/50 mt-1">{accept.replace(/,/g, ', ')} — maks 5MB</p>
    </div>
  )
}

export default function DaftarSection() {
  const [form, setForm] = useState<FormData>({
    nama: '',
    usia: '',
    ttl: '',
    noWalimurid: '',
    persetujuan: false,
  })

  const [files, setFiles] = useState<Record<string, File | null>>({
    akteKelahiran: null,
    kk: null,
    nisn: null,
    kia: null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setFile = (key: string, f: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: f }))
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.nama || !form.usia || !form.ttl || !form.noWalimurid || !form.persetujuan) return

    // Cek semua file terisi
    for (const f of PERSYARATAN_FIELDS) {
      if (!files[f.key]) {
        setError(`Harap unggah ${f.label}`)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const fd = new FormData()
      fd.append('nama', form.nama)
      fd.append('usia', form.usia)
      fd.append('ttl', form.ttl)
      fd.append('noWalimurid', form.noWalimurid)

      for (const f of PERSYARATAN_FIELDS) {
        const file = files[f.key]
        if (file) fd.append(f.key, file)
      }

      await daftarSiswa(fd)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success View ───────────────────────────────────────────────

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
                setFiles({ akteKelahiran: null, kk: null, nisn: null, kia: null })
                setError(null)
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

  // ── Form View ──────────────────────────────────────────────────

  const allTextFilled = form.nama && form.usia && form.ttl && form.noWalimurid && form.persetujuan
  const allFilesFilled = PERSYARATAN_FIELDS.every((f) => files[f.key])

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
                Nama Lengkap <span className="text-fire">*</span>
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
                Usia <span className="text-fire">*</span>
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
                Tempat Tanggal Lahir <span className="text-fire">*</span>
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
                No. Telepon Walimurid <span className="text-fire">*</span>
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

          {/* ── Unggah Persyaratan ───────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-10">
            <h3 className="fluid-h3 font-display font-bold text-ash mb-2 flex items-center gap-3">
              <Upload size={20} className="text-gold-light" />
              Unggah Persyaratan
            </h3>
            <p className="fluid-caption text-ash-muted mb-6">
              Semua file wajib diunggah. Format: JPG, PNG, atau PDF — maksimal 5MB per file.
            </p>

            <div className="space-y-5">
              {PERSYARATAN_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
                    {field.label} <span className="text-fire">*</span>
                  </label>
                  <p className="text-xs text-ash-muted/70 mb-2">{field.desc}</p>
                  <DropzoneInput
                    file={files[field.key]}
                    onFile={(f) => setFile(field.key, f)}
                    onRemove={() => setFile(field.key, null)}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Pernyataan ───────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-10">
            <div className="border border-gold/10 rounded-lg p-5 bg-gold/[0.02]">
              <p className="fluid-body text-ash-muted leading-relaxed">
                Dengan ini menyatakan bahwa data dan dokumen yang saya berikan adalah benar.
                Saya izinkan anak saya mendaftar sebagai siswa{' '}
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
                  Saya menyetujui pernyataan di atas <span className="text-fire">*</span>
                </span>
              </label>
            </div>
          </motion.div>

          {/* ── Error ────────────────────────────────────────────── */}
          {error && (
            <motion.div variants={itemVariants} className="mt-6">
              <div className="flex items-start gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* ── Submit ───────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mt-10">
            <button
              type="submit"
              disabled={!allTextFilled || !allFilesFilled || loading}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none text-xs"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Kirim Pendaftaran
                </>
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* ── Footer info ────────────────────────────────────────── */}
        <SectionReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="fluid-caption text-ash-muted/60">
              Atau hubungi langsung via WhatsApp:{' '}
              <a href="tel:+628****8428" className="text-gold-light hover:text-gold transition-colors">
                0821 — 1238 — 8428
              </a>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
