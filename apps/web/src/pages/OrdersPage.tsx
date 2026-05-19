import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  dummyRecentOrders,
  formatPrice,
  formatDateTime,
  formatTime,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getOrderStatusLabel,
  getOrderStatusColor,
  Order,
} from '../data/orders'

const OrdersPage = () => {
  const [orders] = useState<Order[]>(dummyRecentOrders)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Consumer view: hanya tampilkan pesanan yang verified/paid
  const filteredOrders = orders.filter(order => {
    return order.paymentStatus === 'verified' || order.paymentStatus === 'paid'
  })

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e6dcdb] dark:border-gray-800 bg-white dark:bg-[#1a0f0e] px-4 md:px-10 py-4 sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 text-primary group">
            <div className="size-8 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_fire_department</span>
            </div>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black tracking-tighter">
              Satri<span className="text-primary">.</span>
            </h2>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="material-symbols-outlined text-green-500 text-sm animate-pulse">fiber_manual_record</span>
              Update: {formatTime(lastUpdate)}
            </div>
            <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors text-sm">
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <Link to="/checkout" className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden sm:inline">Pesanan Baru</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Pesanan Terverifikasi
          </h1>
          <p className="text-gray-500 mt-1">
            Lihat pesanan yang sudah dikonfirmasi dan diverifikasi
          </p>
        </div>

        {/* Consumer Info Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-4">

              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Pesanan Terverifikasi ({filteredOrders.length})
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Berikut adalah daftar pesanan yang sudah dikonfirmasi dan terverifikasi pembayarannya. Pesanan sedang dalam proses pengiriman. 🚀
                </p>
              </div>
            </div>
          </div>

        {/* Orders Table - Desktop */}
        <div className="hidden md:block bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">No. Pesanan</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Items</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono font-semibold text-primary text-sm">{order.orderNumber}</span>
                    </td>
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1">
                        {order.items.slice(0, 2).map((item: Order['items'][number], idx: number) => (
                          <span key={idx} className="text-xs text-gray-600 dark:text-gray-300">
                            {item.product.name} x{item.quantity}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-xs text-gray-400">+{order.items.length - 2} lainnya</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(order.total)}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="font-mono font-semibold text-primary text-sm">{order.orderNumber}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDateTime(order.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {getPaymentStatusLabel(order.paymentStatus)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                    {getOrderStatusLabel(order.orderStatus)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-500">person</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{order.customer.name}</p>
                    <p className="text-xs text-gray-500">{order.customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {order.items.map((item: Order['items'][number], idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-300">
                      {item.product.name} x{item.quantity}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500">
                    {order.paymentMethod === 'qris' ? '💳 QRIS' : '💵 COD'}
                  </span>
                  <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-gray-300">inbox</span>
            <p className="text-gray-500 mt-2">Tidak ada pesanan dengan filter ini</p>
          </div>
        )}
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a0f0e]">
        <p>© 2026 Satri Snack. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default OrdersPage
