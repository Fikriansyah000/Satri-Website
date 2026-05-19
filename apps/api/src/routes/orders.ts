import { Router } from 'express'
import { db, schema } from '../db'
import { eq } from 'drizzle-orm'
import { asyncHandler, createError } from '../middleware/error-handler'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const router = Router()

// Validation schemas
const createOrderSchema = z.object({
    customer: z.object({
        name: z.string().min(1),
        phone: z.string().min(10),
        email: z.string().email().optional(),
        address: z.string().min(1),
        city: z.string().min(1),
        province: z.string().min(1),
        postalCode: z.string().optional(),
        notes: z.string().optional(),
    }),
    items: z.array(z.object({
        productId: z.string().uuid(),
        quantity: z.number().min(1),
        spicyLevel: z.number().optional(),
        notes: z.string().optional(),
    })).min(1),
    paymentMethod: z.enum(['qris', 'cod']),
    shippingCost: z.number().default(0),
    discount: z.number().default(0),
    notes: z.string().optional(),
})

// POST /api/orders - Create new order
router.post('/', asyncHandler(async (req, res) => {
    const body = createOrderSchema.parse(req.body)

    // Generate order number
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
    const orderNumber = `STR-${dateStr}-${nanoid(6).toUpperCase()}`

    // Create or find customer
    let [customer] = await db
        .select()
        .from(schema.customers)
        .where(eq(schema.customers.phone, body.customer.phone))
        .limit(1)

    if (!customer) {
        const [newCustomer] = await db
            .insert(schema.customers)
            .values(body.customer)
            .returning()
        customer = newCustomer
    } else {
        // Update customer info
        await db
            .update(schema.customers)
            .set(body.customer)
            .where(eq(schema.customers.id, customer.id))
    }

    // Get product details and calculate totals
    let subtotal = 0
    const orderItemsData = []

    for (const item of body.items) {
        const [product] = await db
            .select()
            .from(schema.products)
            .where(eq(schema.products.id, item.productId))
            .limit(1)

        if (!product) {
            throw createError(`Product not found: ${item.productId}`, 400, 'PRODUCT_NOT_FOUND')
        }

        const itemSubtotal = product.price * item.quantity
        subtotal += itemSubtotal

        orderItemsData.push({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: item.quantity,
            spicyLevel: item.spicyLevel,
            notes: item.notes,
            subtotal: itemSubtotal,
        })
    }

    const total = subtotal + body.shippingCost - body.discount

    // Create order
    const [order] = await db
        .insert(schema.orders)
        .values({
            orderNumber,
            customerId: customer.id,
            subtotal,
            shippingCost: body.shippingCost,
            discount: body.discount,
            total,
            paymentMethod: body.paymentMethod,
            notes: body.notes,
        })
        .returning()

    // Create order items
    await db.insert(schema.orderItems).values(
        orderItemsData.map(item => ({
            ...item,
            orderId: order.id,
        }))
    )

    res.status(201).json({
        success: true,
        data: {
            orderNumber: order.orderNumber,
            total: order.total,
            paymentMethod: order.paymentMethod,
        },
    })
}))

// GET /api/orders/:orderNumber - Get order status
router.get('/:orderNumber', asyncHandler(async (req, res) => {
    const { orderNumber } = req.params

    const [order] = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.orderNumber, orderNumber as string))
        .limit(1)

    if (!order) {
        throw createError('Order not found', 404, 'ORDER_NOT_FOUND')
    }

    // Get order items
    const items = await db
        .select()
        .from(schema.orderItems)
        .where(eq(schema.orderItems.orderId, order.id))

    // Get customer
    const [customer] = await db
        .select()
        .from(schema.customers)
        .where(eq(schema.customers.id, order.customerId))
        .limit(1)

    // Get payment proof if exists
    const [paymentProof] = await db
        .select()
        .from(schema.paymentProofs)
        .where(eq(schema.paymentProofs.orderId, order.id))
        .limit(1)

    res.json({
        success: true,
        data: {
            ...order,
            customer,
            items,
            paymentProof,
        },
    })
}))

export { router as orderRoutes }
