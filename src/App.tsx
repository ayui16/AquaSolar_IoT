import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import Charts from '@/pages/Charts';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import SignUp from '@/pages/SignUp';
import Settings from '@/pages/Settings';

export default function App() {
  const protectedView = (element: React.ReactNode) => <ProtectedRoute>{element}</ProtectedRoute>;

  return <BrowserRouter><Routes><Route path="/" element={<Login />} /><Route path="/login" element={<Login />} /><Route path="/signup" element={<SignUp />} /><Route path="/dashboard" element={protectedView(<Dashboard />)} /><Route path="/dashboard/charts" element={protectedView(<Charts />)} /><Route path="/dashboard/settings" element={protectedView(<Settings />)} /><Route path="/dashboard/profile" element={protectedView(<Profile />)} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes></BrowserRouter>;
}
