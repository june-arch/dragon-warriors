import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import DragonCanvas from '../dragon/DragonCanvas'
import AnimatedHeroTitle from '../ui/AnimatedHeroTitle'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [dragonProgress, setDragonProgress] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setDragonProgress(latest)
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-svh min-h-[600px] overflow-hidden"
    >
      <DragonCanvas progress={dragonProgress} />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-void/40 via-transparent to-bg-void/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="eyebrow text-gold/80 mb-6"
          >
            AKADEMI SEPAK BOLA PROFESIONAL · DEPOK, JAWA BARAT
          </motion.p>

          <AnimatedHeroTitle startDelay={1.8} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="mt-4 md:mt-6 text-ash-muted font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Tempat para pejuang muda menemukan sayapnya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <a href="#daftar" className="btn-primary">
              Daftar Sekarang
            </a>
            <a href="#program" className="btn-secondary">
              Kenali Kami
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-ash-muted">
          Scroll to explore
        </span>
        <ChevronDown size={16} className="text-cyan-dim animate-scroll-hint" />
      </motion.div>

      <div className="hidden lg:block absolute bottom-0 inset-x-0 z-10 h-48 bg-gradient-to-t from-bg-void to-transparent pointer-events-none" />
    </section>
  )
}