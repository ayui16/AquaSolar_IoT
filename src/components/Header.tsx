import { RefreshCw, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lastUpdated: string;
  deviceOnline?: boolean;
}

export default function Header({ theme, onToggleTheme, lastUpdated, deviceOnline = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 safe-top">
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <DropletIcon />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                AquaSolar IoT
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                </span>
                <span className={`text-[11px] font-medium ${deviceOnline === false ? 'text-danger-600 dark:text-danger-400' : 'text-accent-600 dark:text-accent-400'}`}>
                  ESP32 Device {deviceOnline === false ? 'Offline' : 'Online'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80">
              <RefreshCw className="h-3 w-3 text-slate-400" />
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {lastUpdated}
              </span>
            </div>
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-90"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function DropletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
      <path
        d="M12 2.5C12 2.5 5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}
