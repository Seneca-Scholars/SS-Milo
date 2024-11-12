import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import {initializeDatabase, insertDummyData } from './controllers.js';

const app = express();
const db = new sqlite3.Database('./mydb.db')

app.use(cors());


//this wraps the entire code in a async func (iife https://www.youtube.com/watch?v=8GDk8sj0YgQ)
(async () => {
    try {
      await initializeDatabase();
      await insertDummyData();
  
      app.get('/search', async (req, res) => {
        const query = req.query.q; 
        try {
          const rows = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE name LIKE ?', `%${query}%`, (err, rows) => { //selects all users whose name is like the query string 
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
                 });
  
          res.json(rows); 
            } 
            catch (err) {
     console.error('there was an error fetching users:', err);
        }
      });
  
      app.listen(3000, () => console.log(' listening on 3000'));
    } catch (err) {
      console.error('database could not be initialized ', err);
      process.exit(1);
    }
  })();