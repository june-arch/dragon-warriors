import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  href?: string
  isCTA?: boolean
  children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Program',
    children: [
      { label: 'Sub Program U9 & U10', href: '#program-u9-u10' },
      { label: 'Sub Program U11 & U12', href: '#program-u11-u12' },
    ],
  },
  { label: 'Berita', href: '#berita' },
  { label: 'Temui TIM', href: '#temui-tim' },
  { label: 'Jadwal', href: '#jadwal' },
  { label: 'Siapa Kami', href: '#siapa-kami' },
  { label: 'Akademi', href: '#akademi' },
  { label: 'Daftar', href: '#daftar', isCTA: true },
]

function DesktopNavItem({ item }: { item: NavItem }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (item.isCTA) {
    return (
      <li>
        <Link to="/daftar" className="btn-primary text-xs !px-5 !py-2">
          {item.label}
        </Link>
      </li>
    )
  }

  if (item.children) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button className="flex items-center gap-1 px-3 py-2 text-sm font-body font-medium text-ash-muted hover:text-ash transition-colors cursor-pointer">
          {item.label}
          <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute top-full left-0 mt-1 w-52 bg-bg-raised border border-gold/20 shadow-xl shadow-black/40"
            >
              {item.children.map((child) => (
                <li key={child.label}>
                  <a
                    href={child.href}
                    className="block px-4 py-2.5 text-sm font-body text-ash-muted hover:text-ash hover:bg-gold/10 transition-colors"
                  >
                    {child.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    )
  }

  return (
    <li>
      <a
        href={item.href}
        className="px-3 py-2 text-sm font-body font-medium text-ash-muted hover:text-ash transition-colors relative group"
      >
        {item.label}
        <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </a>
    </li>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled ? 'glass' : 'glass-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20 md:h-24">
        <a href="#" className="flex items-center">
          <img
            src="/logo-header.png"
            alt="Dragon Warriors"
            className="h-20 md:h-24 w-auto"
          />
        </a>

        <button
          className="md:hidden text-ash p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-dark/95 backdrop-blur-xl overflow-hidden border-t border-gold/20"
          >
            <ul className="flex flex-col py-4 px-5 gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.isCTA ? (
                    <Link
                      to="/daftar"
                      onClick={() => setOpen(false)}
                      className="btn-primary text-xs !px-5 !py-2.5 w-full justify-center"
                    >
                      {item.label}
                    </Link>
                  ) : item.children ? (
                    <div>
                      <button
                        onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                        className="flex items-center justify-between w-full py-2.5 text-base font-body font-medium text-ash-muted hover:text-ash transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${mobileProgramOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileProgramOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l border-gold/20 ml-2"
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 text-sm font-body text-ash-muted hover:text-ash transition-colors"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-base font-body font-medium text-ash-muted hover:text-ash transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
