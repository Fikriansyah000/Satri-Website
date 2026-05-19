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

const AdminOrdersPage = () => {
  const [orders] = useState<Order[]>(dummyRecentOrders)
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'pending') return order.paymentStatus === 'pending' || order.paymentStatus === 'uploaded'
    if (filter === 'verified') return order.paymentStatus === 'verified' || order.paymentStatus === 'paid'
    return true
  })

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.paymentStatus === 'pending' || o.paymentStatus === 'uploaded').length,
    verified: orders.filter(o => o.paymentStatus === 'verified' || o.paymentStatus === 'paid').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'verified' || o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0)
  }

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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-xs font-medium">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Panel
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="material-symbols-outlined text-green-500 text-sm animate-pulse">fiber_manual_record</span>
              Update: {formatTime(lastUpdate)}
            </div>
            <Link to="/checkout" className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden sm:inline">Pesanan Baru</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
        {/* Page Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Kelola Pesanan
            </h1>
            <p className="text-gray-500 mt-1">
              Kelola semua pesanan yang masuk secara realtime
            </p>
          </div>
          
          <Link 
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-lg">visibility</span>
            <span className="hidden sm:inline">Consumer View</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#1a0f0e] rounded-xl p-4 shadow-sm border border-[#e6dcdb] dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">receipt_long</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Pesanan</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0e] rounded-xl p-4 shadow-sm border border-[#e6dcdb] dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">hourglass_empty</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                <p className="text-xs text-gray-500">Menunggu</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0e] rounded-xl p-4 shadow-sm border border-[#e6dcdb] dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.verified}</p>
                <p className="text-xs text-gray-500">Terverifikasi</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0e] rounded-xl p-4 shadow-sm border border-[#e6dcdb] dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">payments</span>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">{formatPrice(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500">Pendapatan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-[#1a0f0e] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-white dark:bg-[#1a0f0e] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-500'
            }`}
          >
            Menunggu ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === 'verified'
                ? 'bg-green-500 text-white'
                : 'bg-white dark:bg-[#1a0f0e] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-500'
            }`}
          >
            Terverifikasi ({stats.verified})
          </button>
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
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pembayaran</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Waktu</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
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
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {getPaymentStatusLabel(order.paymentStatus)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {order.paymentMethod === 'qris' ? 'QRIS' : 'COD'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                        {getOrderStatusLabel(order.orderStatus)}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        {order.paymentStatus === 'uploaded' && (
                          <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors">
                            Verifikasi
                          </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </div>
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
              
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">{order.customer.phone}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Items</p>
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
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatPrice(order.total)}</p>
                    <p className="text-xs text-gray-400">{order.paymentMethod === 'qris' ? 'QRIS' : 'COD'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.paymentStatus === 'uploaded' && (
                      <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors">
                        Verifikasi
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                      <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminOrdersPage
