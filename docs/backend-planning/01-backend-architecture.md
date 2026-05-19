# Backend Architecture Planning
# Website Satri E-Commerce

**Version:** 1.0  
**Date:** 3 Februari 2026  
**Document Type:** Backend Planning - Architecture & Implementation Plan

---

## 1. Technology Stack

### 1.1 Core Technologies

| Technology | Version | Description |
|------------|---------|-------------|
| **PostgreSQL** | 16.x | Primary database |
| **Drizzle ORM** | Latest | Type-safe ORM for database operations |
| **Better Auth** | Latest | Authentication library (Admin only) |
| **Node.js** | 20.x LTS | Runtime environment |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Express.js** | 4.x | API framework |
| **Cloudinary** | Latest | Cloud storage untuk file uploads |

### 1.2 Project Structure (Monorepo)

```
SatriWeb/
├── apps/
│   ├── web/                    # Existing frontend (React + Vite)
│   └── api/                    # NEW: Backend API
│       ├── src/
│       │   ├── index.ts        # Entry point
│       │   ├── db/
│       │   │   ├── index.ts    # Database connection
│       │   │   ├── schema/     # Drizzle schemas
│       │   │   │   ├── index.ts
│       │   │   │   ├── products.ts
│       │   │   │   ├── orders.ts
│       │   │   │   ├── customers.ts
│       │   │   │   ├── expenses.ts
│       │   │   │   └── auth.ts
│       │   │   └── migrations/ # Drizzle migrations
│       │   ├── routes/
│       │   │   ├── index.ts
│       │   │   ├── auth.ts
│       │   │   ├── products.ts
│       │   │   ├── orders.ts
│       │   │   ├── customers.ts
│       │   │   ├── dashboard.ts
│       │   │   └── expenses.ts
│       │   ├── services/
│       │   │   ├── order.service.ts
│       │   │   ├── product.service.ts
│       │   │   ├── expense.service.ts
│       │   │   └── dashboard.service.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts
│       │   │   ├── cors.ts
│       │   │   └── error-handler.ts
│       │   ├── lib/
│       │   │   ├── auth.ts     # Better Auth config
│       │   │   ├── cloudinary.ts # Cloud upload handler
│       │   │   └── utils.ts
│       │   └── types/
│       │       └── index.ts
│       ├── drizzle.config.ts
│       ├── package.json
│       └── tsconfig.json
└── packages/
    └── shared/                 # NEW: Shared types & utilities
        ├── src/
        │   ├── types/
        │   │   ├── product.ts
        │   │   ├── order.ts
        │   │   ├── customer.ts
        │   │   └── expense.ts
        │   └── utils/
        │       └── format.ts
        ├── package.json
        └── tsconfig.json
```

---

## 2. Database Schema Design

