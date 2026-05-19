import { AdminLayout } from '../components/layout/AdminLayout';
import { StatCard } from '../components/ui/StatCard';
import { SalesTrendChart } from '../components/ui/SalesTrendChart';
import { BestSellingChart } from '../components/ui/BestSellingChart';
import { RecentOrdersTable } from '../components/ui/RecentOrdersTable';

const stats = [
  {
    icon: 'payments',
    iconBgColor: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    label: 'Penjualan Bulanan',
    value: 'Rp 45.2M',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    icon: 'shopping_bag',
    iconBgColor: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    label: 'Jumlah Pesanan',
    value: '342',
    trend: '+5.2%',
    trendUp: true,
  },
  {
    icon: 'account_balance_wallet',
    iconBgColor: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    label: 'Pengeluaran',
    value: 'Rp 12.5M',
    trend: '-2.1%',
    trendUp: false,
  },
  {
    icon: 'monitoring',
    iconBgColor: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    label: 'Laba Bersih',
    value: 'Rp 32.7M',
    trend: '+8.4%',
    trendUp: true,
  },
];

export function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SalesTrendChart />
          <BestSellingChart />
        </div>

        {/* Recent Orders Table */}
        <RecentOrdersTable />
      </div>
    </AdminLayout>
  );
}
