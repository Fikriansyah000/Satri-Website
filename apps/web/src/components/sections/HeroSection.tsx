import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Particle Generator Component
const Particles = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  if (!isClient) return null

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => {
        // Randomize initial positions and animations for each particle
        const randomX = Math.random() * 100
        const randomY = Math.random() * 100
        const randomDuration = 15 + Math.random() * 20
        const randomDelay = Math.random() * -20
        const size = Math.random() * 4 + 2

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-500/50 will-change-transform"
            style={{
              width: size,
              height: size,
              left: `${randomX}%`,
              top: `${randomY}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 80 - 40, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "linear",
              delay: randomDelay
            }}
          />
        )
      })}
    </div>
  )
}

const HeroSection = () => {
  const { scrollY } = useScroll()
  
  // Parallax effects for Scroll + Idle combination
  // The background video moves slower than scroll
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '15%'])
  // The content stays mostly stable but parallax slightly
  const contentY = useTransform(scrollY, [0, 500], [0, 50])

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black flex items-center">
      
      {/* Glow Breathing Effect */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-600/20 blur-[120px] rounded-full z-0 pointer-events-none will-change-transform"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-orange-600/10 blur-[100px] rounded-full z-0 pointer-events-none will-change-transform"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Layer 1: Cinematic Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 will-change-transform"
      >
        <motion.div
          animate={{ 
            y: [0, -25, 0], 
            x: [0, 10, 0],
            rotate: [0, 1, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full will-change-transform"
        >
          <img
            src="/keripik-gif.webp"
            alt="Keripik Background"
            className="w-full h-full object-cover opacity-90"
          />
        </motion.div>
      </motion.div>

      {/* Layer 1.5: Particles Layer */}
      <Particles />

      {/* Layer 2: Gradient Overlays for Readability (No Pointer Events) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/95 via-black/60 to-black/10 pointer-events-none"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none"></div>

      {/* Layer 3: Foreground Content */}
      <div className="layout-container w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-none">
        <motion.div 
          style={{ y: contentY }}
          className="max-w-2xl text-left flex flex-col items-start gap-6 will-change-transform"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-xl"
          >
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            Pedasnya Nampol!
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-white text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            Sensasi Pedas Yang <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              Bikin Ketagihan!
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-gray-200 text-lg sm:text-xl max-w-lg leading-relaxed drop-shadow-lg"
          >
            Rasakan kerenyahan keripik singkong dan basreng premium dengan racikan bumbu rahasia yang pedasnya nendang di lidah.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 pointer-events-auto"
          >
            <Link to="/cara-order">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto btn-primary shadow-[0_0_20px_rgba(239,68,68,0.4)] border-none">
                Pesan Sekarang
              </motion.button>
            </Link>
            <Link to="/produk">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-white border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-colors">
                Lihat Menu
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="flex items-center gap-6 mt-8 pointer-events-auto"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-black/50 bg-gray-300 bg-cover shadow-lg"
                  style={{ backgroundImage: i === 1 ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCarUnKA8rgsvB9GMjLN1N5DPMIrvu1IVtLLD18lx6OxLnobFXbpJ1MOArMtBqs1QbAnrxn2Tiu1kTeP5Zp1z0FnwVVuTI7Wj3EhIPJoPlA0PPErmlyLIrGBRWhjC1jz0n-y5Uye6qQ9SdLlVEMguHQjYuDBKpsIy7BjMZ_-fgh9jre6b-m5ryLQic04mMEsQ4GYENO_7D5OunGOsnAW2nEI39t22BxuyMVRmi-R1GSWmH1hwaW74T6qHYoap6CCySKwvG7t0FVRgWg')" : i === 2 ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACTHDLyKNmat8OG9rrJhOkSGFt-RckcM4tTqtNSlCEvqYIRuP60Jlm926T0Pqk50pmqF_xJN06hv5KOwaltAT7esqXixvatZPeLJ22LQLF6f7Obe3ftY2CksU66MWYD8z7BlOZI78THQdZgP64YCZakUKagQUh__74ustQ38Cj37NDBopFu8A-cRDUHBtp9jkYiuXm9ADtSAB2qjs_0wym26ZuEUXJ6-RS9-aUBwT31IhsCnOJUIe4QEFjK2YWncuRrIHtuzLMrkc2')" : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn_DjD3KAKABFvmuzerAxyKGf-8HgT4byELxPhTrjAeFl3RBvtQQ2fTnhIMXCUNP6RqffE_-PfWfjAJHb22Vn0ZPtJSe3EL_tPQJWB24W1RQn0vMByVYwlkeOC6UgYTKvKdMcUZ9i7-EkurK4zxHEJ8gYNOMt9G8lnTs__71PeD30UDrrC49okmlKz31gjap8fENbfvCkjqan-XN4peE39vzGMRYwKcnYz4GtEw0lm94IwGW1_viv9-mjxn5Ul5FdT98KA_MC8Rx3F')" }}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-300">
              1000+ Pecinta Pedas Puas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
