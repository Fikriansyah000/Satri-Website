import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-card-dark border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-slate-500">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block">
              Overview
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden md:block">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined"
                style={{ fontSize: '20px' }}
              >
                search
              </span>
              <input
                className="h-10 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 border-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-primary/50 w-64 transition-all"
                placeholder="Cari data..."
                type="text"
              />
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-card-dark" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
