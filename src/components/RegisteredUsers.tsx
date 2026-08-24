import { onValue, ref } from 'firebase/database';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';

interface RegisteredUser {
  email: string;
  signupTimestamp?: number;
}

interface UserEntry extends RegisteredUser {
  uid: string;
}

export default function RegisteredUsers() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    return onValue(
      ref(db, 'users'),
      (snapshot) => {
        const value = snapshot.val() as Record<string, RegisteredUser> | null;
        const entries = value
          ? Object.entries(value).map(([uid, user]) => ({ uid, ...user }))
          : [];

        entries.sort((first, second) => (second.signupTimestamp ?? 0) - (first.signupTimestamp ?? 0));
        setUsers(entries);
        setLoading(false);
        setError('');
      },
      () => {
        setError('Unable to load registered users.');
        setLoading(false);
      },
    );
  }, []);

  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 dark:bg-slate-800/60 dark:ring-slate-700/50">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-500/15">
          <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Registered Users</h2>
      </div>

      {loading && <p className="text-xs text-slate-400">Loading users...</p>}
      {error && <p className="text-xs text-danger-600 dark:text-danger-300" role="alert">{error}</p>}
      {!loading && !error && users.length === 0 && <p className="text-xs text-slate-400">No registered users yet.</p>}
      {!loading && !error && users.length > 0 && (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.uid} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-700/50">
              <p className="min-w-0 truncate text-xs font-medium text-slate-700 dark:text-slate-300">{user.email}</p>
              {user.signupTimestamp && <time className="shrink-0 text-[10px] text-slate-400" dateTime={new Date(user.signupTimestamp).toISOString()}>{new Date(user.signupTimestamp).toLocaleDateString()}</time>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
