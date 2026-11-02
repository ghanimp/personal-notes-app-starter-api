import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import { useLocale } from '../contexts/LocaleContext';

export default function RegisterPage() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      alert('Registrasi berhasil, silakan login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>{t('register')}</h2>
      {error && <p className="form-error">{error}</p>}
      
      <form onSubmit={handleRegister} className="auth-form">
        <label>{t('name')}</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
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
          minLength={8} 
        />
        
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Loading...' : t('register')}
        </button>
      </form>

      <p className="auth-link">
        {t('haveAccount')}{' '}
        <Link to="/login">
          <strong>{t('loginHere')}</strong>
        </Link>
      </p>
    </div>
  );
}