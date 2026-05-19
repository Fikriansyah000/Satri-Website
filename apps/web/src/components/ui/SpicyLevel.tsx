interface SpicyLevelProps {
  level: number
  maxLevel?: number
}

const SpicyLevel = ({ level, maxLevel = 5 }: SpicyLevelProps) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Spiciness Level ${level}`}>
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-2">
        Level Pedas:
      </span>
      {[...Array(maxLevel)].map((_, index) => (
        <span
          key={index}
          className={`material-symbols-outlined text-[18px] ${
            index < level
              ? 'text-accent filled'
              : 'text-gray-300 dark:text-gray-600'
          }`}
          style={index < level ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          local_fire_department
        </span>
      ))}
    </div>
  )
}

export default SpicyLevel
