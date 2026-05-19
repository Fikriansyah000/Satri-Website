import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/layout'
import { Breadcrumbs, SpicyLevel } from '@/components/ui'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  spicyLevel?: number | null;
  images?: string[] | null;
  isActive?: boolean | null;
  stock?: number | null;
}

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Semua')
  const { addToCart } = useCart()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAddToCart = (product: Product) => {
    addToCart(product.id, 1, product.spicyLevel || 1)
    setToastMessage(`${product.name} ditambahkan ke keranjang!`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = activeFilter === 'Semua'
    ? products
    : products.filter(p => p.slug?.includes(activeFilter.toLowerCase()))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64 gap-3 text-gray-500">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Memuat produk...
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Produk' }]} />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
              Produk Kami
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Temukan cemilan pedas favoritmu disini.
            </p>
          </div>
        </div>

        {/* Filter & Sort Toolbar */}
        <div className="sticky top-20 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur py-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Chips */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {['Semua', 'Pikset', 'Sempring', 'Basreng'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                    ? 'bg-primary text-white shadow-sm hover:shadow-md'
                    : 'bg-white dark:bg-[#2a1d1d] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {filteredProducts.length} Produk
              </span>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2a1d1d] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  <span className="material-symbols-outlined !text-[18px]">sort</span>
                  Terbaru
                  <span className="material-symbols-outlined !text-[18px]">expand_more</span>
                </button>
                {/* Dropdown Mock */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2a1d1d] rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-primary bg-primary/5">Terbaru</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Harga Terendah</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Harga Tertinggi</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-[#2a1d1d] rounded-xl overflow-hidden border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Spicy Level Badge */}
                {product.spicyLevel && product.spicyLevel > 3 && (
                  <div className="absolute top-3 left-3 z-20 bg-white/90 dark:bg-black/80 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    🔥 Pedas
                  </div>
                )}

                {/* Primary Image */}
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 z-10"
                  />
                )}

                {/* Secondary Hover Image */}
                {product.images && (product.images[1] || product.images[0]) && (
                  <img
                    src={product.images[1] || product.images[0]}
                    alt={`${product.name} detail`}
                    className="w-full h-full object-cover absolute inset-0 z-0"
                  />
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2 text-gray-300">
                  {typeof product.spicyLevel === 'number' ? (
                    <SpicyLevel level={product.spicyLevel} />
                  ) : (
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {product.spicyLevel}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-black text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined !text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a1d1d] transition-colors">
            Tampilkan Lebih Banyak
            <span className="material-symbols-outlined !text-[20px]">arrow_downward</span>
          </button>
        </div>
      </main>

      <Footer />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-medium"
          >
            <span className="material-symbols-outlined text-green-400 dark:text-green-600">check_circle</span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CatalogPage
