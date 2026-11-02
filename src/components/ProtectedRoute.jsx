import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { authedUser, initializing } = useAuth();

  if (initializing) return <div className="spinner">Loading...</div>;
  if (!authedUser) return <Navigate to="/login" replace />;

  return children;
}