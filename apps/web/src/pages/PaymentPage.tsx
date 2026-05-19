import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, generateWhatsAppMessage, STORE_WHATSAPP, CustomerInfo, CartItem } from '@/data/orders'
import { Header } from '@/components/layout'
import { useCart } from '@/context/CartContext'

interface OrderData {
  orderNumber: string
  customer: CustomerInfo
  items: CartItem[]
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  paymentMethod: 'qris' | 'cod'
}

const PaymentPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { clearCart } = useCart()

  useEffect(() => {
    const stored = sessionStorage.getItem('pendingOrder')
    if (stored) {
      setOrderData(JSON.parse(stored))
    } else {
      // No order data, redirect back
      navigate('/checkout')
    }
  }, [navigate])

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-gray-400 animate-spin">progress_activity</span>
          <p className="mt-2 text-gray-500">Memuat data pesanan...</p>
        </div>
      </div>
    )
  }

  const whatsAppMessage = generateWhatsAppMessage(
    orderData.orderNumber,
    orderData.customer,
    orderData.items,
    orderData.total,
    orderData.paymentMethod
  )

  const whatsAppUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(whatsAppMessage)}`

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsAppMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB')
        return
      }
      setPaymentProof(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentProofPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveProof = () => {
    setPaymentProof(null)
    setPaymentProofPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmitOrder = async () => {
    if (orderData.paymentMethod === 'qris' && !paymentProof) {
      alert('Mohon upload bukti pembayaran terlebih dahulu')
      return
    }
    
    setIsUploading(true)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Cleanup cart context and navigate
    clearCart()
    sessionStorage.removeItem('pendingOrder')
    navigate('/order-status', { state: { orderNumber: orderData.orderNumber } })
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header hideNav={true} />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Konfirmasi Pesanan</h1>
          <p className="text-gray-500 mt-1">Pesanan #{orderData.orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Order Details & QR */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                  Detail Pesanan
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  orderData.paymentMethod === 'qris' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {orderData.paymentMethod === 'qris' ? 'QRIS' : 'COD'}
                </span>
              </div>
              
              <div className="p-5 space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ongkir</span>
                    <span>{formatPrice(orderData.shippingCost)}</span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Diskon</span>
                      <span>-{formatPrice(orderData.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QRIS Payment - Only show if QRIS selected */}
            {orderData.paymentMethod === 'qris' && (
              <div className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">qr_code_2</span>
                    Scan QRIS untuk Bayar
                  </h3>
                </div>
                
                <div className="p-6 flex flex-col items-center">
                  {/* QR Code Placeholder */}
                  <div className="relative bg-white p-4 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5 p-3">
                        {Array.from({length: 64}).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-2 rounded-lg shadow">
                          <span className="material-symbols-outlined text-primary text-2xl">local_fire_department</span>
                        </div>
                      </div>
                    </div>
                    {/* Scan Animation */}
                    <div className="absolute inset-4 overflow-hidden rounded-lg pointer-events-none">
                      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Scan dengan GoPay, OVO, Dana, ShopeePay, dll
                  </p>
                  
                  <div className="mt-4 w-full p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
                      ⚠️ Setelah transfer, upload bukti pembayaran di bawah
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Info */}
            <div className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">person</span>
                Info Pembeli
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">{orderData.customer.name}</p>
                <p className="text-gray-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">phone</span>
                  {orderData.customer.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Upload Proof & WhatsApp Confirmation */}
          <div className="space-y-6">
            {/* Upload Payment Proof - Only for QRIS */}
            {orderData.paymentMethod === 'qris' && (
              <div className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">upload_file</span>
                    Upload Bukti Pembayaran
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Wajib untuk pembayaran QRIS</p>
                </div>
                
                <div className="p-5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {!paymentProofPreview ? (
                    <button
                      onClick={handleUploadClick}
                      className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-gray-400">cloud_upload</span>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Klik untuk upload</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max. 5MB)</p>
                      </div>
                    </button>
                  ) : (
                    <div className="relative">
                      <img 
                        src={paymentProofPreview} 
                        alt="Payment Proof" 
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        onClick={handleRemoveProof}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                      <div className="absolute bottom-2 left-2 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {paymentProof?.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WhatsApp Confirmation */}
            <div className="bg-white dark:bg-[#1a0f0e] rounded-xl shadow-sm border border-[#e6dcdb] dark:border-gray-800 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500">chat</span>
                  Konfirmasi via WhatsApp
                </h3>
                <p className="text-xs text-gray-500 mt-1">Kirim pesan ke admin untuk konfirmasi pesanan</p>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Message Preview */}
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-h-[200px] overflow-y-auto border border-gray-200 dark:border-gray-700">
                    {whatsAppMessage}
                  </div>
                  <button
                    onClick={handleCopyMessage}
                    className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Kirim via WhatsApp
                </a>

                <p className="text-xs text-center text-gray-400">
                  Atau salin pesan di atas dan kirim manual ke <span className="font-mono">+62 812-3456-7890</span>
                </p>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={isUploading || (orderData.paymentMethod === 'qris' && !paymentProof)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Memproses...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  {orderData.paymentMethod === 'qris' ? 'Kirim Pesanan & Bukti Bayar' : 'Konfirmasi Pesanan COD'}
                </>
              )}
            </button>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Kembali ke Checkout
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a0f0e]">
        <p>© 2026 Satri Snack. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default PaymentPage
