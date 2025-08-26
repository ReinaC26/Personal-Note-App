const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

const buildQuery = (params) => {
  const q = {};
  if (params.color && params.color !== 'all') {
    q.color = params.color;
  }
  if (params.search && params.search.trim()) {
    q.$or = [
      { title: { $regex: params.search, $options: 'i' } },
      { content: { $regex: params.search, $options: 'i' } },
    ];
  }
  return q;
};

// get all notes with search and filter option
router.get('/', async (req, res, next) => {
  try {
    const query = buildQuery(req.query);
    const notes = await Note.find(query).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// get a specific note by id
router.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// post/create a new note
router.post('/', async (req, res, next) => {
  try {
    const { title, content, color } = req.body;
    const note = await Note.create({ title, content, color });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// put/update a note by id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, color } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: { title, content, color } }, { new: true });
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// delete a note by id
router.delete('/:id', async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.status(204).end(); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;