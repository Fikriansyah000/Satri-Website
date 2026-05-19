import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/error-handler'

// Import routes
import { authRoutes } from './routes/auth'
import { productRoutes } from './routes/products'
import { orderRoutes } from './routes/orders'
import { adminRoutes } from './routes/admin'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGINS?.split(',') || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

// Error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