### 2.1 Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has
    
    PRODUCT ||--o{ ORDER_ITEM : contains
    PRODUCT }o--|| PRODUCT_CATEGORY : belongs_to
    
    ORDER ||--o{ ORDER_ITEM : has
    ORDER }o--|| CUSTOMER : placed_by
    ORDER ||--o| PAYMENT_PROOF : has
    
    EXPENSE }o--|| EXPENSE_CATEGORY : belongs_to
    
    USER {
        uuid id PK
        string email UK
        string name
        string password_hash
        boolean email_verified
        timestamp created_at
        timestamp updated_at
    }
    
    SESSION {
        uuid id PK
        uuid user_id FK
        string token UK
        timestamp expires_at
        string ip_address
        string user_agent
        timestamp created_at
    }
    
    ACCOUNT {
        uuid id PK
        uuid user_id FK
        string provider
        string provider_account_id
        timestamp created_at
    }
    
    PRODUCT_CATEGORY {
        uuid id PK
        string name UK
        string slug UK
        string description
        int sort_order
        timestamp created_at
    }
    
    PRODUCT {
        uuid id PK
        uuid category_id FK
        string name
        string slug UK
        text description
        int price
        int original_price
        int spicy_level
        string[] images
        boolean is_active
        int stock
        int sort_order
        timestamp created_at
        timestamp updated_at
    }
    
    CUSTOMER {
        uuid id PK
        string name
        string phone UK
        string email
        string address
        string city
        string province
        string postal_code
        text notes
        timestamp created_at
        timestamp updated_at
    }
    
    ORDER {
        uuid id PK
        string order_number UK
        uuid customer_id FK
        int subtotal
        int shipping_cost
        int discount
        int total
        enum payment_method
        enum payment_status
        enum order_status
        text notes
        timestamp created_at
        timestamp updated_at
    }
    
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        string product_name
        int product_price
        int quantity
        int spicy_level
        text notes
        int subtotal
    }
    
    PAYMENT_PROOF {
        uuid id PK
        uuid order_id FK
        string file_url
        string file_name
        timestamp uploaded_at
        timestamp verified_at
        uuid verified_by FK
    }
    
    EXPENSE_CATEGORY {
        uuid id PK
        string name UK
        string color
        timestamp created_at
    }
    
    EXPENSE {
        uuid id PK
        uuid category_id FK
        date expense_date
        text description
        string vendor
        int amount
        string receipt_url
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }
```

### 2.2 Drizzle Schema Definitions

#### Products Schema (`schema/products.ts`)
```typescript
import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const productCategories = pgTable('product_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').references(() => productCategories.id),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  spicyLevel: integer('spicy_level').default(0),
  images: text('images').array().default([]),
  isActive: boolean('is_active').default(true),
  stock: integer('stock').default(0),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

#### Orders Schema (`schema/orders.ts`)
```typescript
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
```

#### Expenses Schema (`schema/expenses.ts`)
```typescript
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
```

---

## 3. API Endpoints Design

### 3.1 Public API (Customer Store)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all active products |
| `GET` | `/api/products/:slug` | Get product by slug |
| `GET` | `/api/categories` | Get all product categories |
| `POST` | `/api/orders` | Create new order |
| `GET` | `/api/orders/:orderNumber` | Get order status by order number |
| `POST` | `/api/orders/:orderNumber/payment-proof` | Upload payment proof |

### 3.2 Protected API (Admin Dashboard)

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** |||
| `POST` | `/api/auth/signin` | Admin login |
| `POST` | `/api/auth/signout` | Admin logout |
| `GET` | `/api/auth/session` | Get current session |
| **Dashboard** |||
| `GET` | `/api/admin/dashboard/stats` | Get dashboard metrics |
| `GET` | `/api/admin/dashboard/charts` | Get chart data |
| **Orders** |||
| `GET` | `/api/admin/orders` | Get all orders (with filters) |
| `GET` | `/api/admin/orders/:id` | Get order detail |
| `POST` | `/api/admin/orders` | Create manual order |
| `PATCH` | `/api/admin/orders/:id` | Update order |
| `PATCH` | `/api/admin/orders/:id/status` | Update order status |
| `PATCH` | `/api/admin/orders/:id/verify-payment` | Verify payment |
| `DELETE` | `/api/admin/orders/:id` | Delete order |
| **Products** |||
| `GET` | `/api/admin/products` | Get all products |
| `POST` | `/api/admin/products` | Create product |
| `PATCH` | `/api/admin/products/:id` | Update product |
| `DELETE` | `/api/admin/products/:id` | Delete product |
| **Expenses** |||
| `GET` | `/api/admin/expenses` | Get all expenses |
| `GET` | `/api/admin/expenses/summary` | Get expense summary |
| `POST` | `/api/admin/expenses` | Create expense |
| `PATCH` | `/api/admin/expenses/:id` | Update expense |
| `DELETE` | `/api/admin/expenses/:id` | Delete expense |
| **Reports** |||
| `GET` | `/api/admin/reports/sales` | Get sales report |
| `GET` | `/api/admin/reports/profit` | Get profit report |

---

## 4. Authentication Setup (Better Auth)

### 4.1 Better Auth Configuration

```typescript
// lib/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db'
import * as schema from '../db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  trustedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
  ],
})
```

### 4.2 Auth Schema (Better Auth)

