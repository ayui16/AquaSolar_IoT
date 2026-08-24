import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const email = auth.currentUser?.email ?? 'AquaSolar operator';

  return (
    <PageShell>
      <Header theme={theme} onToggleTheme={toggleTheme} lastUpdated="Just now" />
      <main className="space-y-4 px-4 pb-28 pt-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your AquaSolar account.</p>
        </div>
        <section className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 dark:bg-slate-800/60 dark:ring-slate-700/50">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-lg font-bold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">{email.charAt(0).toUpperCase()}</div>
          <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{email}</p>
          <p className="mt-1 text-xs text-accent-600 dark:text-accent-400">Connected to AquaSolar IoT</p>
          <button onClick={() => signOut(auth).then(() => navigate('/login'))} className="mt-5 w-full rounded-xl bg-danger-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-danger-600">Log out</button>
        </section>
      </main>
      <BottomNav />
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950"><div className="relative mx-auto min-h-screen max-w-md bg-slate-50 shadow-2xl shadow-slate-900/5 dark:bg-slate-950 dark:shadow-black/40">{children}</div></div>;
}
