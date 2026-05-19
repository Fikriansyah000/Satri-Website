import { pgTable, uuid, varchar, text, integer, date, timestamp } from 'drizzle-orm/pg-core'

export const expenseCategories = pgTable('expense_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    color: varchar('color', { length: 20 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const expenses = pgTable('expenses', {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id').references(() => expenseCategories.id),
    expenseDate: date('expense_date').notNull(),
    description: text('description').notNull(),
    vendor: varchar('vendor', { length: 255 }),
    amount: integer('amount').notNull(),
    receiptUrl: varchar('receipt_url', { length: 500 }),
    createdBy: uuid('created_by'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
