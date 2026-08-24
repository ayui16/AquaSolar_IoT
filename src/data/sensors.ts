import {
  Thermometer,
  Droplet,
  Eye,
  Activity,
  type LucideIcon,
} from 'lucide-react';

export type SensorStatus = 'safe' | 'warning' | 'danger' | 'optimal';

export interface SensorReading {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  status: SensorStatus;
  min: number;
  max: number;
  current: number;
  decimals?: number;
}

export interface ChartPoint {
  time: string;
  ph: number;
  turbidity: number;
}

export const sensors: SensorReading[] = [
  {
    id: 'temperature',
    label: 'Temperature',
    value: 28.5,
    unit: '°C',
    icon: Thermometer,
    status: 'safe',
    min: 0,
    max: 50,
    current: 28.5,
    decimals: 1,
  },
  {
    id: 'ph',
    label: 'pH Level',
    value: 7.2,
    unit: 'pH',
    icon: Droplet,
    status: 'optimal',
    min: 0,
    max: 14,
    current: 7.2,
    decimals: 1,
  },
  {
    id: 'turbidity',
    label: 'Turbidity',
    value: 5,
    unit: 'NTU',
    icon: Eye,
    status: 'safe',
    min: 0,
    max: 50,
    current: 5,
    decimals: 1,
  },
  {
    id: 'tds',
    label: 'TDS',
    value: 150,
    unit: 'ppm',
    icon: Activity,
    status: 'safe',
    min: 0,
    max: 1000,
    current: 150,
  },
];

export const statusConfig: Record<
  SensorStatus,
  { label: string; color: string; badgeBg: string; badgeText: string; ring: string; glow: string }
> = {
  safe: {
    label: 'Safe',
    color: '#10b981',
    badgeBg: 'bg-accent-100 dark:bg-accent-500/15',
    badgeText: 'text-accent-700 dark:text-accent-300',
    ring: 'ring-accent-400/30',
    glow: 'shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)]',
  },
  optimal: {
    label: 'Optimal',
    color: '#329fff',
    badgeBg: 'bg-primary-100 dark:bg-primary-500/15',
    badgeText: 'text-primary-700 dark:text-primary-300',
    ring: 'ring-primary-400/30',
    glow: 'shadow-[0_0_20px_-4px_rgba(50,159,255,0.4)]',
  },
  warning: {
    label: 'Warning',
    color: '#f59e0b',
    badgeBg: 'bg-warning-100 dark:bg-warning-500/15',
    badgeText: 'text-warning-700 dark:text-warning-300',
    ring: 'ring-warning-400/30',
    glow: 'shadow-[0_0_20px_-4px_rgba(245,158,11,0.4)]',
  },
  danger: {
    label: 'Danger',
    color: '#ef4444',
    badgeBg: 'bg-danger-100 dark:bg-danger-500/15',
    badgeText: 'text-danger-700 dark:text-danger-300',
    ring: 'ring-danger-400/30',
    glow: 'shadow-[0_0_20px_-4px_rgba(239,68,68,0.4)]',
  },
};

function generateChartData(): ChartPoint[] {
  const points: ChartPoint[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = t.getHours();
    const phBase = 7.2;
    const phVar = Math.sin((hour / 24) * Math.PI * 2) * 0.4 + Math.cos(hour * 0.7) * 0.15;
    const turbidityBase = 5;
    const turbidityVar = Math.sin((hour / 24) * Math.PI * 2 + 1) * 2 + Math.cos(hour * 0.5);
    points.push({
      time: `${String(hour).padStart(2, '0')}:00`,
      ph: Number((phBase + phVar).toFixed(2)),
      turbidity: Number((turbidityBase + turbidityVar).toFixed(1)),
    });
  }
  return points;
}

export const chartData = generateChartData();
