import { MapPin, Mail, Music2 } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    handle: 'dragonwarriors26',
    url: 'https://instagram.com/dragonwarriors26',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    handle: '@ssb.dragonwarriors',
    url: 'https://tiktok.com/@ssb.dragonwarriors',
    icon: <Music2 size={15} />,
  },
  {
    platform: 'Email',
    handle: 'dragonwarriors266@gmail.com',
    url: 'mailto:dragonwarriors266@gmail.com',
    icon: <Mail size={15} />,
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-bg-void border-t border-gold/20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M100 10 L190 100 L100 190 L10 100 Z' fill='none' stroke='%23946B31' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-widest uppercase text-ash-muted">
            Partner Dragon Warriors
          </p>
          <div className="flex items-center gap-6">
            <img
              src="/britanica.webp"
              alt="Britannica Education — Official Partner Dragon Warriors"
              className="h-10 md:h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div>
            <img
              src="/logo.png"
              alt="Dragon Warriors"
              className="h-12 md:h-14 w-auto mb-4"
            />
            <p className="font-body text-ash-muted text-sm leading-relaxed max-w-[65ch]">
              SSB Fajar Muda — Dragon Warriors adalah sekolah sepak bola yang berkomitmen membentuk karakter juara sejak dini. Berbasis di Depok, Jawa Barat.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ash uppercase tracking-wider mb-4">
              Kunjungi Kami
            </h4>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <p className="font-body text-ash-muted text-sm leading-relaxed">
                Lapangan Eden Sport Center,
                Jl. Raya Pengasinan No.99, RT.04/RW.01,
                Pengasinan, Kecamatan Sawangan,
                Kota Depok, Jawa Barat
              </p>
            </div>
            <div className="mt-6">
              <h5 className="font-mono text-[10px] tracking-widest uppercase text-ash-muted mb-2">
                Jam Latihan
              </h5>
              <p className="font-body text-ash-muted text-sm">
                <span className="font-semibold text-ash">Senin — Rabu</span>
                <br />
                <span className="font-mono text-cyan-dim">15.00 WIB — 18.00 WIB</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ash uppercase tracking-wider mb-4">
              Sosial
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ash-muted hover:text-gold-light transition-colors text-sm group"
                >
                  <span className="group-hover:text-gold-light transition-colors">{link.icon}</span>
                  {link.handle}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ash uppercase tracking-wider mb-4">
              Kontak
            </h4>
            <p className="font-body text-sm text-ash-muted">
              <span className="font-semibold text-ash">Si Draco</span>
              <br />
              <a
                href="tel:+6282112388428"
                className="font-mono text-gold-light hover:text-gold transition-colors"
              >
                0821 — 1238 — 8428
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-ash-muted text-xs">
            &copy; {new Date().getFullYear()} Dragon Warriors. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-wider text-ash-muted/60">
            SSB FAJAR MUDA — DEPOK
          </p>
        </div>
      </div>
    </footer>
  )
}
