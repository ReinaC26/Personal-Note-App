function formatDate(dstr) {
    if (!dstr) return '';
    const d = new Date(dstr);
    return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
  }
  
  export default function NoteCard({ note, onEdit, onDelete }) {
    const bg = {
      yellow: '#FAEDCB',
      green: '#C9E4DF',
      blue: '#C5DEF2',
      purple: '#DBCDF0',
      pink: '#F2C6DF',
      orange: '#F8D9C4'
    }[note.color || 'blue'];
  
    return (
      <div className="note-card" style={{ background: bg }}>
        <button className="delete-x" onClick={(e) => { e.stopPropagation(); onDelete(); }}>✕</button>
        <div className="note-title" onClick={onEdit}>{note.title || 'Untitled'}</div>
        <div className="note-content" onClick={onEdit}>
          {note.content || <i>Text</i>}
        </div>
        <div className="note-time">{formatDate(note.createdAt || note.updatedAt)}</div>
      </div>
    );
  }