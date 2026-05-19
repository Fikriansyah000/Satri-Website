import { Router } from 'express'
import { db, schema } from '../db'
import { eq } from 'drizzle-orm'
import { asyncHandler, createError } from '../middleware/error-handler'

const router = Router()

// GET /api/products - Get all active products
router.get('/', asyncHandler(async (req, res) => {
    const products = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.isActive, true))
        .orderBy(schema.products.sortOrder)

    res.json({
        success: true,
        data: products,
    })
}))

// GET /api/products/:slug - Get product by slug
router.get('/:slug', asyncHandler(async (req, res) => {
    const { slug } = req.params

    const [product] = await db
        .select()
        .from(schema.products)
        .where(eq(schema.products.slug, slug as string))
        .limit(1)

    if (!product) {
        throw createError('Product not found', 404, 'PRODUCT_NOT_FOUND')
    }

    res.json({
        success: true,
        data: product,
    })
}))

// GET /api/products/categories - Get all categories
router.get('/categories/all', asyncHandler(async (req, res) => {
    const categories = await db
        .select()
        .from(schema.productCategories)
        .orderBy(schema.productCategories.sortOrder)

    res.json({
        success: true,
        data: categories,
    })
}))

export { router as productRoutes }
