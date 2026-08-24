import { type SensorReading, statusConfig } from '@/data/sensors';

interface SensorCardProps {
  sensor: SensorReading;
  index: number;
}

export default function SensorCard({ sensor, index }: SensorCardProps) {
  const Icon = sensor.icon;
  const cfg = statusConfig[sensor.status];
  const pct = Math.min(100, Math.max(0, ((sensor.current - sensor.min) / (sensor.max - sensor.min)) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div
      className={`animate-slide-up relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800/60 ring-1 ring-slate-200/70 dark:ring-slate-700/50 ${cfg.glow} p-4 transition-all hover:scale-[1.02] active:scale-[0.98]`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${cfg.badgeBg}`}>
          <Icon className="h-5 w-5" style={{ color: cfg.color }} />
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
          {cfg.label}
        </span>
      </div>

      <div className="flex items-center justify-center my-1">
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="7"
              className="stroke-slate-100 dark:stroke-slate-700/50"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              stroke={cfg.color}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              {sensor.value.toFixed(sensor.decimals ?? 0)}
            </span>
            <span className="text-[10px] font-medium text-slate-400 mt-0.5">{sensor.unit}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">{sensor.label}</p>
    </div>
  );
}
