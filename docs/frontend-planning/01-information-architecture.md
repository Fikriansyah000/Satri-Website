# Information Architecture (IA)
# Website Satri E-Commerce

**Version:** 1.0  
**Date:** 30 Januari 2026  
**Document Type:** Frontend Planning - Information Architecture

---

## 1. Site Structure Overview

Website Satri terdiri dari dua sistem utama dengan struktur informasi terpisah:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        WEBSITE SATRI                                     │
├─────────────────────────────────┬───────────────────────────────────────┤
│                                 │                                       │
│    🛒 CUSTOMER STORE            │    📊 OWNER DASHBOARD                 │
│    (Public Access)              │    (Protected - Auth Required)        │
│                                 │                                       │
│    ├── Beranda                  │    ├── Login                          │
│    ├── Katalog Produk           │    ├── Dashboard Overview             │
│    │   ├── Pikset               │    ├── Database Penjualan             │
│    │   └── Sempring             │    ├── Database Pengeluaran           │
│    ├── Detail Produk            │    ├── Laporan & Analisis             │
│    ├── Keranjang                │    └── Pengaturan                     │
│    ├── Checkout                 │                                       │
│    ├── Pembayaran               │                                       │
│    │   ├── QRIS                 │                                       │
│    │   └── COD                  │                                       │
│    ├── Status Pesanan           │                                       │
│    └── Kontak                   │                                       │
│                                 │                                       │
└─────────────────────────────────┴───────────────────────────────────────┘
```

---

## 2. Customer Store - Information Hierarchy

### 2.1 Primary Navigation (Level 1)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   [LOGO]     Beranda    Produk    Cara Order    Kontak    [🛒 Cart]   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Content Hierarchy per Page

#### A. BERANDA (Homepage)
```
BERANDA
│
├── 1. Hero Section (High Priority)
│   ├── Headline utama
│   ├── Sub-headline/tagline
│   ├── CTA Button "Pesan Sekarang"
│   └── Hero Image
│
├── 2. Product Highlight (Medium-High Priority)
│   ├── Section Title "Produk Unggulan"
│   ├── Pikset Card Preview
│   │   ├── Image
│   │   ├── Name
│   │   ├── Price
│   │   └── Quick Add Button
│   ├── Sempring Card Preview
│   │   └── [same structure]
│   └── CTA "Lihat Semua Produk"
│
├── 3. Value Proposition (Medium Priority)
│   ├── Icon + "Pedas Mantap"
│   ├── Icon + "Bahan Berkualitas"
│   └── Icon + "Pengiriman Cepat"
│
├── 4. Cara Order Section (Medium Priority)
│   ├── Step 1: Pilih Produk
│   ├── Step 2: Checkout
│   ├── Step 3: Bayar
│   └── Step 4: Terima Pesanan
│
├── 5. Testimonial (Low-Medium Priority)
│   └── Customer reviews slider
│
└── 6. Footer
    ├── Brand Info
    ├── Quick Links
    ├── Kontak Info
    └── Social Media Links
```

#### B. KATALOG PRODUK
```
KATALOG PRODUK
│
├── 1. Page Header
│   ├── Title "Produk Kami"
│   └── Breadcrumb (Beranda > Produk)
│
├── 2. Filter & Sort Bar
│   ├── Filter by Type
│   │   ├── Semua
│   │   ├── Pikset
│   │   └── Sempring
│   ├── Sort Options
│   │   ├── Terbaru
│   │   ├── Harga: Rendah-Tinggi
│   │   ├── Harga: Tinggi-Rendah
│   │   └── Nama: A-Z
│   └── View Toggle (Grid/List) [Optional]
│
├── 3. Product Grid
│   └── Product Card (repeated)
│       ├── Product Image
│       ├── Type Badge (Pikset/Sempring)
│       ├── Product Name
│       ├── Spicy Level Icons
│       ├── Price
│       ├── Stock Status
│       └── Add to Cart Button
│
└── 4. Pagination
    └── Page Numbers / Load More