```typescript
// schema/auth.ts
import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

---

## 5. Frontend Integration Points

### 5.1 Required Frontend Updates

Berdasarkan analisis `apps/web/src/`, berikut perubahan yang diperlukan:

#### A. Environment Configuration
```typescript
// apps/web/src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const api = {
  get: (endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint: string, data: any) => 
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }),
  // ... patch, delete
}
```

#### B. Data Migration
```
apps/web/src/data/
├── products.ts  → Replace with API calls
└── orders.ts    → Replace with API calls
```

#### C. Pages to Update

| Page | Changes Required |
|------|------------------|
| `CatalogPage.tsx` | Fetch products from API |
| `CheckoutPage.tsx` | Submit order to API |
| `PaymentPage.tsx` | Upload payment proof to API |
| `OrderStatusPage.tsx` | Fetch order status from API |
| `AdminDashboardPage.tsx` | Auth check + fetch stats from API |
| `AdminOrdersPage.tsx` | CRUD operations via API |
| `ExpensesPage.tsx` | CRUD operations via API |
| `SalesPage.tsx` | Fetch reports from API |

#### D. New Pages/Components Needed

| Component | Purpose |
|-----------|---------|
| `LoginPage.tsx` | Admin login page |
| `AuthProvider.tsx` | Auth context provider |
| `ProtectedRoute.tsx` | Route guard for admin pages |
| `useAuth.ts` | Auth hook (Better Auth client) |

---

## 6. Future Development Notes

> [!TIP]
> Catatan untuk pengembangan lanjutan di masa depan.

### Potential Enhancements

1. **Customer Authentication** (Opsional)
   - Login customer untuk tracking order
   - Order history per customer
   - Wishlist feature

2. **Inventory Management**
   - Stock alerts
   - Auto-update stock saat order
   - Low stock notifications

3. **Advanced Analytics**
   - Customer demographics
   - Sales forecasting
   - Product performance analysis

4. **Multi-admin Support**
   - Role-based access control (RBAC)
   - Activity logs
   - Multiple admin users

5. **Integration Options**
   - WhatsApp Business API
   - Payment gateway (Midtrans/Xendit)
   - Shipping API (JNE/J&T)

---

## 7. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/satri_db

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Frontend
FRONTEND_URL=http://localhost:5173

# Cloudinary (Cloud Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# File Upload
MAX_FILE_SIZE=5242880  # 5MB

# CORS
CORS_ORIGINS=http://localhost:5173
```

---

## 8. Database Migrations Strategy

### 8.1 Drizzle Config
```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### 8.2 Migration Commands
```bash
# Generate migration
npx drizzle-kit generate

# Push to database (development)
npx drizzle-kit push

# Apply migrations (production)
npx drizzle-kit migrate
```

---

## 9. Seed Data

```typescript
// src/db/seed.ts
import { db } from './index'
import { productCategories, products, expenseCategories, users, accounts } from './schema'
import { hash } from 'better-auth/crypto'

async function seed() {
  // Seed categories
  await db.insert(productCategories).values([
    { name: 'Pikset', slug: 'pikset', sortOrder: 1 },
    { name: 'Sempring', slug: 'sempring', sortOrder: 2 },
    { name: 'Basreng', slug: 'basreng', sortOrder: 3 },
    { name: 'Paket', slug: 'paket', sortOrder: 4 },
  ])

  // Seed expense categories
  await db.insert(expenseCategories).values([
    { name: 'Bahan Baku', color: '#ef4444' },
    { name: 'Packaging', color: '#f97316' },
    { name: 'Operasional', color: '#eab308' },
    { name: 'Marketing', color: '#22c55e' },
    { name: 'Pengiriman', color: '#3b82f6' },
    { name: 'Lainnya', color: '#8b5cf6' },
  ])

  // Seed admin user
  const passwordHash = await hash('admin123')
  const [user] = await db.insert(users).values({
    email: 'admin@satri.com',
    name: 'Admin Satri',
    emailVerified: true,
  }).returning()

  await db.insert(accounts).values({
    userId: user.id,
    accountId: user.id,
    providerId: 'credential',
    password: passwordHash,
  })

  console.log('✅ Seed completed!')
}

seed()
```

---

**Next Document:** [02-api-specification.md](./02-api-specification.md) (OpenAPI/Swagger spec)
