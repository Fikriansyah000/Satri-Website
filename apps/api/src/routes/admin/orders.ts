import { Router } from 'express'
import { db, schema } from '../../db'
import { eq, desc, and, gte, lte, like, sql } from 'drizzle-orm'
import { asyncHandler, createError } from '../../middleware/error-handler'

const router = Router()

// GET /api/admin/orders - Get all orders with filters
router.get('/', asyncHandler(async (req, res) => {
    const {
        page = '1',
        limit = '10',
        status,
        paymentStatus,
        paymentMethod,
        search,
        startDate,
        endDate,
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const offset = (pageNum - 1) * limitNum

    // Build conditions
    const conditions = []

    if (status) {
        conditions.push(eq(schema.orders.orderStatus, status as typeof schema.orders.orderStatus.enumValues[number]))
    }
    if (paymentStatus) {
        conditions.push(eq(schema.orders.paymentStatus, paymentStatus as typeof schema.orders.paymentStatus.enumValues[number]))
    }
    if (paymentMethod) {
        conditions.push(eq(schema.orders.paymentMethod, paymentMethod as typeof schema.orders.paymentMethod.enumValues[number]))
    }
    if (startDate) {
        conditions.push(gte(schema.orders.createdAt, new Date(startDate as string)))
    }
    if (endDate) {
        conditions.push(lte(schema.orders.createdAt, new Date(endDate as string)))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const orders = await db
        .select()
        .from(schema.orders)
        .where(whereClause)
        .orderBy(desc(schema.orders.createdAt))
        .limit(limitNum)
        .offset(offset)

    // Get total count
    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.orders)
        .where(whereClause)

    res.json({
        success: true,
        data: orders,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total: Number(count),
            totalPages: Math.ceil(Number(count) / limitNum),
        },
    })
}))

// GET /api/admin/orders/:id - Get order detail
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    const [order] = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.id, id as string))
        .limit(1)

    if (!order) {
        throw createError('Order not found', 404, 'ORDER_NOT_FOUND')
    }

    const items = await db
        .select()
        .from(schema.orderItems)
        .where(eq(schema.orderItems.orderId, order.id))

    const [customer] = await db
        .select()
        .from(schema.customers)
        .where(eq(schema.customers.id, order.customerId))
        .limit(1)

    const [paymentProof] = await db
        .select()
        .from(schema.paymentProofs)
        .where(eq(schema.paymentProofs.orderId, order.id))
        .limit(1)

    res.json({
        success: true,
        data: { ...order, customer, items, paymentProof },
    })
}))

// PATCH /api/admin/orders/:id/status - Update order status
router.patch('/:id/status', asyncHandler(async (req, res) => {
    const { id } = req.params
    const { orderStatus } = req.body

    const [order] = await db
        .update(schema.orders)
        .set({ orderStatus, updatedAt: new Date() })
        .where(eq(schema.orders.id, id as string))
        .returning()

    if (!order) {
        throw createError('Order not found', 404, 'ORDER_NOT_FOUND')
    }

    res.json({ success: true, data: order })
}))

// PATCH /api/admin/orders/:id/verify-payment - Verify payment
router.patch('/:id/verify-payment', asyncHandler(async (req, res) => {
    const { id } = req.params

    const [order] = await db
        .update(schema.orders)
        .set({
            paymentStatus: 'verified',
            orderStatus: 'confirmed',
            updatedAt: new Date(),
        })
        .where(eq(schema.orders.id, id as string))
        .returning()

    if (!order) {
        throw createError('Order not found', 404, 'ORDER_NOT_FOUND')
    }

    res.json({ success: true, data: order })
}))

// DELETE /api/admin/orders/:id - Delete order
router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    // Delete order items first
    await db.delete(schema.orderItems).where(eq(schema.orderItems.orderId, id as string))

    // Delete payment proofs
    await db.delete(schema.paymentProofs).where(eq(schema.paymentProofs.orderId, id as string))

    // Delete order
    await db.delete(schema.orders).where(eq(schema.orders.id, id as string))

    res.json({ success: true, message: 'Order deleted' })
}))

export { router as ordersRoutes }
