interface KPICardProps {
  label: string;
  value: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  trend?: string;
  trendLabel?: string;
}

export function KPICard({
  label,
  value,
  icon,
  iconBgColor,
  iconColor,
  trend,
  trendLabel,
}: KPICardProps) {
  return (
    <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <span
          className={`size-8 rounded-lg ${iconBgColor} ${iconColor} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-sm">{icon}</span>
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.startsWith('+')
                ? 'text-green-600 dark:text-green-400'
                : 'text-slate-500 dark:text-slate-500'
            }`}
          >
            {trend}
            {trendLabel && ` ${trendLabel}`}
          </span>
        )}
      </div>
    </div>
  );
}
