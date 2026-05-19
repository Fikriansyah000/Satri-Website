import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard', filled: true },
  { name: 'Produk', href: '/admin/products', icon: 'inventory_2' },
  { name: 'Penjualan', href: '/admin/sales', icon: 'shopping_cart' },
  { name: 'Pengeluaran', href: '/admin/expenses', icon: 'account_balance_wallet' },
  { name: 'Laporan', href: '/admin/reports', icon: 'description' },
  { name: 'Pengaturan', href: '/admin/settings', icon: 'settings' },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark flex flex-col transition-colors duration-200">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined">local_fire_department</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-none text-slate-900 dark:text-white">
              Satri Admin
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Owner Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <span
                className={`material-symbols-outlined ${isActive && item.filled ? 'icon-filled' : ''
                  }`}
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Mini Profile */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="size-9 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcCjDgA-xamM4nt1UAUvD0Gbl2M2ln1l03jCwf05wlgbXmX99ejBOAzFbiJVw9Nfh7KgGwy_Gzh_Fwl7wMKfZzUquHSGSQfQ2DlpNUNG1H7mA0ncLh0IbA-YU_bOJC99db9hGmc7E6VBvde-7ZPb0nL3VlUxH41Grpnq5yi5KvZTfkVUt0lyns-fx6KBG726POAIyh4XYeHDRhFyfYmRoi-uR_R9KeMybuGdweJgrH0CZQEqo36xmguTUOU_qbVFL5Qkkt1vXqTqjp")',
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Budi Santoso
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Owner</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
