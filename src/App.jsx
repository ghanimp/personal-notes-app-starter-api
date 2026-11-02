import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotesProvider } from './contexts/NotesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <NotesProvider>
            <div className="app-container">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/archived" element={<ProtectedRoute><ArchivePage /></ProtectedRoute>} />
                  <Route path="/notes/new" element={<ProtectedRoute><AddNotePage /></ProtectedRoute>} />
                  <Route path="/notes/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </NotesProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}