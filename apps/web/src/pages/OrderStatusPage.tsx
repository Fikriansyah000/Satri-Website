import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, formatDateTime, STORE_WHATSAPP } from '@/data/orders'
import { Header } from '@/components/layout'

interface CompletedOrder {
  orderNumber: string
  customer: {
    name: string
    phone: string
    address: string
    city?: string
    province?: string
    postalCode?: string
    notes?: string
  }
  items: Array<{
    productId: string
    product: { name: string; price: number; images: string[] }
    quantity: number
  }>
  total: number
  paymentMethod: 'qris' | 'cod'
  paymentProofUploaded?: boolean
}

const OrderStatusPage = () => {
  const [order, setOrder] = useState<CompletedOrder | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('completedOrder')
    if (stored) {
      setOrder(JSON.parse(stored))
    }
  }, [])

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-gray-400">receipt_long</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tidak Ada Pesanan</h1>
          <p className="text-gray-500 mb-6">Anda belum memiliki pesanan aktif. Silakan buat pesanan baru.</p>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            Mulai Belanja
          </Link>
        </div>
      </div>
    )
  }

  const whatsAppUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(`Halo, saya ingin cek status pesanan ${order.orderNumber}`)}`

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header hideNav={true} />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 animate-ping bg-green-400/30 rounded-full"></div>
            <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="material-symbols-outlined text-5xl text-white">check</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-6">
            Pesanan Berhasil Dibuat!
          </h1>
          <p className="text-gray-500 mt-2">
            {order.paymentMethod === 'qris' 
              ? 'Bukti pembayaran Anda sedang kami verifikasi'
              : 'Siapkan pembayaran saat barang sampai'
            }
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white dark:bg-[#1a0f0e] rounded-2xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden mb-6">
          {/* Order Number Header */}
          <div className="p-5 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">No. Pesanan</p>
                <p className="text-xl font-bold font-mono text-primary">{order.orderNumber}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.paymentMethod === 'qris' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.paymentMethod === 'qris' ? 'QRIS' : 'COD'}
                </span>
                {order.paymentMethod === 'qris' && order.paymentProofUploaded && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                    Menunggu Verifikasi
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">shopping_bag</span>
              Item Pesanan
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Total Pembayaran</span>
              <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              Alamat Pengiriman
            </h3>
            <div className="text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">{order.customer.name}</p>
              <p className="text-gray-500">{order.customer.phone}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {order.customer.address}
                {order.customer.city && `, ${order.customer.city}`}
                {order.customer.province && `, ${order.customer.province}`}
                {order.customer.postalCode && ` ${order.customer.postalCode}`}
              </p>
              {order.customer.notes && (
                <p className="text-primary text-xs mt-2">📝 {order.customer.notes}</p>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-[#1a0f0e] rounded-2xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 p-5 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span>
            Langkah Selanjutnya
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-lg">check</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pesanan Dibuat</p>
                <p className="text-sm text-gray-500">{formatDateTime(new Date())}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                order.paymentMethod === 'qris' && order.paymentProofUploaded
                  ? 'bg-yellow-500 text-white'
                  : order.paymentMethod === 'cod'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {order.paymentMethod === 'qris' && order.paymentProofUploaded ? (
                  <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                ) : (
                  <span className="text-sm font-bold">2</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.paymentMethod === 'qris' ? 'Verifikasi Pembayaran' : 'Konfirmasi Admin'}
                </p>
                <p className="text-sm text-gray-500">
                  {order.paymentMethod === 'qris' && order.paymentProofUploaded
                    ? 'Sedang diproses...'
                    : 'Menunggu'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pesanan Diproses</p>
                <p className="text-sm text-gray-500">Menunggu</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dikirim</p>
                <p className="text-sm text-gray-500">Menunggu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cek Status via WhatsApp
          </a>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a0f0e]">
        <p>© 2026 Satri Snack. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default OrderStatusPage
