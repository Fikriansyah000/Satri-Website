# 🌶️ Satri E-Commerce Monorepo

Satri E-Commerce adalah platform toko online modern dan responsif yang dirancang khusus untuk penjualan produk cemilan pedas (seperti Pikset, Sempring, Basreng, dll). Aplikasi ini dibangun menggunakan arsitektur **Monorepo Workspaces** untuk memisahkan frontend (Client) dan backend (API Server) secara modular namun tetap mudah dikelola dalam satu repository.

---

## 🛠️ Tech Stack & Arsitektur

### 1. Frontend (Client - `apps/web`)
*   **Vite + React.js (TypeScript)**: Lingkungan pengembangan frontend yang sangat cepat dan aman dengan type-safety.
*   **Tailwind CSS**: Desain UI yang modern, premium, adaptif, serta mendukung **Dark Mode**.
*   **Framer Motion**: Animasi mikro-interaktif dan transisi antar halaman yang halus.
*   **React Router DOM v6**: Manajemen navigasi dan routing aplikasi.
*   **Vite Dev Proxy**: Proxy otomatis (`/api` -> `http://localhost:3000`) untuk menyederhanakan pemanggilan endpoint backend saat pengembangan.

### 2. Backend (API Server - `apps/api`)
*   **Express.js (TypeScript)**: Framework backend minimalis, cepat, dan terstruktur.
*   **Drizzle ORM**: Tools ORM modern yang tipis dan cepat untuk memetakan skema database ke PostgreSQL.
*   **PostgreSQL**: Basis data relasional utama untuk menyimpan data produk, transaksi, pengeluaran, dan user.
*   **Better Auth**: Sistem autentikasi tangguh dengan enkripsi credential dan pengelolaan session berbasis database.
*   **Cloudinary Integration**: Penyimpanan cloud pihak ketiga untuk mengunggah dan mengoptimalkan gambar bukti transfer pembayaran serta gambar produk secara otomatis.

---

## 🚀 Cara Instalasi & Setup Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan project ini secara lokal di komputer Anda:

