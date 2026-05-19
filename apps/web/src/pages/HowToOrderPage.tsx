import { Header, Footer } from '@/components/layout'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const HowToOrderPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const steps = [
    {
      id: 1,
      title: "Pilih Produk & Jumlah",
      description: "Kunjungi halaman Checkout dan pilih produk yang kamu inginkan. Tentukan jumlah dengan tombol + dan - sesuai kebutuhan.",
      icon: "shopping_cart",
      color: "from-orange-500 to-red-500",
      tip: "Minimal pembelian Rp 100.000 dapat diskon Rp 5.000!"
    },
    {
      id: 2,
      title: "Pilih Level Pedas 🔥",
      description: "Setiap produk bisa disesuaikan level pedasnya dari 1-5. Klik icon api untuk memilih tingkat kepedasan sesuai selera kamu!",
      icon: "local_fire_department",
      color: "from-red-500 to-pink-500",
      tip: "Level 1: Pemula | Level 3: Sedang | Level 5: Ekstrem! 🌶️"
    },
    {
      id: 3,
      title: "Isi Data Pembeli",
      description: "Masukkan nama lengkap dan nomor WhatsApp kamu. Data ini digunakan untuk konfirmasi pesanan dan koordinasi pengiriman.",
      icon: "person",
      color: "from-blue-500 to-cyan-500",
      tip: "Pastikan nomor WA aktif ya!"
    },
    {
      id: 4,
      title: "Pilih Metode Pembayaran",
      description: "Tersedia 2 opsi: QRIS (bayar via e-wallet/m-banking) atau COD (bayar di tempat). Pilih yang paling nyaman untukmu.",
      icon: "payments",
      color: "from-green-500 to-emerald-500",
      tip: "QRIS: Upload bukti transfer | COD: Siapkan uang pas"
    },
    {
      id: 5,
      title: "Konfirmasi via WhatsApp",
      description: "Setelah klik 'Lanjut ke Pembayaran', salin pesan otomatis yang sudah disiapkan lalu kirim ke WhatsApp Satri untuk konfirmasi.",
      icon: "chat",
      color: "from-emerald-500 to-teal-500",
      tip: "Pesan sudah include detail pesanan & level pedas!"
    },
    {
      id: 6,
      title: "Pesanan Diproses 🎉",
      description: "Admin akan memverifikasi pesanan dan pembayaran kamu. Setelah dikonfirmasi, pesanan langsung diproses dan siap dikirim!",
      icon: "verified",
      color: "from-purple-500 to-violet-500",
      tip: "Cek status pesanan di menu 'Lihat Pesanan'"
    }
  ]

  // Timeline line progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Header />
      
      <main className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
            >
              <span className="material-symbols-outlined text-lg">menu_book</span>
              Panduan Belanja
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
              Cara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Order</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Belanja di Satri itu gampang banget! Ikuti 6 langkah simple ini dan nikmati keripik pedas favoritmu 🔥
            </p>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section ref={containerRef} className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full" />
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8 md:space-y-16 relative py-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <motion.div 
                  className="relative z-10 flex-shrink-0 ml-0 md:ml-0"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className={`size-12 md:size-16 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer`}>
                    <span className="material-symbols-outlined text-2xl md:text-3xl">{step.icon}</span>
                  </div>
                  <motion.div 
                    className="absolute -top-2 -right-2 size-7 bg-white dark:bg-surface-dark rounded-full border-2 border-primary flex items-center justify-center font-bold text-sm text-primary shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    {step.id}
                  </motion.div>
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-left md:pr-16' : 'md:text-right md:pl-16'}`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white dark:bg-[#1a0f0e] p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {/* Tip Badge */}
                    <motion.div 
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${step.color} bg-opacity-10 text-sm`}
                      style={{ background: `linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))` }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="material-symbols-outlined text-primary text-base">lightbulb</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{step.tip}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Empty Spacer for alternating layout (Desktop) */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Summary */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl p-8 md:p-12 border border-primary/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Ringkasan Alur Order
            </h2>
            
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              {[
                { icon: "shopping_cart", text: "Pilih" },
                { icon: "local_fire_department", text: "Level Pedas" },
                { icon: "person", text: "Isi Data" },
                { icon: "payments", text: "Bayar" },
                { icon: "chat", text: "WhatsApp" },
                { icon: "celebration", text: "Selesai!" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark rounded-full shadow-md">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-white text-sm">{item.text}</span>
                  </div>
                  {i < 5 && (
                    <span className="material-symbols-outlined text-gray-400 text-sm hidden md:block">arrow_forward</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-center text-white"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-4"
              >
                <span className="material-symbols-outlined text-5xl">local_fire_department</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Siap Merasakan Pedasnya?
              </h2>
              <p className="text-white/90 mb-8 max-w-lg mx-auto text-lg">
                Jangan tunggu lagi! Order sekarang dan rasakan sensasi pedas yang bikin ketagihan 🔥
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined">shopping_cart</span>
                      Order Sekarang
                    </span>
                  </motion.button>
                </Link>
                <Link to="/produk">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined">menu_book</span>
                      Lihat Menu
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HowToOrderPage
