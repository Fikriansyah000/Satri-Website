# Component Structure & Design System
# Website Satri E-Commerce

**Version:** 1.0  
**Date:** 30 Januari 2026  
**Document Type:** Frontend Planning - Component Architecture

---

## 1. Component Hierarchy Overview

### 1.1 Customer Store Component Tree

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   │   ├── NavItem
│   │   │   └── MobileMenu (Hamburger)
│   │   └── CartIcon
│   │       └── CartBadge
│   │
│   ├── Main (Content Area)
│   │   └── [Page Components]
│   │
│   └── Footer
│       ├── FooterBrand
│       ├── FooterLinks
│       ├── FooterContact
│       └── SocialLinks
│
├── Pages
│   ├── HomePage
│   │   ├── HeroSection
│   │   │   ├── HeroContent
│   │   │   ├── HeroImage
│   │   │   └── CTAButton
│   │   ├── ProductHighlight
│   │   │   └── ProductCard (multiple)
│   │   ├── ValueProposition
│   │   │   └── ValueCard (multiple)
│   │   ├── HowToOrder
│   │   │   └── StepCard (multiple)
│   │   └── Testimonials
│   │       └── TestimonialCard (multiple)
│   │
│   ├── CatalogPage
│   │   ├── PageHeader
│   │   │   ├── Breadcrumb
│   │   │   └── PageTitle
│   │   ├── FilterBar
│   │   │   ├── FilterDropdown
│   │   │   ├── SortDropdown
│   │   │   └── SearchInput
│   │   ├── ProductGrid
│   │   │   └── ProductCard (multiple)
│   │   └── Pagination
│   │
│   ├── ProductDetailPage
│   │   ├── Breadcrumb
│   │   ├── ProductGallery
│   │   │   ├── MainImage
│   │   │   └── ThumbnailList
│   │   ├── ProductInfo
│   │   │   ├── TypeBadge
│   │   │   ├── ProductTitle
│   │   │   ├── SpicyLevel
│   │   │   ├── PriceDisplay
│   │   │   ├── StockStatus
│   │   │   ├── VariantSelector
│   │   │   ├── QuantitySelector
│   │   │   ├── TotalPrice
│   │   │   └── ActionButtons
│   │   ├── ProductTabs
│   │   │   ├── TabHeader
│   │   │   └── TabContent
│   │   └── RelatedProducts
│   │       └── ProductCard (multiple)
│   │
│   ├── CartPage
│   │   ├── CartHeader
│   │   ├── CartItems
│   │   │   └── CartItem (multiple)
│   │   │       ├── ItemImage
│   │   │       ├── ItemDetails
│   │   │       ├── QuantityAdjuster
│   │   │       ├── ItemSubtotal
│   │   │       └── RemoveButton
│   │   ├── CartSummary
│   │   │   ├── SummaryLine (multiple)
│   │   │   ├── PromoCodeInput
│   │   │   └── TotalDisplay
│   │   ├── CheckoutButton
│   │   └── EmptyCartState
│   │
│   ├── CheckoutPage
│   │   ├── ProgressIndicator
│   │   ├── CustomerInfoForm
│   │   │   ├── FormField (multiple)
│   │   │   └── AddressSection
│   │   ├── PaymentMethodSelector
│   │   │   ├── PaymentOption (QRIS)
│   │   │   └── PaymentOption (COD)
│   │   ├── OrderSummary (Sidebar)
│   │   ├── TermsCheckbox
│   │   └── SubmitButton
│   │
│   ├── QRISPaymentPage
│   │   ├── ProgressIndicator
│   │   ├── OrderInfo
│   │   ├── QRISDisplay
│   │   │   ├── QRCodeImage
│   │   │   └── CountdownTimer
│   │   ├── PaymentInstructions
│   │   ├── ReceiptUploader
│   │   │   ├── DropZone
│   │   │   ├── FilePreview
│   │   │   └── UploadButton
│   │   └── CancelButton
│   │
│   ├── CODConfirmPage
│   │   ├── ProgressIndicator
│   │   ├── SuccessMessage
│   │   ├── OrderDetails
│   │   ├── DeliveryInfo
│   │   ├── ImportantNotes
│   │   └── WhatsAppButton
│   │
│   └── OrderStatusPage
│       ├── OrderHeader
│       │   ├── OrderId
│       │   └── StatusBadge
│       ├── StatusTimeline
│       │   └── TimelineItem (multiple)
│       ├── OrderDetails
│       │   └── OrderItem (multiple)
│       └── ContactButton
│
└── Shared Components
    ├── UI Elements
    │   ├── Button
    │   ├── Input
    │   ├── Select
    │   ├── Checkbox
    │   ├── Radio
    │   ├── Badge
    │   ├── Toast
    │   ├── Modal
    │   └── Spinner
    │
    ├── Product Components
    │   ├── ProductCard
    │   ├── SpicyLevelIndicator
    │   └── StockBadge
    │
    └── Form Components
        ├── FormField
        ├── FormError
        └── FormLabel
