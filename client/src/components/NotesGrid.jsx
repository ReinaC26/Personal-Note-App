import NoteCard from './NoteCard';

export default function NotesGrid({ notes, onEdit, onDelete }) {
  return (
    <div className="notes-grid">
      {notes.map(n => (
        <NoteCard note={n} key={n._id} onEdit={() => onEdit(n)} onDelete={() => onDelete(n._id)} />
      ))}
      {notes.length === 0 && <div className="empty">Click on the left to add note.</div>}
    </div>
  );
}