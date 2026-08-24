import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/hooks/useTheme';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageShell>
      <Header theme={theme} onToggleTheme={toggleTheme} lastUpdated="Just now" />
      <main className="space-y-4 px-4 pb-28 pt-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your dashboard preferences.</p>
        </div>
        <section className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 dark:bg-slate-800/60 dark:ring-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Dark theme</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Use the dark dashboard appearance.</p>
            </div>
            <button onClick={toggleTheme} role="switch" aria-checked={theme === 'dark'} aria-label="Toggle dark theme" className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
              <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>
      </main>
      <BottomNav />
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950"><div className="relative mx-auto min-h-screen max-w-md bg-slate-50 shadow-2xl shadow-slate-900/5 dark:bg-slate-950 dark:shadow-black/40">{children}</div></div>;
}
