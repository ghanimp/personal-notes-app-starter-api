import { Link } from 'react-router-dom';
import { useLocale } from '../contexts/LocaleContext';

export default function NotFoundPage() {
  const { t } = useLocale();
  return (
    <div className="empty-state" style={{ paddingTop: '100px' }}>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/" className="btn btn--primary">{t('back')}</Link>
    </div>
  );
}