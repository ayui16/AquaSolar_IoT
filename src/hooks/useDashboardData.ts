import { onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { chartData as fallbackChartData, sensors } from '@/data/sensors';
import type { ChartPoint } from '@/data/sensors';

export interface DashboardData {
  sensorValues: Record<string, number>;
  solarInput: number;
  batteryLevel: number;
  pumpOn: boolean;
  history: ChartPoint[];
}

const fallbackData: DashboardData = {
  sensorValues: Object.fromEntries(sensors.map((sensor) => [sensor.id, sensor.value])),
  solarInput: 180,
  batteryLevel: 85,
  pumpOn: true,
  history: fallbackChartData,
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(fallbackData);
  const [error, setError] = useState('');

  useEffect(() => {
    const dashboardRef = ref(db, 'dashboard');
    return onValue(dashboardRef, (snapshot) => {
      const value = snapshot.val() ?? {};
      const history = value.history ? Object.values(value.history) as ChartPoint[] : fallbackChartData;
      setData({
        sensorValues: { ...fallbackData.sensorValues, ...(value.sensors ?? {}) },
        solarInput: value.solarInput ?? fallbackData.solarInput,
        batteryLevel: value.batteryLevel ?? fallbackData.batteryLevel,
        pumpOn: value.pumpOn ?? fallbackData.pumpOn,
        history,
      });
      setError('');
    }, () => setError('Unable to load live dashboard data.'));
  }, []);

  async function setPumpOn(pumpOn: boolean) {
    try {
      await update(ref(db, 'dashboard'), { pumpOn });
      setData((current) => ({ ...current, pumpOn }));
    } catch {
      setError('Unable to update the water pump.');
    }
  }

  return { data, error, setPumpOn };
}
