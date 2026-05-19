import { Router } from 'express'
import { authMiddleware } from '../middleware/auth'

// Import admin sub-routes
import { dashboardRoutes } from './admin/dashboard'
import { ordersRoutes } from './admin/orders'
import { productsRoutes } from './admin/products'
import { expensesRoutes } from './admin/expenses'

const router = Router()

// All admin routes require authentication
router.use(authMiddleware)

// Mount admin sub-routes
router.use('/dashboard', dashboardRoutes)
router.use('/orders', ordersRoutes)
router.use('/products', productsRoutes)
router.use('/expenses', expensesRoutes)

export { router as adminRoutes }
