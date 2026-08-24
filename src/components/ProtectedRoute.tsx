import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '@/firebase';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setLoading(false);
  }), []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/" replace />;
}
