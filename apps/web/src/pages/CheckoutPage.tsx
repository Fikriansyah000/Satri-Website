import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '@/data/products'
import { formatPrice, CustomerInfo, CartItem } from '@/data/orders'
import { Header } from '@/components/layout'
import { useCart } from '@/context/CartContext'

const CheckoutPage = () => {
  const navigate = useNavigate()
  
  const { items, updateQuantity, updateSpicyLevel } = useCart()
  
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'cod'>('qris')
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  })

  // Calculate cart items mapped with products
  const cartItems: CartItem[] = useMemo(() => {
    return items
      .map(item => {
        const product = products.find(p => p.id === item.productId)
        if (!product) return null
        return { 
          productId: item.productId, 
          product, 
          quantity: item.quantity,
          spicyLevel: item.spicyLevel || 1
        }
      })
      .filter((item): item is CartItem => item !== null)
  }, [items])

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shippingCost = 0
  const discount = subtotal >= 100000 ? 5000 : 0
  const total = subtotal + shippingCost - discount



  const handleProceed = () => {
    if (cartItems.length === 0) {
      alert('Keranjang masih kosong!')
      return
    }
    if (!customer.name || !customer.phone) {
      alert('Mohon isi nama dan nomor WhatsApp!')
      return
    }
    
    // Store order data in sessionStorage for next page
    const orderData = {
      orderNumber: `STR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      customer,
      items: cartItems,
      subtotal,
      shippingCost,
      discount,
      total,
      paymentMethod,
    }
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData))
    navigate('/payment')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header hideNav={true} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
          <p className="text-gray-500 mt-1">Pilih produk, isi data, dan konfirmasi via WhatsApp</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column: Product Selection & Customer Info */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Product Selection */}
            <div className="bg-white dark:bg-[#1a0f0e] p-6 rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
                Pilih Produk
              </h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.product;
                  const qty = item.quantity;
                  return (
                    <div key={product.id} className={`flex gap-4 p-4 rounded-lg border-2 transition-all border-primary bg-primary/5`}>
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            {product.badge && (
                              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                                {product.badge.text}
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-primary whitespace-nowrap">{formatPrice(product.price)}</p>
                        </div>

                        {/* Spicy Level Selection */}
                        {qty > 0 && typeof product.spicyLevel === 'number' && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Level Pedas:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                  key={level}
                                  onClick={() => updateSpicyLevel(product.id, level)}
                                  className={`p-1 rounded-full transition-all ${
                                    (item.spicyLevel || 1) >= level 
                                      ? 'text-red-500 scale-110' 
                                      : 'text-gray-300 dark:text-gray-700 hover:text-red-300'
                                  }`}
                                  title={`Level ${level}`}
                                >
                                  <span className={`material-symbols-outlined text-lg ${(item.spicyLevel || 1) >= level ? 'fill-current' : ''}`}>
                                    local_fire_department
                                  </span>
                                </button>
                              ))}
                              <span className="text-xs font-bold text-red-500 ml-1">
                                Level {item.spicyLevel || 1}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            disabled={qty === 0}
                          >
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{qty}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                          {qty > 0 && (
                            <span className="ml-auto text-sm font-medium text-primary">
                              = {formatPrice(product.price * qty)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white dark:bg-[#1a0f0e] p-6 rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Informasi Pembeli
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">Nama Lengkap *</span>
                  <input 
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({...customer, name: e.target.value})}
                    className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Masukkan nama"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">No. WhatsApp *</span>
                  <input 
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-[#1a0f0e] p-6 rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Metode Pembayaran
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* QRIS Option */}
                <label 
                  className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${
                    paymentMethod === 'qris'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('qris')}
                >
                  <div className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'qris'}
                      onChange={() => setPaymentMethod('qris')}
                      className="mt-1 h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">qr_code_2</span>
                        <span className="font-bold text-gray-900 dark:text-white">QRIS</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Transfer via GoPay, OVO, Dana, ShopeePay, dll</p>
                      <p className="text-xs text-primary mt-2 font-medium">📸 Upload bukti transfer setelah bayar</p>
                    </div>
                  </div>
                </label>

                {/* COD Option */}
                <label 
                  className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-start gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                        <span className="font-bold text-gray-900 dark:text-white">COD</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Bayar tunai saat barang sampai</p>
                      <p className="text-xs text-orange-600 mt-2 font-medium">💵 Siapkan uang pas ya!</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ringkasan Pesanan</h3>
                <p className="text-sm text-gray-500">{cartItems.length} produk dipilih</p>
              </div>

              {/* Items List */}
              <div className="p-6 max-h-[250px] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2">shopping_cart</span>
                    <p>Belum ada produk dipilih</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex flex-col gap-1 text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0 dark:border-gray-800">
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{item.product.name}</p>
                            <p className="text-gray-500 text-xs">{formatPrice(item.product.price)} x {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900 dark:text-white ml-4">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                        {typeof item.spicyLevel === 'number' && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">local_fire_department</span>
                            Level {item.spicyLevel}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Calculations */}
              <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 p-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <p>Diskon (min. 100rb)</p>
                    <p>-{formatPrice(discount)}</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-bold text-gray-900 dark:text-white">Total</p>
                  <p className="text-xl font-bold text-primary">{formatPrice(total)}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button 
                  onClick={handleProceed}
                  disabled={cartItems.length === 0}
                  className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-xs text-center text-gray-400 mt-3">
                  Konfirmasi pesanan via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a0f0e]">
        <p>© 2026 Satri Snack. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default CheckoutPage
