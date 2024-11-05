import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('./mydb.db',
   console.log('connection established.')
);

db.run(`
 CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT) `, (err) => {
  if (err) {
    console.error('table couldnt be created:', err.message);
  } else {
    console.log('table was created.');
  }
});

app.get('/search', (req, res) => {
  const query = req.query.q;

db.all('SELECT * FROM users WHERE name LIKE ?', `%${query}%`, (err, rows) => {
  if (err) {
  console.log(err);
res.status(500).json({ error: 'internal error' });
  } else { 
     res.json(rows)
    }
  });

  res.json({ message: 'search logic to be added' }); 
});
