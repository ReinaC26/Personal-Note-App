import { useEffect, useState } from 'react';
import { listNotes, createNote, updateNote, deleteNote } from './api';
import ColorSidebar from './components/ColorSidebar';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import NotesGrid from './components/NotesGrid';
import EditModal from './components/EditModal';


const color_key = [
  { key: 'yellow',   bg: '#FAEDCB' },
  { key: 'green',   bg: '#C9E4DF' },
  { key: 'blue',  bg: '#C5DEF2' },
  { key: 'purple',   bg: '#DBCDF0' },
  { key: 'pink',  bg: '#F2C6DF' },
  { key: 'orange',bg: '#F8D9C4' }
];

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterColor, setFilterColor] = useState('all');
  const [editing, setEditing] = useState(null);

  async function refresh() {
    try {
      const q = {};
      if (search) q.search = search;
      if (filterColor && filterColor !== 'all') q.color = filterColor;
      const data = await listNotes(q);
      setNotes(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load notes');
    }
  }

  useEffect(() => { refresh(); }, [search, filterColor]);

  async function handleCreateWithColor(colorKey) {
    try {
      const n = await createNote({ title: 'Untitled', content: '', color: colorKey });
      await refresh();
      setEditing(n);
    } catch (err) { console.error(err); alert('Create failed'); }
  }

  async function handleSave(updated) {
    try {
      await updateNote(updated._id, { title: updated.title, content: updated.content, color: updated.color });
      setEditing(null);
      await refresh();
    } catch (err) { console.error(err); alert('Save failed'); }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this note?')) {
      return;
    }
    try {
      setNotes(notes.filter((note) => note._id !== id));
      if (editing && editing._id === id) {
        setEditing(null);
      }
      await deleteNote(id);
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
      await refresh();
    }
  }

  return (
      <div className="container">
        <ColorSidebar colorKey={color_key} onCreate={handleCreateWithColor} />
        <div className="main-area">
          <div className="top-bar">
            <FilterBar 
              onFilter={setFilterColor} 
              filterColor={filterColor} 
              colorKey={color_key} 
            />
            <SearchBar onSearch={setSearch} />
          </div>
        
        <div className="notes-scroll-container">
          <NotesGrid notes={notes} onEdit={setEditing} onDelete={handleDelete} />
        </div>
      </div>
      {editing && (
        <EditModal
          note={editing}
          colorKey={color_key}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
