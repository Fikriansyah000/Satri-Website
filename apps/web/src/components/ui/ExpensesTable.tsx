import { useState } from 'react';
import { Pagination } from './Pagination';

interface Expense {
  id: string;
  date: string;
  category: string;
  categoryColor: string;
  description: string;
  vendor: string;
  amount: string;
}

const mockExpenses: Expense[] = [
  {
    id: 'EXP-2310-009',
    date: '24 Okt 2023',
    category: 'Bahan Baku',
    categoryColor: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    description: '50kg Cabai Rawit Merah (Grade A)',
    vendor: 'Pasar Induk Kramat',
    amount: 'Rp 2.500.000',
  },
  {
    id: 'EXP-2310-008',
    date: '23 Okt 2023',
    category: 'Packaging',
    categoryColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    description: 'Cetak 1000 Pouch Standing Premium',
    vendor: 'Plastik Jaya Mandiri',
    amount: 'Rp 1.200.000',
  },
  {
    id: 'EXP-2310-007',
    date: '22 Okt 2023',
    category: 'Marketing',
    categoryColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    description: 'Iklan Facebook & Instagram Ads (Okt)',
    vendor: 'Meta Platforms Ireland',
    amount: 'Rp 800.000',
  },
  {
    id: 'EXP-2310-006',
    date: '21 Okt 2023',
    category: 'Logistik',
    categoryColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    description: 'Bensin Armada Pengiriman (Minggu 3)',
    vendor: 'Pertamina SPBU 31.12',
    amount: 'Rp 350.000',
  },
  {
    id: 'EXP-2310-005',
    date: '20 Okt 2023',
    category: 'Bahan Baku',
    categoryColor: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    description: '20kg Bumbu Rempah Mix (Secret)',
    vendor: 'Spice King Supplier',
    amount: 'Rp 850.000',
  },
  {
    id: 'EXP-2310-004',
    date: '18 Okt 2023',
    category: 'Operasional',
    categoryColor: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300',
    description: 'Service Berkala Mesin Seal',
    vendor: 'Teknik Mesin Jaya',
    amount: 'Rp 450.000',
  },
];

export function ExpensesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Export */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-surface-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-slate-900 dark:text-white"
            placeholder="Cari ID pengeluaran, nama vendor, atau deskripsi..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[20px]">file_download</span>
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Dari Tanggal
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Sampai Tanggal
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Kategori
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none w-full pl-3 pr-8 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="all">Semua Kategori</option>
                <option value="bahan-baku">Bahan Baku</option>
                <option value="packaging">Packaging</option>
                <option value="marketing">Marketing</option>
                <option value="logistik">Logistik</option>
                <option value="operasional">Operasional</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Status Pembayaran
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full pl-3 pr-8 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="paid">Lunas</option>
                <option value="pending">Pending</option>
                <option value="overdue">Terlambat</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left" scope="col">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-surface-dark dark:border-slate-700 h-4 w-4"
                    type="checkbox"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  ID Pengeluaran
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Tanggal
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Kategori
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Deskripsi
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Vendor
                </th>
                <th
                  className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  scope="col"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-dark divide-y divide-slate-200 dark:divide-slate-700">
              {mockExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-surface-dark dark:border-slate-700 h-4 w-4"
                      type="checkbox"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {expense.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expense.categoryColor}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {expense.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-slate-900 dark:text-white">
                    {expense.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={12}
          totalResults={128}
          resultsPerPage={6}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
