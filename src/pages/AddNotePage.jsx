import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { useLocale } from '../contexts/LocaleContext';

export default function AddNotePage() {
  const { addNote } = useNotes();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Judul dan isi tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      await addNote({ title, body });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="back-button">← {t('back')}</button>
      <form onSubmit={onSubmit} className="add-new-page__form">
        <div className="add-new-page__input">
          <input
            type="text"
            className="add-new-page__input__title"
            placeholder={t('titlePlaceholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <textarea
            className="add-new-page__input__body"
            placeholder={t('bodyPlaceholder')}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="add-new-page__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)} disabled={loading}>
            {t('cancel')}
          </button>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Loading...' : t('save')}
          </button>
        </div>
      </form>
    </div>
  );
}