import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-[#f5f0f0] dark:border-[#3d2b2a]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-4 text-primary group">
            <div className="size-8 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_fire_department</span>
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black tracking-tighter">
              Satri<span className="text-primary">.</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-200">
              Beranda
            </Link>
            <Link to="/produk" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-200">
              Produk
            </Link>
            <Link to="/orders" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors dark:text-gray-200">
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              Lihat Pesanan
            </Link>
            <Link to="/cara-order" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-200">
              Cara Order
            </Link>
            <Link to="/kontak" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-200">
              Kontak
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/checkout" className="relative flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
              <span className="material-symbols-outlined text-gray-700 dark:text-gray-200 group-hover:text-primary">
                shopping_cart
              </span>
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
