interface StatCardProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export function StatCard({
  icon,
  iconBgColor,
  iconColor,
  label,
  value,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="p-5 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 ${iconBgColor} ${iconColor} rounded-lg`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span
          className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
            trendUp
              ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
              : 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {trend}
          <span className="material-symbols-outlined text-[14px] ml-0.5">
            {trendUp ? 'arrow_upward' : 'arrow_downward'}
          </span>
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
    </div>
  );
}
