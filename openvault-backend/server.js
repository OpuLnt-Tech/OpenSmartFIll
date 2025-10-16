// This is the server, This is the starting point for the backend. 
// This is used 

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory DB
const db = {};

// Test endpoint
app.get('/', (req, res) => {
  res.send('Local backend is running 🚀');
});

// Backup endpoint (POST)
app.post('/backup/:uid/:docId', (req, res) => {
  const { uid, docId } = req.params;
  if (!db[uid]) db[uid] = {};
  db[uid][docId] = req.body;
  res.json({ ok: true, stored: db[uid][docId] });
});

// Restore endpoint (GET)
app.get('/restore/:uid', (req, res) => {
  const { uid } = req.params;
  res.json(db[uid] || {});
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Local backend running on http://localhost:${PORT}`));



// So the basic structure is '/users/:uid/vault/:docId'. check and keep this in mind. 