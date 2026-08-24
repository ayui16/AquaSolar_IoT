import { LayoutDashboard, BarChart3, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type Tab = 'dashboard' | 'charts' | 'settings' | 'profile';

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname.split('/').pop() as Tab;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30 safe-bottom">
      <div className="mx-3 mb-3 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 ring-1 ring-slate-200/70 dark:ring-slate-700/50 shadow-xl shadow-slate-900/10 dark:shadow-black/30">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id === 'dashboard' ? '/dashboard' : `/dashboard/${tab.id}`)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-90"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[9px] font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute -top-0.5 h-1 w-1 rounded-full bg-primary-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
