interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  menu: string;
  date: string;
  total: string;
  status: 'pending' | 'processing' | 'completed';
}

const recentOrders: Order[] = [
  {
    id: '#ORD-0032',
    customerName: 'Ahmad Dhani',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCE5UtrgASCJCZv1qQKPYXMj0VaGPOXjZzWJzOHPDLiPx71afsDZnHQw4IfjS8qaDdd-KPVloPAmgPxV6le1J-a9P8UawM1BReX5xuAbQWBbFCOR1izrlGFy5dI4f1_jaocydi8SpMxq2aayLyDVVtMsvxXibzQejw7oFp1JjvEg0drpwBwKBlvhFZND9m_Fl8zx3bWFSo-gMP4KkjykNOXv_A70MJfI9UQaSNZTwXouzoMLEuZaoGTVqz0BDO5Sbkklexp0ihMIyq_',
    menu: 'Basreng Pedas (x2), Keripik',
    date: 'Nov 28, 2023',
    total: 'Rp 125.000',
    status: 'pending',
  },
  {
    id: '#ORD-0031',
    customerName: 'Siti Aminah',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu7r5hUMC32oSm1sQdWQSe29UZci_ER6zSFaoP-Qr_wcL7zkH1zRbo1LXTlDO75KzIyWoqDNs0oZBorkmGzGCCFv_XyLBwtsijoQuFoOPuC9aB9vvozNbe_ZvHC6pKXZaNenPqH3sNCJyuCSBXaDfanWoTE08gtebTW9zqhH-63lAvF4SgAtK2m1abHv-1MyD-ZRNhE9fw1ndN3SfXddURI1H_4Z_8IV7JNQPT644_N-pqT6mYi9NIqtEYaLz-W35R_TVXXsWhtCsg',
    menu: 'Makaroni Lv 5 (x5)',
    date: 'Nov 28, 2023',
    total: 'Rp 75.000',
    status: 'processing',
  },
  {
    id: '#ORD-0030',
    customerName: 'Bambang Pamungkas',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDV680KVeQQPHx1EsbHkPbVtZ9gXS7vy7B4XKu4v3sytqu2zZ5msgNVpADKNhki67m_S1fqPdN6FtnV84CeyETOXCOEHELXK1vlxzKYoP8KJ4xSllRnvbjSJbMqq_ZRRsQflTlllLZThXwY_Bvn1kdzzkkdz0RvlV3z_qAfL-7FJZbQZh7_s6yv7rhlP2NFXjNRqfM976U4F5Ir_FlFyPZCTYg4HozeN-JZ5X5JlTiDv_FrGYzivph5pB4LwKoazO7TwUS2ezo1E2ei',
    menu: 'Seblak Instan (x10)',
    date: 'Nov 27, 2023',
    total: 'Rp 150.000',
    status: 'completed',
  },
  {
    id: '#ORD-0029',
    customerName: 'Rina Nose',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlLSfq4lh4zdgDPP4wty04AkPyBRX8OUK-Hgejse0qBZLwCGjkyROS3hFwZ6rAUpMIFyzL4l2nuZ_HwgbDnuTKo90MRN-VYHGZXeIJnLhl5gcGsqdfT8AIgyua02qq3qVEg_ColiSrgbz6R0CfvejWU5OS2XB64n3eLuco5euDQ_zUWYIGh16ko4hPXqCFgzgDpusSkOM0jKXWbAACg6Dbf0PWylGY1Mjx0pVA309EIV1gJvkwrusPmsBB4tANH1NN0t4kPE5TSj6W',
    menu: 'Keripik Kaca (x3)',
    date: 'Nov 27, 2023',
    total: 'Rp 45.000',
    status: 'completed',
  },
];

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50',
};

export function RecentOrdersTable() {
  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Daftar transaksi terbaru masuk
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-red-700 dark:hover:text-red-400 transition-colors">
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Pelanggan</th>
              <th className="px-6 py-4">Menu</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-8 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${order.customerAvatar}")` }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {order.customerName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {order.menu}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {order.date}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                  {order.total}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
