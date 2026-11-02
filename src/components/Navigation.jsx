import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';

const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`;

export default function Navigation() {
  const { authedUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          Catatan Pribadi
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={toggleTheme} className="toggle-btn" title="Ubah Tema">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={toggleLocale} className="toggle-btn" title="Ubah Bahasa">
            {locale.toUpperCase()}
          </button>

          {authedUser && (
            <>
              <nav className="navbar__nav">
                <NavLink to="/" end className={navLinkClass}>{t('home')}</NavLink>
                <NavLink to="/archived" className={navLinkClass}>{t('archive')}</NavLink>
                <NavLink to="/notes/new" className="btn btn--primary navbar__cta">{t('newNote')}</NavLink>
              </nav>
              <div className="user-info">
                <span>{authedUser.name}</span>
                <button onClick={handleLogout} className="btn btn--danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  {t('logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}