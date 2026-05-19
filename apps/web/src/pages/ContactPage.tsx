import { Header, Footer } from '@/components/layout'

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            Hubungi <span className="text-primary">Kami</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                Alamat Kantor
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Jl. Teknologi No. 123<br />
                Kawasan Digital Valley<br />
                Jakarta Selatan, 12000<br />
                Indonesia
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">contact_support</span>
                Kontak Langsung
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-gray-400">mail</span>
                  <a href="mailto:support@satri.id" className="text-primary hover:underline">support@satri.id</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-gray-400">call</span>
                  <a href="tel:+6281234567890" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">+62 812-3456-7890</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-gray-400">chat</span>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">WhatsApp Live Chat</a>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                Jam Operasional
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="font-semibold">09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="font-semibold">10:00 - 15:00</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8 h-fit">
            <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Masukkan nama anda"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="anda@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subjek
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                >
                  <option>Pilih subjek pesan</option>
                  <option>Pertanyaan Produk</option>
                  <option>Masalah Pesanan</option>
                  <option>Kerjasama</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white resize-none"
                  placeholder="Tulis pesan anda disini..."
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
