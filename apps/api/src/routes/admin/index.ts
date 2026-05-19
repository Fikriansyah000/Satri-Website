import { Router } from 'express'
import { authMiddleware } from '../../middleware/auth'

// Import admin sub-routes
import { dashboardRoutes } from './dashboard'
import { ordersRoutes } from './orders'
import { productsRoutes } from './products'
import { expensesRoutes } from './expenses'
import { uploadRoutes } from './upload'

const router = Router()

// All admin routes require authentication
router.use(authMiddleware)

// Mount admin sub-routes
router.use('/dashboard', dashboardRoutes)
router.use('/orders', ordersRoutes)
router.use('/products', productsRoutes)
router.use('/expenses', expensesRoutes)
router.use('/upload', uploadRoutes)

export { router as adminRoutes }
