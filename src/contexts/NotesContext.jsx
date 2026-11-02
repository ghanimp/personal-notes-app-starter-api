import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as api from '../utils/api';
import { useAuth } from './AuthContext';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const { authedUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!authedUser) return;
    setLoading(true);
    try {
      const [active, archived] = await Promise.all([
        api.getNotes(),
        api.getArchivedNotes(),
      ]);
      setNotes(active);
      setArchivedNotes(archived);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, [authedUser]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (data) => {
    await api.addNote(data);
    await fetchNotes();
  };

  const deleteNote = async (id) => {
    await api.deleteNote(id);
    await fetchNotes();
  };

  const archiveNote = async (id) => {
    await api.archiveNote(id);
    await fetchNotes();
  };

  const unarchiveNote = async (id) => {
    await api.unarchiveNote(id);
    await fetchNotes();
  };

  return (
    <NotesContext.Provider
      value={{ notes, archivedNotes, loading, addNote, deleteNote, archiveNote, unarchiveNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}