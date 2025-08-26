const { Schema, model } = require('mongoose');

const COLORS = ['blue','pink','yellow','purple','orange','green'];

const NoteSchema = new Schema(
  {
    title:   { type: String, default: 'Untitled' },
    content: { type: String, default: '' },
    archived:{ type: Boolean, default: false },
    color:   { type: String, enum: COLORS, default: 'blue' }
  },
  { timestamps: true }
);

const Note = model('Note', NoteSchema);
module.exports = Note;
module.exports.COLORS = COLORS;