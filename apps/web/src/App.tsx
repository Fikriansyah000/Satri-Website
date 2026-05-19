import { Routes, Route } from 'react-router-dom'
import { HomePage, CatalogPage, CheckoutPage, PaymentPage, OrderStatusPage, OrdersPage, AdminOrdersPage, AdminDashboardPage, SalesPage, ExpensesPage, ContactPage, HowToOrderPage, AdminProductsPage } from '@/pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/produk" element={<CatalogPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-status" element={<OrderStatusPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/sales" element={<SalesPage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/expenses" element={<ExpensesPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/kontak" element={<ContactPage />} />
      <Route path="/cara-order" element={<HowToOrderPage />} />
    </Routes>
  )
}

export default App