```

---

### 1.2 Dashboard Component Tree

```
DashboardApp
├── AuthGuard
│   └── LoginPage
│       ├── LoginForm
│       │   ├── FormField (Username)
│       │   ├── FormField (Password)
│       │   ├── RememberMeCheckbox
│       │   └── SubmitButton
│       └── ForgotPasswordLink
│
├── DashboardLayout
│   ├── TopBar
│   │   ├── Logo
│   │   ├── MobileMenuToggle
│   │   ├── NotificationIcon
│   │   │   └── NotificationBadge
│   │   └── ProfileDropdown
│   │       ├── ProfileInfo
│   │       └── LogoutButton
│   │
│   ├── Sidebar
│   │   ├── SidebarNav
│   │   │   └── NavItem (multiple)
│   │   │       ├── NavIcon
│   │   │       ├── NavLabel
│   │   │       └── SubNav (expandable)
│   │   └── SidebarFooter
│   │
│   └── MainContent
│       └── [Page Components]
│
├── Pages
│   ├── DashboardOverview
│   │   ├── WelcomeHeader
│   │   ├── MetricsRow
│   │   │   └── MetricCard (multiple)
│   │   │       ├── MetricIcon
│   │   │       ├── MetricValue
│   │   │       ├── MetricLabel
│   │   │       └── MetricChange
│   │   ├── ChartsRow
│   │   │   ├── SalesChart
│   │   │   ├── RevenueExpenseChart
│   │   │   ├── ProfitChart
│   │   │   └── ProductPieChart
│   │   ├── RecentOrdersTable
│   │   │   ├── TableHeader
│   │   │   └── TableRow (multiple)
│   │   └── QuickActions
│   │       └── ActionButton (multiple)
│   │
│   ├── OrdersPage
│   │   ├── PageHeader
│   │   │   ├── PageTitle
│   │   │   └── AddOrderButton
│   │   ├── FilterSection
│   │   │   ├── DateRangePicker
│   │   │   ├── FilterDropdown (multiple)
│   │   │   ├── SearchInput
│   │   │   └── FilterActions
│   │   ├── SummaryStats
│   │   │   └── StatCard (multiple)
│   │   ├── DataTable
│   │   │   ├── TableHeader
│   │   │   │   ├── SelectAllCheckbox
│   │   │   │   └── ColumnHeader (multiple)
│   │   │   └── TableBody
│   │   │       └── OrderRow (multiple)
│   │   │           ├── SelectCheckbox
│   │   │           ├── OrderId
│   │   │           ├── CustomerInfo
│   │   │           ├── ProductSummary
│   │   │           ├── TotalAmount
│   │   │           ├── PaymentBadge
│   │   │           ├── StatusBadge
│   │   │           └── ActionButtons
│   │   ├── BulkActionsBar
│   │   │   ├── SelectedCount
│   │   │   ├── StatusUpdateDropdown
│   │   │   ├── ExportButton
│   │   │   └── DeleteButton
│   │   └── Pagination
│   │
│   ├── ExpensesPage
│   │   ├── PageHeader
│   │   ├── SummaryCards
│   │   │   └── SummaryCard (multiple)
│   │   ├── CategoryBreakdownChart
│   │   ├── FilterSection
│   │   ├── DataTable
│   │   │   └── ExpenseRow (multiple)
│   │   └── Pagination
│   │
│   ├── ReportsPage
│   │   ├── ReportSelector
│   │   ├── FilterOptions
│   │   │   ├── PeriodSelector
│   │   │   ├── ProductFilter
│   │   │   └── ExportButton
│   │   ├── SummaryMetrics
│   │   │   └── MetricCard (multiple)
│   │   ├── ChartSection
│   │   │   └── Chart (type varies)
│   │   └── DetailedBreakdown
│   │       └── BreakdownTable
│   │
│   └── SettingsPage
│       ├── SettingsNav
│       └── SettingsPanel (varies)
│
├── Modals
│   ├── AddOrderModal
│   │   ├── ModalHeader
│   │   ├── CustomerInfoSection
│   │   ├── ProductSelectSection
│   │   │   └── ProductLineItem (multiple)
│   │   ├── OrderSummary
│   │   ├── PaymentStatusSection
│   │   └── ModalFooter
│   │
│   ├── OrderDetailModal
│   │   ├── OrderHeader
│   │   ├── CustomerInfoDisplay
│   │   ├── ProductListDisplay
│   │   ├── PaymentInfoDisplay
│   │   │   └── ReceiptPreview
│   │   ├── StatusUpdateSection
│   │   └── ActionButtons
│   │
│   ├── AddExpenseModal
│   │   ├── DatePicker
│   │   ├── CategorySelector
│   │   ├── DescriptionInput
│   │   ├── AmountInput
│   │   ├── VendorInput
│   │   ├── FileUploader
│   │   └── NotesInput
│   │
│   ├── ConfirmDeleteModal
│   │   ├── WarningIcon
│   │   ├── ConfirmMessage
│   │   └── ActionButtons
│   │
│   └── ImageViewerModal
│       └── FullSizeImage
│
└── Shared Components
    ├── Data Display
    │   ├── DataTable
    │   ├── TablePagination
    │   ├── StatusBadge
    │   ├── PaymentMethodBadge
    │   └── AmountDisplay
    │
    ├── Charts
    │   ├── LineChart
    │   ├── BarChart
    │   ├── AreaChart
    │   └── PieChart
    │
    ├── Form Elements
    │   ├── DateRangePicker
    │   ├── SearchInput
    │   ├── FilterDropdown
    │   ├── FileUploader
    │   └── CurrencyInput
    │
    └── Feedback
        ├── LoadingSkeleton
        ├── EmptyState
        ├── ErrorState
        └── SuccessToast