### 1. Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terpasang:
*   [Node.js](https://nodejs.org/) (Versi LTS terbaru direkomendasikan)
*   [PostgreSQL Database](https://www.postgresql.org/) yang sedang aktif.

### 2. Instalasi Dependensi
Jalankan perintah berikut pada **direktori utama (root)** project untuk menginstal semua modul frontend dan backend sekaligus (menggunakan npm workspaces):

```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)

#### Backend (`apps/api/.env`)
Salin file `.env.example` di dalam folder `apps/api` menjadi `.env` dan sesuaikan nilainya:

```bash
cp apps/api/.env.example apps/api/.env
```

Isi variabel di dalam `apps/api/.env`:
```env
PORT=3000
NODE_ENV=development

# URL koneksi ke database PostgreSQL lokal Anda
DATABASE_URL=postgres://[USERNAME]:[PASSWORD]@localhost:5432/[NAMA_DATABASE]

# CORS - Mengizinkan akses dari alamat frontend
CORS_ORIGINS=http://localhost:5173

# Akun Cloudinary (Diperlukan untuk fitur upload gambar produk & bukti transfer)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Konfigurasi Better Auth
BETTER_AUTH_SECRET=buat_random_secret_key_yang_panjang_disini
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Setup Database & Migrasi (Drizzle ORM)
Setelah database PostgreSQL dibuat dan dikonfigurasi pada `.env`, jalankan perintah-perintah berikut di folder backend untuk menyelaraskan skema tabel dan mengisi data awal (seeding):

```bash
# Pindah ke direktori api
cd apps/api

# 1. Generate file migrasi database berdasarkan skema Drizzle
npm run db:generate

# 2. Push/terapkan skema tabel langsung ke PostgreSQL
npm run db:push

# 3. Seed data awal (Kategori produk, dummy produk, kategori pengeluaran, & akun Admin)
npm run db:seed

# Kembali ke direktori utama (root)
cd ../..
```

### 5. Menjalankan Aplikasi
Untuk menjalankan server backend (`apps/api`) dan frontend (`apps/web`) secara bersamaan dengan satu perintah, jalankan script berikut di **direktori utama (root)**:

```bash
npm run dev
```

*   **Frontend Client** akan berjalan di: `http://localhost:5173`
*   **Backend API** akan berjalan di: `http://localhost:3000`

---

## 🔑 Akses & Rute (Routes & Credentials)

Aplikasi membagi hak akses rute menjadi dua bagian utama: **Pelanggan (Public)** dan **Pemilik/Admin (Protected)**.

### 1. Rute Pelanggan / Customer (Public)

Rute-rute ini dapat diakses secara bebas oleh pengunjung tanpa perlu melakukan login:

| Rute / Path | Komponen Halaman | Deskripsi |
| :--- | :--- | :--- |
| `/` | `HomePage` | Halaman beranda utama dengan hero section, CTA, dan highlight produk. |
| `/produk` | `CatalogPage` | Halaman galeri produk interaktif lengkap dengan filter kategori & tingkat kepedasan. |
| `/checkout` | `CheckoutPage` | Formulir data pemesanan, keranjang belanja, informasi pengiriman, dan pemilihan metode pembayaran. |
| `/payment` | `PaymentPage` | Halaman konfirmasi pembayaran QRIS (upload bukti transfer) / COD serta generator chat WhatsApp. |
| `/order-status` | `OrderStatusPage` | Melacak status pesanan terbaru setelah checkout secara real-time. |
| `/orders` | `OrdersPage` | Menampilkan riwayat transaksi / daftar pesanan pelanggan. |
| `/cara-order` | `HowToOrderPage` | Panduan langkah demi langkah cara berbelanja di Satri E-Commerce. |
| `/kontak` | `ContactPage` | Halaman informasi kontak, media sosial, dan alamat fisik toko. |

### 2. Rute Pemilik / Admin (Protected)

Rute khusus pengelola toko untuk memantau performa bisnis dan mengelola data. Seluruh API backend untuk rute ini dilindungi oleh `authMiddleware` Better Auth.

| Rute / Path | Komponen Halaman | Deskripsi |
| :--- | :--- | :--- |
| `/admin` | `AdminDashboardPage` | Dashboard utama yang berisi statistik penjualan, laba bersih, chart tren, dan transaksi terbaru. |
| `/admin/products` | `AdminProductsPage` | Panel CRUD Manajemen Produk (Tambah, Edit, Hapus produk dengan fitur upload gambar). |
| `/admin/sales` | `SalesPage` | Visualisasi detail data transaksi penjualan harian/bulanan. |
| `/admin/expenses` | `ExpensesPage` | Manajemen pengeluaran operasional (Bahan baku, packaging, marketing, dll) untuk kalkulasi laba bersih. |
| `/admin/orders` | `AdminOrdersPage` | Pengelolaan order masuk, verifikasi bukti transfer QRIS, dan pembaruan status pengiriman. |

### 3. Kredensial Login Admin (Default Seeded)
Saat Anda menjalankan perintah `npm run db:seed`, sistem secara otomatis mendaftarkan satu akun Administrator default yang dapat digunakan untuk masuk ke panel admin:

*   **Email**: `admin@satri.com`
*   **Password**: `admin123`
*   **Role**: Owner / Admin

> [!WARNING]  
> Untuk alasan keamanan, sangat disarankan untuk mengubah kata sandi default ini melalui sistem autentikasi backend setelah aplikasi siap dideploy ke server produksi.

---

## ✨ Penjelasan Fitur Aplikasi

Berikut adalah rincian fitur utama yang tersedia pada aplikasi Satri E-Commerce:

### 1. Fitur untuk Pelanggan (Customer Features)
*   **Desain Premium & Dark Mode**: Tampilan UI estetik kelas tinggi dengan paduan warna harmonis (merah-oranye khas pedas), kaca buram (*glassmorphic*), serta transisi animasi halus menggunakan Framer Motion. UI juga mendukung perubahan tema gelap secara mulus.
*   **Dynamic Product Catalog**: Pelanggan dapat memfilter cemilan berdasarkan kategori (Pikset, Sempring, Basreng) dan melihat indikator tingkat kepedasan dinamis (ikon cabai merah 🔥).
*   **Interactive Shopping Cart & Checkout**: Keranjang belanja *real-time* yang terintegrasi di sidebar. Formulir checkout mudah diisi dengan validasi otomatis, metode pengiriman, catatan khusus, dan kalkulasi total harga yang transparan.
*   **Konfirmasi Pembayaran QRIS & COD**:
    *   Jika memilih **QRIS**, aplikasi memunculkan modul scan QRIS interaktif dengan scanner laser animasi. Pembeli dapat langsung mengunggah file bukti transfer foto/gambar (diunggah ke Cloudinary) dan mengirimkan notifikasi otomatis ke WhatsApp Admin.
    *   Jika memilih **COD (Cash on Delivery)**, pemesanan dapat langsung diproses tanpa memerlukan bukti pembayaran awal.
*   **Live Order Tracking**: Pelanggan mendapatkan Nomor Pesanan unik (contoh: `#ORD-XXXXXXXX`) setelah checkout untuk mengecek detail barang, info pengiriman, status pembayaran, dan proses logistik secara real-time.

### 2. Fitur untuk Pengelola / Pemilik Toko (Admin Features)
*   **Dashboard Statistik Pintar (Smart Analytics)**:
    *   Menampilkan ringkasan ringkas berupa kartu metrik keuangan: *Penjualan Bulanan*, *Jumlah Pesanan*, *Total Pengeluaran*, dan *Laba Bersih* lengkap dengan persentase tren naik/turun bulanan.
    *   Dilengkapi grafik visualisasi modern untuk **Tren Penjualan (Sales Trend)** dan **Produk Terlaris (Best Selling)**.
    *   Daftar *Recent Orders* untuk penanganan pesanan baru secara cepat.
*   **CRUD Produk Terintegrasi**: Kelola etalase toko secara dinamis. Admin bisa menambah produk baru, menyunting deskripsi/harga/diskon/tingkat kepedasan, mengatur stok, menonaktifkan produk, serta mengunggah hingga beberapa gambar produk secara instan ke Cloudinary.
*   **Database Pengeluaran Operasional (Expenses Manager)**: Catat setiap pos pengeluaran bisnis secara teratur (misalnya pembelian cabai, kemasan plastik, biaya iklan digital). Pengeluaran ini dikelompokkan dengan tag warna yang menarik untuk mempermudah perhitungan margin laba bersih toko secara akurat.
*   **Verifikasi Transaksi & Alur Logistik (Order Manager)**:
    *   Memeriksa bukti transfer yang diunggah pelanggan (dengan pratinjau gambar ukuran penuh).
    *   Memproses status pesanan melalui alur: `Pending` ➡️ `Paid` ➡️ `Processing` ➡️ `Shipped` ➡️ `Completed` atau `Cancelled`.
