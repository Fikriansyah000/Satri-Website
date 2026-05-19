import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface HeaderProps {
  hideNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideNav = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { totalItems } = useCart()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Beranda', path: '/', label: 'Beranda' },
    { name: 'Produk', path: '/produk', label: 'Produk' },
    { name: 'Lihat Pesanan', path: '/orders', icon: 'receipt_long', label: 'Pesanan' },
    { name: 'Cara Order', path: '/cara-order', label: 'Cara Order' },
    { name: 'Kontak', path: '/kontak', label: 'Kontak' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-[#f5f0f0] dark:border-[#3d2b2a]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 text-primary group z-50 relative">
            <div className="size-8 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_fire_department</span>
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black tracking-tighter">
              Satri<span className="text-primary">.</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          {!hideNav && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                                 (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold transition-colors duration-200 relative ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 z-50 relative">
            {/* Cart Button */}
            <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined !text-[24px]">shopping_cart</span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary rounded-full border-2 border-white dark:border-[#1a0f0e]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile Menu Button */}
            {!hideNav && (
              <button 
                className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle menu"
              >
                <span className="material-symbols-outlined !text-[28px]">menu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && !hideNav && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-[#1a0f0e] z-50 md:hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined !text-[24px]">close</span>
                </button>
              </div>

              <div className="pt-20 px-6 pb-6 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div 
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                    >
                      <Link 
                        to={link.path} 
                        className={`flex items-center gap-3 text-lg font-medium transition-colors ${
                          location.pathname === link.path 
                            ? 'text-primary' 
                            : 'text-gray-800 dark:text-gray-200 hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.icon && <span className="material-symbols-outlined text-xl">{link.icon}</span>}
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  © 2026 Satri Snack
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
