import { Droplets, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (auth.currentUser) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (signInError) {
      const code = (signInError as { code?: string }).code;
      setError(code === 'auth/wrong-password' || code === 'auth/invalid-credential' ? 'Wrong password or email.' : code === 'auth/user-not-found' ? 'No account found for this email.' : 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    setResetMessage('');
    setResetError('');
    if (!email.trim()) {
      setResetError('Enter your email address first.');
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetMessage('Password reset email sent! Check your inbox.');
    } catch (resetAuthError) {
      const code = (resetAuthError as { code?: string }).code;
      setResetError(code === 'auth/user-not-found' ? 'No account found for this email.' : 'Unable to send the reset email. Please try again.');
    } finally {
      setResetLoading(false);
    }
  }

  return <AuthLayout><div className="mb-8"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-white shadow-lg shadow-cyan-500/25"><Droplets className="h-7 w-7" /></div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">AquaSolar IoT</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Welcome back</h1><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Monitor your water quality system with clarity.</p></div><form onSubmit={handleSubmit} className="space-y-5"><AuthInput label="Email address" type="email" value={email} onChange={setEmail} required /><div><AuthInput label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={setPassword} required showPassword={showPassword} onTogglePassword={() => setShowPassword((visible) => !visible)} /><button type="button" onClick={() => { setShowReset((visible) => !visible); setResetMessage(''); setResetError(''); }} className="mt-2 text-xs font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300">{showReset ? 'Cancel password reset' : 'Forgot password?'}</button></div>{showReset && <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 dark:border-cyan-900/60 dark:bg-cyan-950/30"><p className="text-xs leading-5 text-slate-600 dark:text-slate-400">We will send a reset link to the email address above.</p><button type="button" onClick={handlePasswordReset} disabled={resetLoading} className="mt-3 w-full rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-cyan-800 dark:bg-slate-900 dark:text-cyan-300 dark:hover:bg-cyan-950/50">{resetLoading ? 'Sending reset email...' : 'Send reset email'}</button>{resetMessage && <p className="mt-3 text-xs font-medium text-teal-600 dark:text-teal-300" role="status">{resetMessage}</p>}{resetError && <p className="mt-3 text-xs font-medium text-danger-600 dark:text-danger-300" role="alert">{resetError}</p>}</div>}{error && <p className="rounded-xl bg-danger-50 px-3 py-2 text-sm text-danger-600 dark:bg-danger-500/10 dark:text-danger-300" role="alert">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:from-blue-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button></form><div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500"><ShieldCheck className="h-4 w-4 text-teal-500" /> Secure account access</div><p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">New to AquaSolar? <Link className="font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300" to="/signup">Create an account</Link></p></AuthLayout>;
}

function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-cyan-700 to-teal-800 px-5 py-10"><div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" /><div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" /><div className="absolute bottom-0 left-0 h-24 w-full bg-white/10 [clip-path:ellipse(75%_60%_at_50%_100%)]" /><div className="absolute bottom-0 left-0 h-14 w-full bg-white/10 [clip-path:ellipse(65%_55%_at_20%_100%)]" /><section className="relative w-full max-w-md rounded-[2rem] border border-white/40 bg-white/95 p-7 shadow-2xl shadow-slate-950/25 backdrop-blur-xl dark:bg-slate-950/90 sm:p-9">{children}</section></main>;
}

function AuthInput({ label, type, value, onChange, required, showPassword, onTogglePassword }: { label: string; type: string; value: string; onChange: (value: string) => void; required?: boolean; showPassword?: boolean; onTogglePassword?: () => void }) {
  return <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}<span className="relative mt-2 block"><input className="w-full rounded-xl border-0 bg-slate-100/80 px-4 py-3.5 pr-12 text-slate-900 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500 dark:bg-slate-900/80 dark:text-white dark:ring-slate-700" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />{onTogglePassword && <button type="button" onClick={onTogglePassword} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-cyan-500 dark:text-slate-500 dark:hover:text-cyan-300">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>}</span></label>;
}
