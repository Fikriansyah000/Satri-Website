# API - Satri E-Commerce Backend

Backend API untuk website Satri E-Commerce menggunakan Express.js, Drizzle ORM, dan Better Auth.

## Tech Stack

- **Express.js** - API Framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Better Auth** - Authentication
- **Cloudinary** - Cloud file storage
- **TypeScript** - Type safety

## Getting Started

### 1. Install Dependencies

```bash
cd apps/api
npm install
```

### 2. Setup Environment

Copy `.env.example` ke `.env` dan isi dengan nilai yang sesuai:

```bash
cp .env.example .env
```

### 3. Setup Database

Pastikan PostgreSQL sudah running, lalu:

```bash
# Generate migrations
npm run db:generate

# Push schema ke database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Public API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:slug | Get product by slug |
| GET | /api/products/categories/all | Get all categories |
| POST | /api/orders | Create new order |
| GET | /api/orders/:orderNumber | Get order status |

### Admin API (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/dashboard/stats | Dashboard statistics |
| GET | /api/admin/orders | Get all orders |
| PATCH | /api/admin/orders/:id/status | Update order status |
| GET | /api/admin/expenses | Get all expenses |
| POST | /api/admin/expenses | Create expense |

## Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed initial data
