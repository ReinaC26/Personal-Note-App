import { useState } from 'react';

export default function EditModal({ note, colorKey, onClose, onSave }) {
  const [draft, setDraft] = useState({ ...note });

  function handleSave() {
    onSave(draft);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e)=> e.stopPropagation()}>
        <div className="modal-row">
          <input className="input title" value={draft.title} onChange={(e)=>setDraft({...draft, title: e.target.value})} />
          <div className="color_key">
            {colorKey.map(p => (
              <button key={p.key} className={`small-color ${draft.color === p.key ? 'active' : ''}`}
                style={{ background: p.bg }}
                onClick={() => setDraft({ ...draft, color: p.key })}
              />
            ))}
          </div>
        </div>

        <textarea className="textarea" value={draft.content} onChange={(e)=>setDraft({...draft, content: e.target.value})} />
        <div className="modal-actions">
          <button className="button" onClick={handleSave}>Save</button>
          <button className="button close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}