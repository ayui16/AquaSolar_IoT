import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import HistoryChart from '@/components/HistoryChart';
import { chartData } from '@/data/sensors';
import { useTheme } from '@/hooks/useTheme';

export default function Charts() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageShell>
      <Header theme={theme} onToggleTheme={toggleTheme} lastUpdated="Just now" />
      <main className="space-y-4 px-4 pb-28 pt-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Charts</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Review recent water quality trends.</p>
        </div>
        <HistoryChart data={chartData} />
      </main>
      <BottomNav />
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950"><div className="relative mx-auto min-h-screen max-w-md bg-slate-50 shadow-2xl shadow-slate-900/5 dark:bg-slate-950 dark:shadow-black/40">{children}</div></div>;
}