```

#### C. DETAIL PRODUK
```
DETAIL PRODUK
│
├── 1. Breadcrumb
│   └── Beranda > Produk > [Nama Produk]
│
├── 2. Product Main Section
│   ├── LEFT: Image Gallery
│   │   ├── Main Image (large)
│   │   └── Thumbnail Navigation
│   │
│   └── RIGHT: Product Info
│       ├── Type Badge
│       ├── Product Name
│       ├── Spicy Level Display
│       ├── Price (prominent)
│       ├── Stock Status
│       ├── Short Description
│       │
│       ├── Variant Selector (if applicable)
│       │   └── Size options
│       │
│       ├── Quantity Selector
│       │   ├── [-] Button
│       │   ├── Quantity Input
│       │   └── [+] Button
│       │
│       ├── Total Price Display
│       │
│       └── Action Buttons
│           ├── "Tambah ke Keranjang" (Secondary)
│           └── "Beli Sekarang" (Primary)
│
├── 3. Product Details Tabs
│   ├── Tab: Deskripsi
│   │   └── Full product description
│   ├── Tab: Informasi Produk
│   │   ├── Berat
│   │   ├── Komposisi
│   │   └── Masa Simpan
│   └── Tab: Cara Penyimpanan
│
└── 4. Related Products
    └── Product cards (2-4 items)
```

#### D. KERANJANG BELANJA
```
KERANJANG BELANJA
│
├── 1. Page Header
│   ├── Title "Keranjang Belanja"
│   └── Item count
│
├── 2. Cart Items List
│   └── Cart Item (repeated)
│       ├── Product Thumbnail
│       ├── Product Info
│       │   ├── Name
│       │   ├── Variant (if any)
│       │   └── Unit Price
│       ├── Quantity Adjuster
│       │   ├── [-] Button
│       │   ├── Quantity Display
│       │   └── [+] Button
│       ├── Subtotal
│       └── Remove Button [X]
│
├── 3. Cart Summary (Sticky on desktop)
│   ├── Subtotal
│   ├── Promo Code Input (Future)
│   ├── Delivery Fee Info
│   ├── Total (Bold)
│   └── "Checkout" Button (Primary CTA)
│
└── 4. Continue Shopping Link
```

#### E. CHECKOUT
```
CHECKOUT
│
├── 1. Progress Indicator
│   ├── ● Informasi (Active)
│   ├── ○ Pembayaran
│   └── ○ Konfirmasi
│
├── 2. Customer Information Form
│   ├── Nama Lengkap *
│   ├── Nomor WhatsApp *
│   ├── Email (Optional)
│   └── Alamat Section
│       ├── Alamat Lengkap *
│       ├── Kelurahan/Kecamatan
│       ├── Kota
│       ├── Kode Pos
│       └── Catatan Pengiriman
│
├── 3. Payment Method Selection
│   ├── Option: QRIS
│   │   ├── Radio Button
│   │   ├── Method Name
│   │   ├── Description
│   │   └── Supported e-wallets icons
│   │
│   └── Option: COD
│       ├── Radio Button
│       ├── Method Name
│       ├── Description
│       └── Coverage area info
│
├── 4. Order Summary (Sidebar)
│   ├── Order Items Preview
│   ├── Subtotal
│   ├── Delivery Fee
│   ├── Total
│   └── Edit Cart Link
│
├── 5. Terms & Conditions
│   └── Checkbox + Link to T&C
│
└── 6. Action Button
    └── "Proses Pesanan" (Primary CTA)
```

---

## 3. Owner Dashboard - Information Hierarchy

### 3.1 Dashboard Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                                    [Notifications] [Profile ▼]   │
├──────────────────┬──────────────────────────────────────────────────────┤
│                  │                                                      │
│  SIDEBAR NAV     │              MAIN CONTENT AREA                       │
│                  │                                                      │
│  ┌────────────┐  │                                                      │
│  │ Dashboard  │  │                                                      │
│  ├────────────┤  │                                                      │
│  │ Penjualan  │  │                                                      │
│  │  └ Semua   │  │                                                      │
│  │  └ QRIS    │  │                                                      │
│  │  └ COD     │  │                                                      │
│  ├────────────┤  │                                                      │
│  │ Pengeluaran│  │                                                      │
│  ├────────────┤  │                                                      │
│  │ Laporan    │  │                                                      │
│  │  └ Sales   │  │                                                      │
│  │  └ Profit  │  │                                                      │
│  ├────────────┤  │                                                      │
│  │ Pengaturan │  │                                                      │
│  └────────────┘  │                                                      │
│                  │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘
```

### 3.2 Content Hierarchy per Dashboard Page

