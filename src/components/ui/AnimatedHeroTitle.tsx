import { motion } from 'framer-motion'

const DRAGON_LETTERS = 'DRAGON'.split('')
const WARRIORS_LETTERS = 'WARRIORS'.split('')

const fireGradient = 'linear-gradient(135deg, #D9430B 0%, #FF6B2B 50%, #C8922A 100%)'

interface Props {
  startDelay?: number
}

export default function AnimatedHeroTitle({ startDelay = 0 }: Props) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: startDelay + 0.3,
      },
    },
  }

  const warriorsContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: startDelay + 0.3 + DRAGON_LETTERS.length * 0.06 + 0.2,
      },
    },
  }

  const dragonLetterVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      },
    },
  }

  const warriorLetterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 180,
        damping: 22,
        mass: 0.7,
      },
    },
  }

  return (
    <h1 className="font-display fluid-h1 font-black tracking-[0.15em] leading-none">
      <span className="sr-only">DRAGON WARRIORS</span>

      <span aria-hidden="true" className="flex flex-wrap items-baseline justify-center gap-x-4 md:gap-x-6">
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex"
        >
          {DRAGON_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              variants={dragonLetterVariants}
              className="inline-block text-ash"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        <motion.span
          variants={warriorsContainerVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex"
        >
          {WARRIORS_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              variants={warriorLetterVariants}
              className="inline-block"
              style={{
                backgroundImage: fireGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </span>
    </h1>
  )
}
