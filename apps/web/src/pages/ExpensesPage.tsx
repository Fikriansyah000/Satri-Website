import { AdminLayout } from '../components/layout/AdminLayout';
import { ExpensesTable } from '../components/ui/ExpensesTable';

export function ExpensesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Database Pengeluaran
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Kelola basis data pengeluaran operasional Satri secara lengkap dan efisien.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-red-600 text-white text-sm font-medium shadow-sm shadow-primary/30 transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Tambah Pengeluaran
            </button>
          </div>
        </div>

        {/* Expenses Table */}
        <ExpensesTable />
      </div>
    </AdminLayout>
  );
}
