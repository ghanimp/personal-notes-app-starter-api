import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>{t('login')}</h2>
      {error && <p className="form-error">{error}</p>}
      
      <form onSubmit={handleLogin} className="auth-form">
        <label>{t('email')}</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label>{t('password')}</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Loading...' : t('login')}
        </button>
      </form>

      <p className="auth-link">
        {t('noAccount')}{' '}
        <Link to="/register">
          <strong>{t('registerHere')}</strong>
        </Link>
      </p>
    </div>
  );
}