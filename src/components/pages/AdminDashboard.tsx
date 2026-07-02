import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, FileDown, Eye, Loader2, FileText, Calendar, Phone, User, LogOut, Shield } from 'lucide-react'
import { getSiswaList, isAuthenticated, getStoredUser, clearAuth, type SiswaResponse } from '../../lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    APPROVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    REJECTED: 'bg-red-500/15 text-red-400 border-red-500/25',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  )
}

const FILE_LABELS: Record<string, string> = {
  akteKelahiran: 'Akte Kelahiran',
  kk: 'Kartu Keluarga',
  nisn: 'NISN',
  kia: 'KIA',
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState<SiswaResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const user = getStoredUser()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true })
      return
    }
    getSiswaList()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = () => {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg-void">
      {/* Header */}
      <div className="border-b border-gold/10 bg-bg-surface/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Dragon Warriors" className="h-8 w-auto" />
            <span className="text-sm font-display font-bold text-ash hidden sm:block">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xs text-ash-muted hidden sm:flex items-center gap-1.5">
                <Shield size={12} />
                {user.name}
              </span>
            )}
            <button onClick={handleLogout} className="text-xs text-ash-muted hover:text-red-400 transition-colors flex items-center gap-1.5">
              <LogOut size={14} /> Keluar
            </button>
            <a href="/" className="text-xs text-ash-muted hover:text-gold-light transition-colors">
              &larr; Beranda
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gold/10 rounded-xl p-4 bg-bg-surface/30">
            <p className="text-2xl font-display font-bold text-ash">{data.length}</p>
            <p className="text-xs text-ash-muted mt-1">Total Pendaftar</p>
          </div>
          <div className="border border-gold/10 rounded-xl p-4 bg-bg-surface/30">
            <p className="text-2xl font-display font-bold text-amber-400">
              {data.filter((s) => s.status === 'PENDING').length}
            </p>
            <p className="text-xs text-ash-muted mt-1">Pending</p>
          </div>
          <div className="border border-gold/10 rounded-xl p-4 bg-bg-surface/30">
            <p className="text-2xl font-display font-bold text-emerald-400">
              {data.filter((s) => s.status === 'APPROVED').length}
            </p>
            <p className="text-xs text-ash-muted mt-1">Approved</p>
          </div>
          <div className="border border-gold/10 rounded-xl p-4 bg-bg-surface/30">
            <p className="text-2xl font-display font-bold text-red-400">
              {data.filter((s) => s.status === 'REJECTED').length}
            </p>
            <p className="text-xs text-ash-muted mt-1">Rejected</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-gold-light" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto text-ash-muted/30 mb-4" />
            <p className="text-ash-muted">Belum ada pendaftar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((siswa, i) => (
              <motion.div
                key={siswa.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border border-gold/10 rounded-xl p-5 bg-bg-surface/20 hover:border-gold/20 transition-colors"
              >
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display font-bold text-ash text-lg">{siswa.nama}</h3>
                      {statusBadge(siswa.status)}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-ash-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {siswa.ttl}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User size={13} />
                        {siswa.usia} tahun
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} />
                        {siswa.noWalimurid}
                      </span>
                    </div>
                    <p className="text-xs text-ash-muted/50 mt-1">
                      Mendaftar: {formatDate(siswa.createdAt)}
                    </p>
                  </div>
                </div>

                {/* File Persyaratan */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['akteKelahiran', 'kk', 'nisn', 'kia'] as const).map((key) => {
                    const url = siswa[`${key}Url` as keyof SiswaResponse] as string | null
                    const fileName = siswa[key] as string | null
                    return (
                      <div key={key}>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gold/10 hover:border-gold/30 bg-bg-void/30 hover:bg-bg-void/60 transition-all text-xs group"
                          >
                            <FileDown size={14} className="text-gold-light shrink-0" />
                            <span className="truncate text-ash-muted group-hover:text-ash">
                              {FILE_LABELS[key]}
                            </span>
                            <Eye size={12} className="text-ash-muted/40 ml-auto shrink-0" />
                          </a>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gold/5 bg-bg-void/20 text-xs text-ash-muted/40">
                            <FileText size={14} className="shrink-0" />
                            <span className="truncate">{FILE_LABELS[key]}</span>
                            <span className="ml-auto text-[10px]">—</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
