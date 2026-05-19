import { Router } from 'express'
import { db, schema } from '../../db'
import { eq, desc, and, gte, lte, sql } from 'drizzle-orm'
import { asyncHandler, createError } from '../../middleware/error-handler'
import { z } from 'zod'

const router = Router()

const expenseSchema = z.object({
    categoryId: z.string().uuid().optional(),
    expenseDate: z.string(),
    description: z.string().min(1),
    vendor: z.string().optional(),
    amount: z.number().min(0),
    receiptUrl: z.string().optional(),
})

// GET /api/admin/expenses - Get all expenses
router.get('/', asyncHandler(async (req, res) => {
    const { startDate, endDate, categoryId } = req.query

    const conditions = []

    if (startDate) {
        conditions.push(gte(schema.expenses.expenseDate, startDate as string))
    }
    if (endDate) {
        conditions.push(lte(schema.expenses.expenseDate, endDate as string))
    }
    if (categoryId) {
        conditions.push(eq(schema.expenses.categoryId, categoryId as string))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const expenses = await db
        .select()
        .from(schema.expenses)
        .where(whereClause)
        .orderBy(desc(schema.expenses.expenseDate))

    res.json({ success: true, data: expenses })
}))

// GET /api/admin/expenses/summary - Get expense summary
router.get('/summary', asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query

    const conditions = []
    if (startDate) {
        conditions.push(gte(schema.expenses.expenseDate, startDate as string))
    }
    if (endDate) {
        conditions.push(lte(schema.expenses.expenseDate, endDate as string))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const [summary] = await db
        .select({
            totalAmount: sql<number>`COALESCE(SUM(${schema.expenses.amount}), 0)`,
            count: sql<number>`COUNT(*)`,
        })
        .from(schema.expenses)
        .where(whereClause)

    res.json({ success: true, data: summary })
}))

// GET /api/admin/expenses/categories - Get expense categories
router.get('/categories', asyncHandler(async (req, res) => {
    const categories = await db
        .select()
        .from(schema.expenseCategories)
        .orderBy(schema.expenseCategories.name)

    res.json({ success: true, data: categories })
}))

// POST /api/admin/expenses - Create expense
router.post('/', asyncHandler(async (req, res) => {
    const body = expenseSchema.parse(req.body)

    const [expense] = await db
        .insert(schema.expenses)
        .values(body)
        .returning()

    res.status(201).json({ success: true, data: expense })
}))

// PATCH /api/admin/expenses/:id - Update expense
router.patch('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    const body = expenseSchema.partial().parse(req.body)

    const [expense] = await db
        .update(schema.expenses)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(schema.expenses.id, id as string))
        .returning()

    if (!expense) {
        throw createError('Expense not found', 404, 'EXPENSE_NOT_FOUND')
    }

    res.json({ success: true, data: expense })
}))

// DELETE /api/admin/expenses/:id - Delete expense
router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    await db.delete(schema.expenses).where(eq(schema.expenses.id, id as string))

    res.json({ success: true, message: 'Expense deleted' })
}))

export { router as expensesRoutes }