#### A. LOGIN PAGE
```
LOGIN PAGE
│
├── Brand Logo
├── Welcome Message
├── Login Form
│   ├── Username/Email Input
│   ├── Password Input (with toggle visibility)
│   ├── Remember Me Checkbox
│   └── Login Button
└── Forgot Password Link
```

#### B. DASHBOARD OVERVIEW
```
DASHBOARD OVERVIEW
│
├── 1. Page Header
│   ├── Welcome Message + User Name
│   └── Date/Time Display
│
├── 2. Key Metrics Cards (Row 1)
│   ├── Card: Penjualan Bulan Ini
│   │   ├── Amount (Rp)
│   │   └── % Change vs Last Month
│   ├── Card: Pesanan Bulan Ini
│   │   ├── Order Count
│   │   └── % Change
│   ├── Card: Pengeluaran Bulan Ini
│   │   ├── Amount (Rp)
│   │   └── % Change
│   └── Card: Profit Bersih
│       ├── Amount (Rp)
│       └── Profit Margin %
│
├── 3. Charts Section (Row 2)
│   ├── Chart: Grafik Penjualan Bulanan
│   │   ├── Line Chart
│   │   ├── Legend (Pikset, Sempring)
│   │   └── Time Range Selector
│   │
│   └── Chart: Pendapatan vs Pengeluaran
│       ├── Bar Chart
│       └── Toggle View Options
│
├── 4. Charts Section (Row 3)
│   ├── Chart: Profit Trend
│   │   └── Area Chart
│   │
│   └── Chart: Produk Terlaris
│       └── Pie/Donut Chart
│
├── 5. Recent Activity
│   ├── Recent Orders List (5 items)
│   │   └── Quick view: ID, Customer, Amount, Status
│   └── "Lihat Semua" Link
│
└── 6. Quick Actions
    ├── + Tambah Pesanan
    └── + Tambah Pengeluaran
```

#### C. DATABASE PENJUALAN
```
DATABASE PENJUALAN
│
├── 1. Page Header
│   ├── Title "Database Penjualan"
│   └── + Tambah Pesanan Button
│
├── 2. Filter Section
│   ├── Date Range Picker
│   ├── Payment Method Dropdown
│   ├── Status Dropdown
│   ├── Search Input
│   └── Apply/Reset Buttons
│
├── 3. Summary Stats
│   ├── Total Orders (filtered)
│   ├── Total Revenue (filtered)
│   └── Average Order Value
│
├── 4. Data Table
│   ├── Table Header
│   │   ├── Checkbox (Select All)
│   │   ├── Order ID
│   │   ├── Tanggal (Sortable)
│   │   ├── Customer
│   │   ├── Produk
│   │   ├── Total (Sortable)
│   │   ├── Metode
│   │   ├── Status
│   │   └── Aksi
│   │
│   └── Table Rows (repeated)
│       ├── Checkbox
│       ├── Order ID (clickable)
│       ├── Date
│       ├── Customer Name
│       ├── Products Summary
│       ├── Total Amount
│       ├── Payment Badge
│       ├── Status Badge
│       └── Action Buttons
│           ├── View
│           ├── Edit
│           └── Delete
│
├── 5. Bulk Actions Bar
│   ├── "Update Status" Dropdown
│   ├── "Export" Button
│   └── "Delete Selected" Button
│
├── 6. Pagination
│   ├── Items per page selector
│   ├── Page navigation
│   └── Total records info
│
└── 7. Modals
    ├── Add/Edit Order Modal
    ├── View Order Detail Modal
    └── Delete Confirmation Modal
```

#### D. DATABASE PENGELUARAN
```
DATABASE PENGELUARAN
│
├── 1. Page Header
│   ├── Title "Database Pengeluaran"
│   └── + Tambah Pengeluaran Button
│
├── 2. Summary Cards
│   ├── Total Pengeluaran (Bulan Ini)
│   ├── Kategori Terbesar
│   └── Rata-rata Harian
│
├── 3. Category Breakdown Chart
│   └── Pie Chart by Category
│
├── 4. Filter Section
│   ├── Date Range Picker
│   ├── Category Multi-select
│   ├── Search Input
│   └── Apply/Reset Buttons
│
├── 5. Data Table
│   ├── Table Header
│   │   ├── Expense ID
│   │   ├── Tanggal (Sortable)
│   │   ├── Kategori
│   │   ├── Deskripsi
│   │   ├── Vendor
│   │   ├── Jumlah (Sortable)
│   │   ├── Bukti
│   │   └── Aksi
│   │
│   └── Table Rows (repeated)
│
├── 6. Pagination
│
└── 7. Modals
    ├── Add/Edit Expense Modal
    ├── View Receipt Modal
    └── Delete Confirmation Modal
```

