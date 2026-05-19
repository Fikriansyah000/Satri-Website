import { pgTable, uuid, varchar, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { products } from './products'

export const paymentMethodEnum = pgEnum('payment_method', ['qris', 'cod'])
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'uploaded', 'verified', 'paid'])
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])

export const customers = pgTable('customers', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull().unique(),
    email: varchar('email', { length: 255 }),
    address: text('address'),
    city: varchar('city', { length: 100 }),
    province: varchar('province', { length: 100 }),
    postalCode: varchar('postal_code', { length: 10 }),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
    customerId: uuid('customer_id').references(() => customers.id).notNull(),
    subtotal: integer('subtotal').notNull(),
    shippingCost: integer('shipping_cost').default(0),
    discount: integer('discount').default(0),
    total: integer('total').notNull(),
    paymentMethod: paymentMethodEnum('payment_method').notNull(),
    paymentStatus: paymentStatusEnum('payment_status').default('pending'),
    orderStatus: orderStatusEnum('order_status').default('pending'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => orders.id).notNull(),
    productId: uuid('product_id').references(() => products.id).notNull(),
    productName: varchar('product_name', { length: 255 }).notNull(),
    productPrice: integer('product_price').notNull(),
    quantity: integer('quantity').notNull(),
    spicyLevel: integer('spicy_level'),
    notes: text('notes'),
    subtotal: integer('subtotal').notNull(),
})

export const paymentProofs = pgTable('payment_proofs', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => orders.id).notNull(),
    fileUrl: varchar('file_url', { length: 500 }).notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
    verifiedAt: timestamp('verified_at'),
    verifiedBy: uuid('verified_by'),
})
