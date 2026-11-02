import { Link } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { useLocale } from '../contexts/LocaleContext';
import NoteList from '../components/NoteList';

export default function HomePage() {
  const { notes, loading } = useNotes();
  const { t } = useLocale();

  if (loading) return <div className="spinner">⏳ {t('loading')}</div>;

  return (
    <div className="page">
      <div className="homepage__header">
        <h2>{t('home')}</h2>
        <Link to="/notes/new" className="btn btn--primary">+ {t('newNote')}</Link>
      </div>
      <NoteList notes={notes} emptyMessage={t('emptyActive')} />
    </div>
  );
}