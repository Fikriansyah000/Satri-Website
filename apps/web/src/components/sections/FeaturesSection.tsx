import { motion } from 'framer-motion'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: 'local_shipping',
    title: 'Pengiriman Cepat',
    description: 'Dikirim langsung hari ini',
  },
  {
    icon: 'workspace_premium',
    title: 'Bahan Premium',
    description: '100% Singkong Pilihan',
  },
  {
    icon: 'support_agent',
    title: 'Layanan 24/7',
    description: 'Siap melayani pesananmu',
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-primary dark:bg-red-900/40 text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-default"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-white/20 rounded-full"
              >
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </motion.div>
              <div>
                <h4 className="font-bold text-lg">{feature.title}</h4>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection
