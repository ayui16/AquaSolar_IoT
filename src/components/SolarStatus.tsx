import { Sun, Battery, Zap } from 'lucide-react';

interface SolarStatusProps {
  solarInput: number;
  batteryLevel: number;
}

export default function SolarStatus({ solarInput, batteryLevel }: SolarStatusProps) {
  const batteryColor =
    batteryLevel > 50 ? '#10b981' : batteryLevel > 20 ? '#f59e0b' : '#ef4444';

  return (
    <div className="animate-slide-up rounded-3xl bg-white dark:bg-slate-800/60 ring-1 ring-slate-200/70 dark:ring-slate-700/50 p-5" style={{ animationDelay: '320ms' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-warning-100 dark:bg-warning-500/15 flex items-center justify-center">
          <Zap className="h-4 w-4 text-warning-600 dark:text-warning-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Solar Power System</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Solar Panel Input */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-warning-400 to-warning-600 flex items-center justify-center shadow-lg shadow-warning-500/30">
            <Sun className="h-7 w-7 text-white animate-pulse-slow" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 leading-none">
            {solarInput}
            <span className="text-sm font-medium text-slate-400 ml-0.5">W</span>
          </p>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Panel Input</p>
        </div>

        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Battery Level */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-2">
            <Battery className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Battery (SOC)</p>
          </div>

          {/* Battery visual */}
          <div className="relative w-full h-8 rounded-lg border-2 border-slate-300 dark:border-slate-600 p-0.5 overflow-hidden">
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-1.5 rounded-r bg-slate-300 dark:bg-slate-600" />
            <div
              className="h-full rounded-md transition-all duration-1000 ease-out flex items-center justify-end pr-1.5"
              style={{
                width: `${batteryLevel}%`,
                backgroundColor: batteryColor,
                boxShadow: `0 0 12px ${batteryColor}66`,
              }}
            >
              <span className="text-[9px] font-bold text-white">{batteryLevel}%</span>
            </div>
          </div>

          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-slate-400">0%</span>
            <span className="text-[10px] font-semibold" style={{ color: batteryColor }}>
              {batteryLevel > 50 ? 'Healthy' : batteryLevel > 20 ? 'Moderate' : 'Low'}
            </span>
            <span className="text-[10px] text-slate-400">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
