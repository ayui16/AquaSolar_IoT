import { onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import SensorCard from '@/components/SensorCard';
import SolarStatus from '@/components/SolarStatus';
import ControlPanel from '@/components/ControlPanel';
import HistoryChart from '@/components/HistoryChart';
import BottomNav from '@/components/BottomNav';
import RegisteredUsers from '@/components/RegisteredUsers';
import { chartData, sensors } from '@/data/sensors';
import { auth, db } from '@/firebase';
import { useTheme } from '@/hooks/useTheme';

interface SensorData {
  ph?: number;
  turbidity?: number;
  battery?: number;
}

const ADMIN_EMAIL = 'ayuisan2001@gmail.com';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [sensorData, setSensorData] = useState<SensorData>({});
  const [pumpOn, setPumpOn] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [lastSensorUpdate, setLastSensorUpdate] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const statusTimer = setInterval(() => setCurrentTime(Date.now()), 5000);
    const sensorsUnsubscribe = onValue(
      ref(db, 'sensors'),
      (snapshot) => {
        const value = snapshot.val() as SensorData | null;
        setSensorData({
          ph: typeof value?.ph === 'number' ? value.ph : undefined,
          turbidity: typeof value?.turbidity === 'number' ? value.turbidity : undefined,
          battery: typeof value?.battery === 'number' ? value.battery : undefined,
        });
        setLastUpdated('Just now');
        setLastSensorUpdate(Date.now());
        setError('');
      },
      () => setError('Unable to load live sensor data.'),
    );

    const pumpUnsubscribe = onValue(
      ref(db, 'controls/pumpOn'),
      (snapshot) => setPumpOn(snapshot.val() === true),
      () => setError('Unable to load water pump status.'),
    );

    return () => {
      clearInterval(statusTimer);
      sensorsUnsubscribe();
      pumpUnsubscribe();
    };
  }, []);

  async function handlePumpChange(nextPumpOn: boolean) {
    try {
      setError('');
      await set(ref(db, 'controls/pumpOn'), nextPumpOn);
    } catch {
      setError('Unable to update the water pump.');
    }
  }

  const liveSensors = sensors.map((sensor) => ({
    ...sensor,
    value: sensor.id === 'ph' ? sensorData.ph ?? sensor.value : sensor.id === 'turbidity' ? sensorData.turbidity ?? sensor.value : sensor.value,
    current: sensor.id === 'ph' ? sensorData.ph ?? sensor.current : sensor.id === 'turbidity' ? sensorData.turbidity ?? sensor.current : sensor.current,
  }));
  const deviceOnline = lastSensorUpdate !== null && currentTime - lastSensorUpdate < 30000;
  const isAdmin = auth.currentUser?.email?.trim().toLowerCase() === ADMIN_EMAIL;
  const alerts = [
    sensorData.ph !== undefined && (sensorData.ph < 6.5 || sensorData.ph > 8.5) ? 'pH is outside the normal range (6.5 - 8.5).' : null,
    sensorData.battery !== undefined && sensorData.battery < 20 ? 'Battery level is low (below 20%).' : null,
  ].filter((alert): alert is string => alert !== null);

  return <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300"><div className="mx-auto max-w-md min-h-screen bg-slate-50 dark:bg-slate-950 shadow-2xl shadow-slate-900/5 dark:shadow-black/40 relative"><Header theme={theme} onToggleTheme={toggleTheme} lastUpdated={lastUpdated} deviceOnline={deviceOnline} /><main className="px-4 pt-4 pb-28 space-y-4">{error && <p className="rounded-xl bg-danger-100 px-3 py-2 text-xs text-danger-700 dark:bg-danger-500/15 dark:text-danger-300" role="alert">{error}</p>}<section className="grid grid-cols-2 gap-3">{liveSensors.map((sensor, index) => <SensorCard key={sensor.id} sensor={sensor} index={index} />)}</section><SolarStatus solarInput={180} batteryLevel={sensorData.battery ?? 0} /><ControlPanel pumpOn={pumpOn} onPumpChange={handlePumpChange} />{alerts.length > 0 && <section className="rounded-3xl bg-danger-50 p-5 ring-1 ring-danger-200 dark:bg-danger-500/10 dark:ring-danger-500/20"><div className="mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-danger-500" /><h2 className="text-sm font-semibold text-slate-900 dark:text-white">Alert Log</h2></div><div className="space-y-2">{alerts.map((alert) => <p key={alert} className="text-xs font-medium text-danger-700 dark:text-danger-300">{alert}</p>)}</div></section>}<HistoryChart data={chartData} />{isAdmin && <RegisteredUsers />}</main><BottomNav /></div></div>;
}
