import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';

export default function NoteItem({ note }) {
  return (
    <Link to={`/notes/${note.id}`} className="note-item">
      <h3 className="note-item__title">{note.title}</h3>
      <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="note-item__body">{note.body}</p>
    </Link>
  );
}