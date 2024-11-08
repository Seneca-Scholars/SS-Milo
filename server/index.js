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