```

---

## 2. Design System - UI Components

### 2.1 Color Palette

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              COLOR PALETTE                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PRIMARY COLORS (Brand)                                                             │
│  ─────────────────────────                                                          │
│                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                                 │
│  │             │  │             │  │             │                                 │
│  │  Primary    │  │  Primary    │  │  Primary    │                                 │
│  │  #D32F2F    │  │  #F44336    │  │  #FFCDD2    │                                 │
│  │  (Dark)     │  │  (Main)     │  │  (Light)    │                                 │
│  │             │  │             │  │             │                                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                                 │
│                                                                                     │
│  Usage: CTA buttons, active states, important actions, spicy theme                  │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  SECONDARY COLORS                                                                   │
│  ─────────────────────────                                                          │
│                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                                 │
│  │             │  │             │  │             │                                 │
│  │  Secondary  │  │  Secondary  │  │  Secondary  │                                 │
│  │  #FF6F00    │  │  #FF9800    │  │  #FFE0B2    │                                 │
│  │  (Dark)     │  │  (Main)     │  │  (Light)    │                                 │
│  │             │  │             │  │             │                                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                                 │
│                                                                                     │
│  Usage: Secondary actions, highlights, complementary UI elements                    │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  NEUTRAL COLORS                                                                     │
│  ─────────────────────────                                                          │
│                                                                                     │
│  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐               │
│  │  #1A1A1A││  #333333││  #666666││  #999999││  #E5E5E5││  #F5F5F5│               │
│  │  Text   ││  Heading││  Body   ││  Muted  ││  Border ││  BG     │               │
│  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘└─────────┘               │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  SEMANTIC COLORS                                                                    │
│  ─────────────────────────                                                          │
│                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │  Success    │  │  Warning    │  │  Error      │  │  Info       │               │
│  │  #4CAF50    │  │  #FFC107    │  │  #F44336    │  │  #2196F3    │               │
│  │             │  │             │  │             │  │             │               │
│  │  Completed  │  │  Low stock  │  │  Errors     │  │  Information│               │
│  │  Confirmed  │  │  Pending    │  │  Failed     │  │  Tips       │               │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Typography Scale

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              TYPOGRAPHY SCALE                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  FONT FAMILY                                                                        │
│  ─────────────                                                                      │
│  Primary:   'Inter', 'Segoe UI', sans-serif                                         │
│  Fallback:  system-ui, -apple-system, sans-serif                                    │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  HEADING STYLES                                                                     │
│  ─────────────                                                                      │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                             │   │
│  │  H1 - Display                                                               │   │
│  │  Font Size: 36px / 2.25rem                                                  │   │
│  │  Line Height: 1.2                                                           │   │
│  │  Font Weight: 700 (Bold)                                                    │   │
│  │  Usage: Page titles, Hero headlines                                         │   │
│  │                                                                             │   │
│  │  "Sensasi Pedas Yang Bikin Ketagihan!"                                      │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                             │   │
│  │  H2 - Page Title                                                            │   │
│  │  Font Size: 28px / 1.75rem                                                  │   │
│  │  Line Height: 1.3                                                           │   │
│  │  Font Weight: 600 (Semibold)                                                │   │
│  │  Usage: Section titles, Page headings                                       │   │
│  │                                                                             │   │
│  │  "Produk Unggulan"                                                          │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                             │   │
│  │  H3 - Section Title                                                         │   │
│  │  Font Size: 22px / 1.375rem                                                 │   │
│  │  Line Height: 1.4                                                           │   │
│  │  Font Weight: 600 (Semibold)                                                │   │
│  │  Usage: Card titles, Subsections                                            │   │
│  │                                                                             │   │
│  │  "Pikset Original"                                                          │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                             │   │
│  │  H4 - Card Title                                                            │   │
│  │  Font Size: 18px / 1.125rem                                                 │   │
│  │  Line Height: 1.4                                                           │   │
│  │  Font Weight: 500 (Medium)                                                  │   │
│  │  Usage: Small card titles, Labels                                           │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  BODY TEXT STYLES                                                                   │
│  ─────────────                                                                      │
│                                                                                     │
│  Body Large:    16px / 1rem      LH: 1.6    Weight: 400    (Descriptions)          │
│  Body Regular:  14px / 0.875rem  LH: 1.5    Weight: 400    (General text)          │
│  Body Small:    12px / 0.75rem   LH: 1.5    Weight: 400    (Captions, hints)       │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  SPECIAL STYLES                                                                     │
│  ─────────────                                                                      │
│                                                                                     │
│  Price Large:   24px / 1.5rem    Weight: 700   Color: Primary   (Main price)       │
│  Price Regular: 16px / 1rem      Weight: 600   Color: Primary   (Card price)       │
│  Label:         12px / 0.75rem   Weight: 500   Transform: UPPERCASE (Badges)       │
│  Button Text:   14px / 0.875rem  Weight: 600   (Button labels)                     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.3 Spacing System

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              SPACING SYSTEM                                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  BASE UNIT: 4px                                                                     │
│                                                                                     │
│  ┌───────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                               │ │
│  │  xs     = 4px   (0.25rem)   │ Tight spacing, icon gaps                       │ │
│  │  sm     = 8px   (0.5rem)    │ Small gaps, inline elements                    │ │
│  │  md     = 16px  (1rem)      │ Default spacing, card padding                  │ │
│  │  lg     = 24px  (1.5rem)    │ Section gaps, larger padding                   │ │
│  │  xl     = 32px  (2rem)      │ Section separators                             │ │
│  │  2xl    = 48px  (3rem)      │ Major section gaps                             │ │
│  │  3xl    = 64px  (4rem)      │ Page section separators                        │ │
│  │                                                                               │ │
│  └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  APPLICATION EXAMPLES:                                                              │
│  ─────────────────────                                                              │
│                                                                                     │
│  Button Padding:        padding: 12px 24px (sm-md vertically, md-lg horizontally)  │
│  Card Padding:          padding: 24px (lg)                                          │
│  Card Gap in Grid:      gap: 24px (lg)                                              │
│  Section Margin:        margin-bottom: 48px (2xl)                                   │
│  Form Field Gap:        gap: 16px (md)                                              │
│  Icon + Text Gap:       gap: 8px (sm)                                               │
│  Table Cell Padding:    padding: 12px 16px                                          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.4 Button Variants

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              BUTTON VARIANTS                                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PRIMARY BUTTON                                                                     │
│  ─────────────────                                                                  │
│  ┌───────────────────────────────────────┐                                         │
│  │                                       │  Background: Primary (#F44336)           │
│  │        🛒 Pesan Sekarang              │  Text: White                             │
│  │                                       │  Border: None                            │
│  └───────────────────────────────────────┘  Border Radius: 8px                      │
│                                             Padding: 12px 24px                      │
│  States:                                    Font: 14px, 600 weight                  │
│  - Hover: Darken 10% (#D32F2F)                                                      │
│  - Active: Darken 15%                                                               │
│  - Disabled: Opacity 50%                                                            │
│  - Loading: Show spinner                                                            │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  SECONDARY BUTTON                                                                   │
│  ─────────────────                                                                  │
│  ┌───────────────────────────────────────┐                                         │
│  │                                       │  Background: White                       │
│  │        Tambah ke Keranjang            │  Text: Primary (#F44336)                 │
│  │                                       │  Border: 1px solid Primary               │
│  └───────────────────────────────────────┘  Border Radius: 8px                      │
│                                                                                      │
│  States:                                                                             │
│  - Hover: Background: Primary 10% opacity                                           │
│  - Active: Background: Primary 20% opacity                                          │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  GHOST BUTTON                                                                       │
│  ─────────────────                                                                  │
│  ┌───────────────────────────────────────┐                                         │
│  │                                       │  Background: Transparent                 │
│  │        ← Kembali                      │  Text: Gray (#666666)                    │
│  │                                       │  Border: None                            │
│  └───────────────────────────────────────┘                                         │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  DANGER BUTTON                                                                      │
│  ─────────────────                                                                  │
│  ┌───────────────────────────────────────┐                                         │
│  │                                       │  Background: Error (#F44336)             │
│  │        🗑️ Hapus                       │  Text: White                             │
│  │                                       │  Usage: Destructive actions              │
│  └───────────────────────────────────────┘                                         │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  BUTTON SIZES                                                                       │
│  ─────────────────                                                                  │
│                                                                                     │
│  Small:   padding: 8px 16px,  font-size: 12px                                       │
│  Medium:  padding: 12px 24px, font-size: 14px  (Default)                            │
│  Large:   padding: 16px 32px, font-size: 16px                                       │
│                                                                                     │
│  Full Width: width: 100%                                                            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.5 Form Elements

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              FORM ELEMENTS                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  INPUT FIELD                                                                        │
│  ─────────────                                                                      │
│                                                                                     │
│  Default State:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                             │   │
│  │  Nama Lengkap *                                          Label (12px, 500)  │   │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ Masukkan nama lengkap...                                            │   │   │
│  │  └─────────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                             │   │
│  │  Specifications:                                                            │   │
│  │  - Height: 44px                                                             │   │
│  │  - Border: 1px solid #E5E5E5                                                │   │
│  │  - Border Radius: 8px                                                       │   │
│  │  - Padding: 12px 16px                                                       │   │
│  │  - Font Size: 14px                                                          │   │
│  │  - Placeholder Color: #999999                                               │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  Focus State:                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ John Doe                                                            │   │   │
│  │  └─────────────────────────────────────────────────────────────────────┘   │   │
│  │  Border: 2px solid Primary (#F44336)                                        │   │
│  │  Box Shadow: 0 0 0 3px rgba(244, 67, 54, 0.1)                               │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  Error State:                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  Nama Lengkap *                                                             │   │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                                 ⚠️  │   │   │
│  │  └─────────────────────────────────────────────────────────────────────┘   │   │
│  │  ❌ Nama wajib diisi                               (Error text: 12px, red) │   │
│  │                                                                             │   │
│  │  Border: 1px solid Error (#F44336)                                          │   │
│  │  Icon: Warning icon inside input                                            │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  SELECT DROPDOWN                                                                    │
│  ─────────────────                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ Pilih Kategori                                                  ▼   │   │   │
│  │  ├─────────────────────────────────────────────────────────────────────┤   │   │
│  │  │ 🥔 Bahan Baku                                                       │   │   │
│  │  │ 📦 Packaging                                                        │   │   │
│  │  │ ⚡ Operasional                                                       │   │   │
│  │  │ ...                                                                 │   │   │
│  │  └─────────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  CHECKBOX & RADIO                                                                   │
│  ─────────────────                                                                  │
│                                                                                     │
│  Checkbox:                              Radio:                                       │
│  ┌───┐                                  ┌───┐                                       │
│  │ ✓ │ Saya setuju dengan T&C          │ ● │ QRIS                                  │
│  └───┘                                  └───┘                                       │
│                                         ┌───┐                                       │
│  Size: 20x20px                          │   │ COD                                   │
│  Border Radius: 4px                     └───┘                                       │
│  Checked: Primary color fill                                                        │
│                                         Size: 20x20px                               │
│                                         Border Radius: 50%                          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.6 Card Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              CARD COMPONENTS                                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PRODUCT CARD                                                                       │
│  ─────────────                                                                      │
│                                                                                     │
│  ┌─────────────────────────────┐                                                   │
│  │                             │  Specifications:                                   │
│  │  ┌───────────────────────┐  │  - Width: Responsive (Grid)                        │
│  │  │                       │  │  - Background: White                               │
│  │  │     [Product Image]   │  │  - Border: 1px solid #E5E5E5                       │
│  │  │        200x200        │  │  - Border Radius: 12px                             │
│  │  │                       │  │  - Box Shadow: 0 2px 8px rgba(0,0,0,0.08)          │
│  │  │      Hover: Scale     │  │  - Padding: 0 (image) + 16px (content)             │
│  │  │       1.05            │  │                                                    │
│  │  └───────────────────────┘  │  Image:                                            │
│  │                             │  - Aspect Ratio: 1:1                               │
│  │  ┌────────────┐             │  - Object Fit: Cover                               │
│  │  │   PIKSET   │  ← Badge    │  - Border Radius: 12px 12px 0 0                    │
│  │  └────────────┘             │                                                    │
│  │                             │  Badge:                                             │
│  │  Pikset Original            │  - Background: Primary (light)                     │
│  │  ─────────────────          │  - Text: Primary                                   │
│  │                             │  - Font: 10px, uppercase, 500                      │
│  │  🌶️🌶️🌶️○○  Level 3         │  - Padding: 4px 8px                                │
│  │                             │  - Border Radius: 4px                               │
│  │  Rp 15.000                  │                                                    │
│  │                             │  Spicy Level:                                       │
│  │  ┌───────────────────────┐  │  - Filled: #F44336                                 │
│  │  │ ✓ Stok Tersedia       │  │  - Empty: #E5E5E5                                  │
│  │  └───────────────────────┘  │                                                    │
│  │                             │  Price:                                             │
│  │  ┌───────────────────────┐  │  - Font: 18px, 700, Primary                        │
│  │  │    + Keranjang        │  │                                                    │
│  │  └───────────────────────┘  │  Button:                                           │
│  │                             │  - Full width                                       │
│  └─────────────────────────────┘  - Height: 40px                                    │
│                                                                                     │
│  Hover State:                                                                       │
│  - Card: box-shadow: 0 4px 16px rgba(0,0,0,0.12)                                   │
│  - Image: transform: scale(1.05)                                                    │
│  - Transition: all 0.3s ease                                                        │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  METRIC CARD (Dashboard)                                                            │
│  ───────────────────────                                                            │
│                                                                                     │
│  ┌─────────────────────────────┐                                                   │
│  │                             │  Specifications:                                   │
│  │  💰  Penjualan Bulan Ini    │  - Background: White                               │
│  │                             │  - Border Radius: 12px                             │
│  │  Rp 15.750.000              │  - Padding: 24px                                   │
│  │                             │  - Box Shadow: 0 2px 8px rgba(0,0,0,0.08)          │
│  │  ▲ +12.5% vs bulan lalu     │                                                    │
│  │                             │  Icon: 24x24, muted color                          │
│  │                             │  Title: 14px, muted, 400                           │
│  └─────────────────────────────┘  Value: 28px, bold, dark                          │
│                                   Change: 12px, green (positive), red (negative)    │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.7 Badge & Status Components

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              BADGES & STATUS                                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  PRODUCT TYPE BADGES                                                                │
│  ───────────────────                                                                │
│                                                                                     │
│  ┌────────────┐  ┌────────────┐                                                    │
│  │   PIKSET   │  │  SEMPRING  │                                                    │
│  └────────────┘  └────────────┘                                                    │
│                                                                                     │
│  Pikset:  Background: #FFF3E0, Text: #FF6F00                                        │
│  Sempring: Background: #FFEBEE, Text: #D32F2F                                       │
│                                                                                     │
│  Specs: padding: 4px 12px, border-radius: 4px, font: 10px uppercase 600            │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  PAYMENT METHOD BADGES                                                              │
│  ─────────────────────                                                              │
│                                                                                     │
│  ┌────────┐  ┌────────┐                                                            │
│  │  QRIS  │  │  COD   │                                                            │
│  └────────┘  └────────┘                                                            │
│                                                                                     │
│  QRIS: Background: #E3F2FD, Text: #1976D2, Icon: QR                                 │
│  COD:  Background: #E8F5E9, Text: #388E3C, Icon: Cash                               │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  ORDER STATUS BADGES                                                                │
│  ───────────────────                                                                │
│                                                                                     │
│  ┌─────────────────────┐  Background: #FFF8E1                                       │
│  │ ⏳ Pending          │  Text: #F57C00                                             │
│  └─────────────────────┘  Icon: Hourglass                                           │
│                                                                                     │
│  ┌─────────────────────┐  Background: #E3F2FD                                       │
│  │ 🔵 Confirmed        │  Text: #1976D2                                             │
│  └─────────────────────┘  Icon: Check Circle                                        │
│                                                                                     │
│  ┌─────────────────────┐  Background: #E8EAF6                                       │
│  │ 🔄 Processing       │  Text: #3F51B5                                             │
│  └─────────────────────┘  Icon: Sync                                                │
│                                                                                     │
│  ┌─────────────────────┐  Background: #F3E5F5                                       │
│  │ 🚚 Shipped          │  Text: #7B1FA2                                             │
│  └─────────────────────┘  Icon: Truck                                               │
│                                                                                     │
│  ┌─────────────────────┐  Background: #E8F5E9                                       │
│  │ ✅ Completed        │  Text: #388E3C                                             │
│  └─────────────────────┘  Icon: Check                                               │
│                                                                                     │
│  ┌─────────────────────┐  Background: #FFEBEE                                       │
│  │ ❌ Cancelled        │  Text: #D32F2F                                             │
│  └─────────────────────┘  Icon: X Circle                                            │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  STOCK STATUS                                                                       │
│  ───────────                                                                        │
│                                                                                     │
│  ┌───────────────────────┐  Background: #E8F5E9, Text: #388E3C                      │
│  │ ✓ Stok Tersedia       │                                                          │
│  └───────────────────────┘                                                          │
│                                                                                     │
│  ┌───────────────────────┐  Background: #FFF8E1, Text: #F57C00                      │
│  │ ⚠ Sisa: 5             │  (Low stock warning)                                     │
│  └───────────────────────┘                                                          │
│                                                                                     │
│  ┌───────────────────────┐  Background: #FFEBEE, Text: #D32F2F                      │
│  │ ✗ Stok Habis          │                                                          │
│  └───────────────────────┘                                                          │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  EXPENSE CATEGORY BADGES                                                            │
│  ───────────────────────                                                            │
│                                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                        │
│  │ 🥔 Bahan Baku  │  │ 📦 Packaging   │  │ ⚡ Operasional │                        │
│  └────────────────┘  └────────────────┘  └────────────────┘                        │
│                                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                        │
│  │ 📢 Marketing   │  │ 🚚 Pengiriman  │  │ 📋 Lainnya     │                        │
│  └────────────────┘  └────────────────┘  └────────────────┘                        │
│                                                                                     │
│  Each with distinct background/text color for easy categorization                   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              RESPONSIVE BREAKPOINTS                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  BREAKPOINT DEFINITIONS                                                             │
│  ─────────────────────────                                                          │
│                                                                                     │
│  Mobile Small:   320px - 374px   (xs)    │ Small phones                            │
│  Mobile:         375px - 639px   (sm)    │ Standard phones                         │
│  Tablet:         640px - 1023px  (md)    │ Tablets, small laptops                  │
│  Desktop:        1024px - 1279px (lg)    │ Standard desktop                        │
│  Large Desktop:  1280px+         (xl)    │ Large monitors                          │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  GRID SYSTEM                                                                        │
│  ─────────────                                                                      │
│                                                                                     │
│  Max Container Width:                                                               │
│  - Mobile: 100% (padding 16px)                                                      │
│  - Tablet: 100% (padding 24px)                                                      │
│  - Desktop: 1200px (centered)                                                       │
│                                                                                     │
│  Product Grid Columns:                                                              │
│  - Mobile: 2 columns                                                                │
│  - Tablet: 3 columns                                                                │
│  - Desktop: 4 columns                                                               │
│                                                                                     │
│  Dashboard Grid:                                                                    │
│  - Mobile: 1 column (stacked)                                                       │
│  - Tablet: 2 columns                                                                │
│  - Desktop: 4 columns (metrics)                                                     │
│                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│                                                                                     │
│  RESPONSIVE BEHAVIORS                                                               │
│  ─────────────────────                                                              │
│                                                                                     │
│  Navigation:                                                                        │
│  - Desktop: Horizontal nav                                                          │
│  - Mobile: Hamburger menu → Full-screen overlay                                     │
│                                                                                     │
│  Dashboard Sidebar:                                                                 │
│  - Desktop: Fixed sidebar (240px width)                                             │
│  - Tablet: Collapsible sidebar (icons only: 60px)                                   │
│  - Mobile: Hidden → Bottom tab navigation                                           │
│                                                                                     │
│  Cart Summary:                                                                      │
│  - Desktop: Sticky sidebar                                                          │
│  - Mobile: Fixed bottom bar                                                         │
│                                                                                     │
│  Product Detail:                                                                    │
│  - Desktop: 2-column (image left, info right)                                       │
│  - Mobile: Stacked (image top, info below)                                          │
│                                                                                     │
│  Data Tables:                                                                       │
│  - Desktop: Full table                                                              │
│  - Tablet: Scrollable horizontally                                                  │
│  - Mobile: Card-based layout                                                        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

**Next Document:** [05-interaction-patterns.md](./05-interaction-patterns.md)
