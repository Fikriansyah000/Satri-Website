export function SalesTrendChart() {
  return (
    <div className="lg:col-span-2 p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Trend</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pendapatan 30 hari terakhir
          </p>
        </div>
        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 w-full">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 dark:text-slate-500">
          <div className="border-b border-slate-100 dark:border-slate-800 w-full h-0" />
          <div className="border-b border-slate-100 dark:border-slate-800 w-full h-0" />
          <div className="border-b border-slate-100 dark:border-slate-800 w-full h-0" />
          <div className="border-b border-slate-100 dark:border-slate-800 w-full h-0" />
          <div className="border-b border-slate-100 dark:border-slate-800 w-full h-0" />
        </div>

        {/* Line SVG */}
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 400 150"
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f44034" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f44034" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120 C 40 120, 60 80, 100 80 C 140 80, 160 110, 200 90 C 240 70, 260 40, 300 50 C 340 60, 360 20, 400 30"
            fill="none"
            stroke="#f44034"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M0 120 C 40 120, 60 80, 100 80 C 140 80, 160 110, 200 90 C 240 70, 260 40, 300 50 C 340 60, 360 20, 400 30 V 150 H 0 Z"
            fill="url(#gradient)"
            stroke="none"
          />
        </svg>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium">
        <span>1 Nov</span>
        <span>7 Nov</span>
        <span>14 Nov</span>
        <span>21 Nov</span>
        <span>28 Nov</span>
      </div>
    </div>
  );
}
