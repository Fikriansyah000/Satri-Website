import { Router } from 'express'
import { db, schema } from '../../db'
import { eq } from 'drizzle-orm'
import { asyncHandler, createError } from '../../middleware/error-handler'
import { z } from 'zod'

const router = Router()

const productSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0),
    originalPrice: z.number().optional(),
    spicyLevel: z.number().min(0).max(5).optional(),
    images: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
    stock: z.number().min(0).optional(),
    categoryId: z.string().uuid().optional(),
    sortOrder: z.number().optional(),
})

// GET /api/admin/products - Get all products
router.get('/', asyncHandler(async (req, res) => {
    const products = await db
        .select()
        .from(schema.products)
        .orderBy(schema.products.sortOrder)

    res.json({ success: true, data: products })
}))

// GET /api/admin/products/:id - Get product by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    const [product] = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.id, id as string))
        .limit(1)

    if (!product) {
        throw createError('Product not found', 404, 'PRODUCT_NOT_FOUND')
    }

    res.json({ success: true, data: product })
}))

// POST /api/admin/products - Create product
router.post('/', asyncHandler(async (req, res) => {
    const body = productSchema.parse(req.body)

    const [product] = await db
        .insert(schema.products)
        .values(body)
        .returning()

    res.status(201).json({ success: true, data: product })
}))

// PATCH /api/admin/products/:id - Update product
router.patch('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    const body = productSchema.partial().parse(req.body)

    const [product] = await db
        .update(schema.products)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(schema.products.id, id as string))
        .returning()

    if (!product) {
        throw createError('Product not found', 404, 'PRODUCT_NOT_FOUND')
    }

    res.json({ success: true, data: product })
}))

// DELETE /api/admin/products/:id - Delete product
router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    await db.delete(schema.products).where(eq(schema.products.id, id as string))

    res.json({ success: true, message: 'Product deleted' })
}))

export { router as productsRoutes }
