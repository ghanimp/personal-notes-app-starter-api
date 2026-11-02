import NoteItem from './NoteItem';

export default function NoteList({ notes, emptyMessage }) {
  if (notes.length === 0) {
    return <div className="notes-list-empty"><p>{emptyMessage}</p></div>;
  }
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}