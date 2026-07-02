import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Loader2, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react'
import { login, saveAuth } from '../../lib/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    setError(null)

    try {
      const data = await login(email, password)
      saveAuth(data)
      navigate('/admin/siswa', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-void flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Dragon Warriors" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-display font-bold text-xl text-ash">Admin Dashboard</h1>
          <p className="text-sm text-ash-muted mt-1">Masuk untuk mengelola data pendaftar</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-gold/20 rounded-xl p-6 bg-bg-surface/30 backdrop-blur-sm space-y-5">
          {/* Email */}
          <div>
            <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body py-2 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
            />
          </div>

          {/* Password */}
          <div>
            <label className="fluid-caption font-mono uppercase tracking-wider text-gold-light/70 block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent border-0 border-b-2 border-gold/20 focus:border-gold-light text-ash font-body py-2 pr-8 px-1 outline-none transition-colors duration-300 placeholder:text-ash-muted/30"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-ash-muted hover:text-ash transition-colors"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!email || !password || loading}
            className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed text-xs"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> Memproses...</>
            ) : (
              <><LogIn size={14} /> Masuk</>
            )}
          </button>

          <div className="text-center">
            <a href="/" className="text-xs text-ash-muted hover:text-gold-light transition-colors">
              &larr; Kembali ke Beranda
            </a>
          </div>
        </form>

        <p className="text-center text-xs text-ash-muted/50 mt-6">
          <Shield size={12} className="inline mr-1" />
          Hanya untuk admin Dragon Warriors
        </p>
      </motion.div>
    </div>
  )
}
