import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { showFormattedDate } from '../utils/index';
import { useLocale } from '../contexts/LocaleContext';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await getNote(id);
        setNote(data);
      } catch (err) {
        alert(err.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Yakin ingin menghapus catatan ini?')) {
      await deleteNote(id);
      navigate('/');
    }
  };

  const handleToggleArchive = async () => {
    if (note.archived) {
      await unarchiveNote(id);
      setNote({ ...note, archived: false });
    } else {
      await archiveNote(id);
      setNote({ ...note, archived: true });
    }
  };

  if (loading) return <div className="spinner">⏳ Loading...</div>;
  if (!note) return null;

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-button">← {t('back')}</button>
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
        {note.archived && <span className="detail-page__badge">Arsip</span>}
      </p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__actions">
        <button className="btn btn--outline" onClick={handleToggleArchive}>
          {note.archived ? t('unarchiveBtn') : t('archiveBtn')}
        </button>
        <button className="btn btn--danger" onClick={handleDelete}>
          {t('delete')}
        </button>
      </div>
    </div>
  );
}