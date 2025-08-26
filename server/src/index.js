require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});