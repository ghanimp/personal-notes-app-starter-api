import { useNotes } from '../contexts/NotesContext';
import { useLocale } from '../contexts/LocaleContext';
import NoteList from '../components/NoteList';

export default function ArchivePage() {
  const { archivedNotes, loading } = useNotes();
  const { t } = useLocale();

  if (loading) return <div className="spinner">⏳ {t('loading')}</div>;

  return (
    <div className="page">
      <div className="homepage__header">
        <h2>{t('archive')}</h2>
      </div>
      <NoteList notes={archivedNotes} emptyMessage={t('emptyArchive')} />
    </div>
  );
}