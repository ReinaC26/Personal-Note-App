const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://personal-note-app-nhzu.onrender.com/api';

async function req(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text()}`);
  }

  if (res.status === 204) {
    return null; 
  }

  return res.json();
}

export const listNotes = (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return req(`/notes${q ? `?${q}` : ''}`);
};

export const getNote = (id) => req(`/notes/${id}`);

export const createNote = (payload = {}) => req('/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const updateNote = (id, payload = {}) => req(`/notes/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

export const deleteNote = (id) => req(`/notes/${id}`, { method: 'DELETE' });