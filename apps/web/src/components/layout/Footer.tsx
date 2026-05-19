import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-[#3d2b2a] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 block">
              Satri<span className="text-primary">.</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Menghadirkan cemilan pedas berkualitas tinggi untuk menemani setiap momen serumu.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Navigasi</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-primary transition-colors">Produk Kami</Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-primary transition-colors">Tentang Satri</Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Bantuan</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/cara-order" className="hover:text-primary transition-colors">Cara Pemesanan</Link>
              </li>
              <li>
                <Link to="/pengiriman" className="hover:text-primary transition-colors">Info Pengiriman</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privasi" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Dapatkan info promo pedas terbaru!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email kamu"
                className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white p-2 rounded-lg hover:bg-red-600 transition-colors">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-[#3d2b2a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2024 Satri Snacks. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200">Terms</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200">Privacy</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
