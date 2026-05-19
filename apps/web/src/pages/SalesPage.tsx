import { AdminLayout } from '../components/layout/AdminLayout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { KPICard } from '../components/ui/KPICard';
import { OrdersTable } from '../components/ui/OrdersTable';

const kpis = [
  {
    label: 'Total Revenue',
    value: 'Rp 8.450.000',
    icon: 'trending_up',
    iconBgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    trend: '+12%',
  },
  {
    label: 'Orders Today',
    value: '42',
    icon: 'shopping_bag',
    iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    trend: '+5%',
    trendLabel: 'vs yesterday',
  },
  {
    label: 'Pending Shipments',
    value: '15',
    icon: 'local_shipping',
    iconBgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    trendLabel: 'Need attention',
  },
];

const breadcrumbItems = [
  { label: 'Home', href: '/admin' },
  { label: 'Dashboard', href: '/admin' },
  { label: 'Sales Database' },
];

export function SalesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Breadcrumbs & Heading */}
        <div className="flex flex-col gap-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sales Database
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage and track all customer orders for Satri Snacks.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">file_download</span>
                Export Report
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-red-600 text-white text-sm font-medium shadow-sm shadow-primary/30 transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Create Order
              </button>
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Orders Table */}
        <OrdersTable />
      </div>
    </AdminLayout>
  );
}
