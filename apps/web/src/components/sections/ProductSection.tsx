import { motion } from 'framer-motion'
import SpicyLevel from '../ui/SpicyLevel'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  spicyLevel: number
  image: string
  badge?: {
    text: string
    color: 'primary' | 'accent'
  }
}

const products: Product[] = [
  {
    id: '1',
    name: 'Satri Pikset (Keripik Setan)',
    price: 15000,
    originalPrice: 20000,
    spicyLevel: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rcVFAw8wqfkkTPc6dp-uTxv0bzziDvyZOnEPj_henIwxmymrN8xenu-WZ7XfRp08QRp11RLdr_RdKdroVlLTXUuA9mxyqjuzYfKDpwFhXp5xe83PSQozuIzzbzeb3mztSyPWdkcXETmofCoMWqNaxlP49fh3pEa3nnOXtOmjyOrM11nGkfDWymDDXu6343kz62wdw3EpZat-xzRuNGQsLURm6KAAhekO5j86GUohkNOM1leDm9P3XUbP5Z_Ehzb7SBAXqtOp7Wpz',
    badge: { text: 'HOT', color: 'primary' },
  },
  {
    id: '2',
    name: 'Satri Sempring',
    price: 12000,
    spicyLevel: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmWXPUN6suzDHgAjjE8bp0MzerxkcsCvoFyZnGA9wT4LAUYuXGFk1qVO5xwUo6KkZYo7iX4ceQ01OngFLxcUqKR5nWlTth8_kcEhO3g9G0GZ5v_PIFerEFdDZ2gWFSx4zAtk0sSF42xdB4w-iWRcWfnBu2nyTnPGgI78uFeQeozZ6YHWc-gmyK4Oy8lo3dHOh834XPvr71q128ojncBIKIQcYGWcSc0aY-Y7RHLPosfQsgmXCvZB8VI4_-AbhVZmaPQXDeqX1BBaYa',
  },
  {
    id: '3',
    name: 'Satri Basreng Pedas',
    price: 18000,
    spicyLevel: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMS3TT9f8E3dvqxNep1HRG01x3XgKOn0LDAjoxuY9m18Zq3kkm5z-7xrGMJ2B4a8S8AOBgUNsOvXKjYD_yfF5NUhZKIOKNSO34nrelSbHOKo9DINdTeeqrNGy70lzaRGL_W_5-R6Ndl0zErpwxXccEAUEAysLsZ70ZD9vKfQb9y9-j36u_c4sulgKvzJaYJnePiJ9Pm_2x5r7J7XBHiayX3Xqqo8N3mFYpaCAwixUPo5sUXALW3RcDE3niOPF8X-O2rbHnX31zmTaJ',
    badge: { text: 'NEW', color: 'accent' },
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const ProductCard = ({ product, index }: { product: Product, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.badge && (
          <div
            className={`absolute top-3 left-3 z-10 ${
              product.badge.color === 'primary' ? 'bg-primary' : 'bg-accent'
            } text-white text-xs font-bold px-2.5 py-1 rounded-md`}
          >
            {product.badge.text}
          </div>
        )}
        <div
          className="w-full h-full bg-cover bg-center transform group-hover:scale-125 transition-transform duration-700"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full text-gray-900 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">visibility</span>
          </motion.button>
          <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="p-2 bg-white rounded-full text-gray-900 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="mb-4">
          <SpicyLevel level={product.spicyLevel} />
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const ProductSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4">
            Rekomendasi <span className="text-primary">Pilihan</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cobain produk-produk best seller kami yang sudah terbukti bikin nagih. Awas jangan sampai kalap!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="/produk" className="btn-secondary inline-flex gap-2">
            Lihat Semua Produk
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductSection
