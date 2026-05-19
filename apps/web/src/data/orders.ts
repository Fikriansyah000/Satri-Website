import { products } from './products'

// ==================== INTERFACES ====================

export interface CartItem {
  productId: string
  product: typeof products[0]
  quantity: number
  spicyLevel?: number
  notes?: string
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  notes?: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: CustomerInfo
  items: CartItem[]
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  paymentMethod: 'qris' | 'cod'
  paymentStatus: 'pending' | 'uploaded' | 'verified' | 'paid'
  paymentProofUrl?: string
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
  updatedAt: Date
}

// ==================== DUMMY DATA ====================

// Dummy Cart (connected to products)
export const dummyCart: CartItem[] = [
  {
    productId: 'pikset-original',
    product: products[0],
    quantity: 2,
    notes: 'Pedas sedang ya'
  },
  {
    productId: 'sempring-pedas',
    product: products[2],
    quantity: 3,
  },
  {
    productId: 'basreng-pedas',
    product: products[4],
    quantity: 1,
    notes: 'Extra pedas'
  }
]

// Dummy Customer Info
export const dummyCustomer: CustomerInfo = {
  name: 'Ahmad Rizki',
  phone: '081234567890',
  address: 'Jl. Merdeka No. 123, RT 05/RW 02, Kelurahan Sukamaju',
  city: 'Bandung',
  province: 'Jawa Barat',
  postalCode: '40123',
  notes: 'Rumah warna biru, sebelah warung'
}

// Dummy Recent Orders (untuk tabel realtime)
export const dummyRecentOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'STR-20260131-001',
    customer: {
      name: 'Budi Santoso',
      phone: '081298765432',
      address: 'Jl. Sudirman No. 45',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '10210',
    },
    items: [
      { productId: 'pikset-original', product: products[0], quantity: 5 },
      { productId: 'sempring-pedas', product: products[2], quantity: 3 },
    ],
    subtotal: 140000,
    shippingCost: 15000,
    discount: 0,
    total: 155000,
    paymentMethod: 'qris',
    paymentStatus: 'verified',
    orderStatus: 'processing',
    createdAt: new Date('2026-01-31T10:30:00'),
    updatedAt: new Date('2026-01-31T10:45:00'),
  },
  {
    id: 'ord-002',
    orderNumber: 'STR-20260131-002',
    customer: {
      name: 'Siti Nurhaliza',
      phone: '085612345678',
      address: 'Jl. Asia Afrika No. 78',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '40112',
    },
    items: [
      { productId: 'paket-hemat', product: products[5], quantity: 2 },
    ],
    subtotal: 100000,
    shippingCost: 12000,
    discount: 5000,
    total: 107000,
    paymentMethod: 'qris',
    paymentStatus: 'uploaded',
    orderStatus: 'pending',
    paymentProofUrl: '/uploads/proof-002.jpg',
    createdAt: new Date('2026-01-31T11:15:00'),
    updatedAt: new Date('2026-01-31T11:20:00'),
  },
  {
    id: 'ord-003',
    orderNumber: 'STR-20260131-003',
    customer: {
      name: 'Andi Pratama',
      phone: '087811223344',
      address: 'Jl. Gatot Subroto No. 12',
      city: 'Surabaya',
      province: 'Jawa Timur',
      postalCode: '60123',
    },
    items: [
      { productId: 'basreng-pedas', product: products[4], quantity: 10 },
    ],
    subtotal: 180000,
    shippingCost: 20000,
    discount: 10000,
    total: 190000,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: new Date('2026-01-31T12:00:00'),
    updatedAt: new Date('2026-01-31T12:05:00'),
  },
  {
    id: 'ord-004',
    orderNumber: 'STR-20260131-004',
    customer: {
      name: 'Dewi Lestari',
      phone: '081377889900',
      address: 'Jl. Diponegoro No. 56',
      city: 'Semarang',
      province: 'Jawa Tengah',
      postalCode: '50123',
    },
    items: [
      { productId: 'pikset-keju', product: products[1], quantity: 4 },
      { productId: 'sempring-original', product: products[3], quantity: 2 },
    ],
    subtotal: 108000,
    shippingCost: 15000,
    discount: 0,
    total: 123000,
    paymentMethod: 'qris',
    paymentStatus: 'verified',
    orderStatus: 'shipped',
    createdAt: new Date('2026-01-31T09:00:00'),
    updatedAt: new Date('2026-01-31T14:00:00'),
  },
  {
    id: 'ord-005',
    orderNumber: 'STR-20260130-015',
    customer: {
      name: 'Rini Wulandari',
      phone: '082244556677',
      address: 'Jl. Ahmad Yani No. 89',
      city: 'Yogyakarta',
      province: 'DI Yogyakarta',
      postalCode: '55123',
    },
    items: [
      { productId: 'paket-hemat', product: products[5], quantity: 1 },
      { productId: 'pikset-original', product: products[0], quantity: 2 },
    ],
    subtotal: 78000,
    shippingCost: 12000,
    discount: 0,
    total: 90000,
    paymentMethod: 'qris',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: new Date('2026-01-30T16:30:00'),
    updatedAt: new Date('2026-01-31T10:00:00'),
  },
]

// ==================== HELPER FUNCTIONS ====================

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const getPaymentStatusLabel = (status: Order['paymentStatus']): string => {
  const labels = {
    pending: 'Menunggu Pembayaran',
    uploaded: 'Bukti Diupload',
    verified: 'Terverifikasi',
    paid: 'Lunas',
  }
  return labels[status]
}

export const getPaymentStatusColor = (status: Order['paymentStatus']): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    uploaded: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    verified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }
  return colors[status]
}

export const getOrderStatusLabel = (status: Order['orderStatus']): string => {
  const labels = {
    pending: 'Menunggu',
    confirmed: 'Dikonfirmasi',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Selesai',
  }
  return labels[status]
}

export const getOrderStatusColor = (status: Order['orderStatus']): string => {
  const colors = {
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    processing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    shipped: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }
  return colors[status]
}

// Generate WhatsApp message for order confirmation
export const generateWhatsAppMessage = (
  orderNumber: string,
  customer: CustomerInfo,
  items: CartItem[],
  total: number,
  paymentMethod: 'qris' | 'cod'
): string => {
  const itemsList = items
    .map(item => {
      const spicyInfo = item.spicyLevel ? ` (Level ${item.spicyLevel} 🔥)` : ''
      return `• ${item.product.name}${spicyInfo} x${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`
    })
    .join('\n')

  const message = `Halo Satri Snack! 🔥

Saya ingin konfirmasi pesanan:

*No. Pesanan:* ${orderNumber}
*Nama:* ${customer.name}
*No. HP:* ${customer.phone}

*Alamat Pengiriman:*
${customer.address}
${customer.city}, ${customer.province} ${customer.postalCode}
${customer.notes ? `\n*Catatan:* ${customer.notes}` : ''}

*Detail Pesanan:*
${itemsList}

*Total:* ${formatPrice(total)}
*Metode Bayar:* ${paymentMethod === 'qris' ? 'QRIS' : 'COD (Bayar di Tempat)'}

${paymentMethod === 'qris' ? '📸 Bukti transfer akan saya kirim setelah pembayaran.' : '💵 Saya akan bayar saat barang sampai.'}

Mohon konfirmasi pesanan saya. Terima kasih! 🙏`

  return message
}

// WhatsApp number for the store
export const STORE_WHATSAPP = '6281234567890'
