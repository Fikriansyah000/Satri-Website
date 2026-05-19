import { useState } from 'react';
import { Pagination } from './Pagination';

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerAvatar?: string;
  customerInitials?: string;
  productSummary: string;
  total: string;
  payment: 'QRIS' | 'COD' | 'Transfer';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const mockOrders: Order[] = [
  {
    id: '#ORD-7392',
    date: 'Oct 24, 2023',
    customerName: 'Andi Saputra',
    customerInitials: 'AS',
    productSummary: 'Spicy Basreng Lv 5 (x2), Keripik...',
    total: 'Rp 50.000',
    payment: 'QRIS',
    status: 'Processing',
  },
  {
    id: '#ORD-7391',
    date: 'Oct 24, 2023',
    customerName: 'Budi Santoso',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1ePJEFlJf2uzd5469-VtKCNEgHSqCeoXIvlegN6kPJ-H-vFoDlISnGw5TJLLo9l5ipH2dI2TBTxexyBMTsI0ytGY08xsXAmO3OAFQk1TKk9hSP8NJA6rG-YLpmWh6-rLZ9w0KA6yItbBq1IFkJi272Gb0lMVfoHjvC9tt_jb4CVGinifQYWmENrE60e_Bs28rbIOqfGjd1BC62tW2VNHH0QuXsXMpUVCGbKoR1_fLcjdP3YmLaCc0GYvcL9K9XC9L-U-iXlGEEfQt',
    productSummary: 'Keripik Kaca Pedas (x5)',
    total: 'Rp 125.000',
    payment: 'COD',
    status: 'Shipped',
  },
  {
    id: '#ORD-7390',
    date: 'Oct 23, 2023',
    customerName: 'Siti Aminah',
    customerInitials: 'SA',
    productSummary: 'Macaroni Spiral (x1)',
    total: 'Rp 15.000',
    payment: 'QRIS',
    status: 'Delivered',
  },
  {
    id: '#ORD-7389',
    date: 'Oct 22, 2023',
    customerName: 'Doni Wibowo',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeHehabAuzIZNFfk5oG_wq059IDvlD7_OBcsg11bnOd_3RcYJFN6ju781w2wVePYt_dlt24N60r0EF5zMtWVIUOnVDeo3chNFdWGjPTLbZatCH1T0dJSJTZk96b6_myQlEOjHhWDt1DVg58hDTiXYrYFhJYhqrgXsL6wBJTarTiFOGFvEEhEh4jRTkJchZ2fo-4tifovFHB0-4nmbl9C5-I0Vdo75IN4HaRaGH5XUUiwpop-SS2UUTps3BFGMfgwMiDfgnR6MHHbXe',
    productSummary: 'Seblak Instan (x10)',
    total: 'Rp 200.000',
    payment: 'Transfer',
    status: 'Cancelled',
  },
  {
    id: '#ORD-7388',
    date: 'Oct 22, 2023',
    customerName: 'Lina Kusuma',
    customerInitials: 'LK',
    productSummary: 'Spicy Chips Level 10',
    total: 'Rp 35.000',
    payment: 'QRIS',
    status: 'Delivered',
  },
];

const paymentStyles = {
  QRIS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  COD: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  Transfer: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
};

const statusStyles = {
  Pending: 'bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300',
  Processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
      {/* Filters Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-surface-dark placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white"
              placeholder="Search by Order ID, Customer Name..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Group */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  calendar_today
                </span>
                <span>Aug 1 - Aug 31, 2023</span>
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  expand_more
                </span>
              </button>
            </div>

            {/* Status */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Status: All</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  expand_more
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">Payment: All</option>
                <option value="qris">QRIS</option>
                <option value="cod">COD</option>
                <option value="transfer">Transfer</option>
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
                Order ID
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Date
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Customer
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Product Summary
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Total
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Payment
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-surface-dark divide-y divide-slate-200 dark:divide-slate-700">
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-3 whitespace-nowrap">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-surface-dark dark:border-slate-700 h-4 w-4"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <a className="text-primary font-medium hover:underline text-sm" href="#">
                    {order.id}
                  </a>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  {order.date}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.customerAvatar ? (
                      <div
                        className="h-8 w-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${order.customerAvatar}")` }}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {order.customerInitials}
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {order.customerName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 max-w-[200px] truncate">
                  {order.productSummary}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                  {order.total}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      paymentStyles[order.payment]
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="text-slate-400 hover:text-primary transition-colors"
                      title="View"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button
                      className="text-slate-400 hover:text-blue-500 transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={45}
        totalResults={450}
        resultsPerPage={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
