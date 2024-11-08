import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database('./mydb.db',
   console.log('connection established.')
);
app.use(cors());

//will initailize the db schema if it doesn't exist
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('connection established & tables created.');
        resolve();
      }
    });
  });
}
//function to add dummy data
async function insertDummyData() {
  const dummyUsers = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
  ];

  for (const user of dummyUsers) {
  const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE name = ?', [user.name], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

if (!existingUser) {
  await new Promise((resolve, reject) => {
  db.run('INSERT INTO users (name) VALUES (?)', [user.name], (err, row) => {
    if (err){
          reject(err);
        } else  {
          resolve();
         } 
       });
      });
    }
  }
}

//this wraps the entire code in a async func (iife https://www.youtube.com/watch?v=8GDk8sj0YgQ)
(async () => {
  try {
    await initializeDatabase();
    await insertDummyData(); 
   
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
   });
   

    app.listen(3000, () => console.log(' listening on 3000'));
  } catch (err) {
    console.error('database could not be initialized ', err);
    process.exit(1); 
  }
})();