---

## 4. Content Priority Matrix

### Customer Store

| Content | Priority | Visibility | Frequency of Access |
|---------|----------|------------|---------------------|
| Hero CTA | Critical | Above fold | Every visit |
| Product Cards | High | Above fold | Every visit |
| Add to Cart | High | Product pages | Frequent |
| Cart Summary | High | Cart/Checkout | Transaction |
| Payment Options | High | Checkout | Transaction |
| Product Description | Medium | Product detail | Research phase |
| Testimonials | Low | Homepage | First visit |
| Footer Links | Low | All pages | Rare |

### Owner Dashboard

| Content | Priority | Visibility | Frequency of Access |
|---------|----------|------------|---------------------|
| Key Metrics | Critical | Dashboard top | Daily |
| Recent Orders | High | Dashboard | Daily |
| Sales Table | High | Penjualan page | Daily |
| Charts | Medium | Dashboard | Weekly |
| Expense Entry | Medium | Pengeluaran | Weekly |
| Reports | Medium | Laporan | Monthly |
| Settings | Low | Pengaturan | Rare |

---

## 5. Navigation Patterns

### Customer Store Navigation

```
PRIMARY NAV (Horizontal - Header)
├── Logo (→ Home)
├── Beranda
├── Produk
├── Cara Order
├── Kontak
└── Cart Icon [Badge]

FOOTER NAV
├── Produk
│   ├── Pikset
│   └── Sempring
├── Bantuan
│   ├── Cara Order
│   ├── FAQ
│   └── Kontak
├── Legal
│   ├── Syarat & Ketentuan
│   └── Kebijakan Privasi
└── Social Media Links
```

### Dashboard Navigation

```
TOP BAR (Horizontal)
├── Hamburger Menu (Mobile)
├── Logo
├── Search Bar (Optional)
├── Notifications Icon
└── Profile Dropdown
    ├── Profile Settings
    └── Logout

SIDEBAR NAV (Vertical)
├── Dashboard (Icon + Text)
├── Penjualan (Expandable)
│   ├── Semua Pesanan
│   ├── Pesanan QRIS
│   └── Pesanan COD
├── Pengeluaran
├── Laporan (Expandable)
│   ├── Laporan Penjualan
│   └── Laporan Profit
└── Pengaturan
```

---

## 6. Page Inventory

### Customer Store Pages

| Page ID | Page Name | URL Path | Template |
|---------|-----------|----------|----------|
| CS-01 | Homepage | `/` | Landing |
| CS-02 | Katalog Produk | `/produk` | List |
| CS-03 | Detail Produk | `/produk/[slug]` | Detail |
| CS-04 | Keranjang | `/keranjang` | Cart |
| CS-05 | Checkout | `/checkout` | Form |
| CS-06 | Pembayaran QRIS | `/pembayaran/qris` | Payment |
| CS-07 | Pembayaran COD | `/pembayaran/cod` | Payment |
| CS-08 | Status Pesanan | `/pesanan/[orderId]` | Status |
| CS-09 | Cara Order | `/cara-order` | Info |
| CS-10 | Kontak | `/kontak` | Info |
| CS-11 | Syarat & Ketentuan | `/syarat-ketentuan` | Legal |
| CS-12 | Kebijakan Privasi | `/kebijakan-privasi` | Legal |

### Dashboard Pages

| Page ID | Page Name | URL Path | Template |
|---------|-----------|----------|----------|
| DB-01 | Login | `/admin/login` | Auth |
| DB-02 | Dashboard | `/admin/dashboard` | Dashboard |
| DB-03 | Semua Pesanan | `/admin/penjualan` | Table |
| DB-04 | Detail Pesanan | `/admin/penjualan/[id]` | Detail |
| DB-05 | Pengeluaran | `/admin/pengeluaran` | Table |
| DB-06 | Laporan Penjualan | `/admin/laporan/penjualan` | Report |
| DB-07 | Laporan Profit | `/admin/laporan/profit` | Report |
| DB-08 | Pengaturan | `/admin/pengaturan` | Settings |

---

**Next Document:** [02-user-flow-diagrams.md](./02-user-flow-diagrams.md)
