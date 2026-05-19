const products = [
  { name: 'Basreng Pedas', percentage: 45, color: 'bg-primary' },
  { name: 'Keripik Kaca', percentage: 30, color: 'bg-orange-400' },
  { name: 'Makaroni', percentage: 15, color: 'bg-yellow-400' },
  { name: 'Lainnya', percentage: 10, color: 'bg-slate-200' },
];

export function BestSellingChart() {
  return (
    <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Best Selling</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Produk terlaris bulan ini
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* Chart */}
        <div className="flex justify-center relative">
          <div
            className="size-48 rounded-full flex items-center justify-center relative"
            style={{
              background:
                'conic-gradient(#f44034 0% 45%, #fb923c 45% 75%, #facc15 75% 90%, #e2e8f0 90% 100%)',
            }}
          >
            {/* Inner Circle for Donut Effect */}
            <div className="size-32 bg-white dark:bg-card-dark rounded-full flex flex-col items-center justify-center z-10">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">1.2k</span>
              <span className="text-xs text-slate-500 font-medium">Items Sold</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div key={product.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`size-3 rounded-full ${product.color}`} />
                <span className="text-slate-700 dark:text-slate-300">{product.name}</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                {product.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
