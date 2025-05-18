const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://22pa5a0515:22pa5a0515@cluster0.v5cwerr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Document = mongoose.model('Document', new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
}));

const Chunk = mongoose.model('Chunk', new mongoose.Schema({
  documentId: mongoose.Schema.Types.ObjectId,
  chunkNumber: Number,
  content: String,
  headings: [String],
}));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file || path.extname(file.originalname) !== '.md') {
    return res.status(400).json({ message: 'Only .md files allowed' });
  }

  const lines = fs.readFileSync(file.path, 'utf-8').split('\n');
  const document = await Document.create({ name: file.originalname });

  let headings = [];
  let chunkCount = 1;

  for (const line of lines) {
    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      headings[level - 1] = line.trim();
      headings = headings.slice(0, level);
    } else if (line.trim().length > 0 && !line.startsWith('|')) {
      await Chunk.create({
        documentId: document._id,
        chunkNumber: chunkCount++,
        content: `${headings.join('\n')}\n${line}`,
        headings: [...headings],
      });
    }
  }

  res.json({ message: 'Uploaded & processed', documentId: document._id });
});

app.get('/api/documents', async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
});

app.get('/api/documents/:id/chunks', async (req, res) => {
  const chunks = await Chunk.find({ documentId: req.params.id }).sort('chunkNumber');
  res.json(chunks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
