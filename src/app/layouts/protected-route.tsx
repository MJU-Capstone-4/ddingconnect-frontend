import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '@/features/auth/model/auth-state';

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}
