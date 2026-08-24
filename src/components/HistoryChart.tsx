import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Droplet, Activity } from 'lucide-react';
import type { ChartPoint } from '@/data/sensors';
import { useTheme } from '@/hooks/useTheme';

interface HistoryChartProps {
  data: ChartPoint[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const axisColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <div className="animate-slide-up rounded-3xl bg-white dark:bg-slate-800/60 ring-1 ring-slate-200/70 dark:ring-slate-700/50 p-5" style={{ animationDelay: '480ms' }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-500/15 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">24h Trends</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <Droplet className="h-3 w-3 text-primary-500" /> pH
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <Activity className="h-3 w-3 text-accent-500" /> Turbidity
          </span>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 mb-3">pH & Turbidity over the last 24 hours</p>

      <div className="h-52 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 12, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="phGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#329fff" />
                <stop offset="100%" stopColor="#1c80f5" />
              </linearGradient>
              <linearGradient id="tdsGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: axisColor }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              yAxisId="ph"
              domain={[6, 8]}
              tick={{ fontSize: 9, fill: '#329fff' }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <YAxis
              yAxisId="tds"
              orientation="right"
              domain={[0, 20]}
              tick={{ fontSize: 9, fill: '#10b981' }}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                borderRadius: '12px',
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: isDark ? '#cbd5e1' : '#475569', fontWeight: 600 }}
            />
            <Line
              yAxisId="ph"
              type="monotone"
              dataKey="ph"
              stroke="url(#phGrad)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#329fff' }}
            />
            <Line
              yAxisId="tds"
              type="monotone"
              dataKey="turbidity"
              stroke="url(#tdsGrad)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
