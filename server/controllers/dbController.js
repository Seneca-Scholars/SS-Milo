import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./mydb.db');

export async function initializeDatabase() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT) `, (err) => {
       if (err) {
          reject(err);
       } else {
          console.log('database schema intialized ');
          resolve();
       }
       });
    });
}

export async function insertDummyData (){
    await new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name) VALUES (?)', [user.name], (err, row) => { // iserts new row into the users table
      if (err){
            reject(err);
          } else {
            console.log('user was inserted', user.name);
            resolve();
           } 
         });
        });
      }