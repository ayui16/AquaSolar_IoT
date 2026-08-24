import { Power, Settings2 } from 'lucide-react';

interface ControlPanelProps {
  pumpOn: boolean;
  onPumpChange: (pumpOn: boolean) => void;
}

export default function ControlPanel({ pumpOn, onPumpChange }: ControlPanelProps) {

  return (
    <div className="animate-slide-up rounded-3xl bg-white dark:bg-slate-800/60 ring-1 ring-slate-200/70 dark:ring-slate-700/50 p-5" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-500/15 flex items-center justify-center">
          <Settings2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Control Panel</h2>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 ring-1 ring-slate-200/60 dark:ring-slate-700/40">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors ${
              pumpOn
                ? 'bg-accent-100 dark:bg-accent-500/15'
                : 'bg-slate-200 dark:bg-slate-700/50'
            }`}
          >
            <Power
              className={`h-5 w-5 transition-colors ${
                pumpOn ? 'text-accent-600 dark:text-accent-400' : 'text-slate-400'
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">DC Water Pump</p>
            <p className={`text-xs font-medium ${pumpOn ? 'text-accent-600 dark:text-accent-400' : 'text-slate-400'}`}>
              {pumpOn ? 'Running' : 'Stopped'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => onPumpChange(!pumpOn)}
          role="switch"
          aria-checked={pumpOn}
          aria-label="Toggle DC water pump"
          className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
            pumpOn ? 'bg-accent-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
              pumpOn ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
