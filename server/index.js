import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database('./mydb.db',);

app.use(cors());

//will initailize the db schema if it doesn't exist
//https://www.youtube.com/watch?v=670f71LTWpM
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT) `, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('connection established & tables created.');
        resolve();
      }
    });
  });
};

//function to add dummy data
async function insertDummyData() {
  const dummyUsers = [
    { "name": "John Doe" },
    { "name": "Jane Doe" },
    { "name": "Michael Johnson" },
    { "name": "Emily Davis" },
    { "name": "David Wilson" },
    { "name": "Sarah Miller" },
    { "name": "William Brown" },
    { "name": "Jennifer Taylor" },
    { "name": "Thomas Anderson" },
    { "name": "Olivia Martinez" },
    { "name": "James Thomas" },
    { "name": "Elizabeth Garcia" },
    { "name": "Robert Lee" },
    { "name": "Maria Rodriguez" },
    { "name": "Joseph Williams" },
    { "name": "Linda Davis" },
    { "name": "Richard Hall" },
    { "name": "Barbara Jones" },
    { "name": "Charles Wright" },
    { "name": "Susan Moore" },
    { "name": "Peter Lewis" },
    { "name": "Karen Clark" },
    { "name": "Paul Baker" },
    { "name": "Betty Allen" },
    { "name": "Mark Harris" },
    { "name": "Nicole Nelson" },
    { "name": "George King" },
    { "name": "Patricia Walker" },
    { "name": "Steven Green" },
    { "name": "Donna Adams" },
    { "name": "Ronald Scott" },
    { "name": "Carol Lopez" },
    { "name": "Eric Mitchell" },
    { "name": "Dorothy Hernandez" },
    { "name": "Kenneth Nelson" },
    { "name": "Cynthia Morales" },
    { "name": "Gary Parker" },
    { "name": "Melissa Robinson" },
    { "name": "Timothy Hall" },
    { "name": "Sarah Cruz" },
    { "name": "Daniel Wood" },
    { "name": "Christina Murphy" },
    { "name": "Paul Davis" },
    { "name": "Donna Taylor" },
    { "name": "Joseph Campbell" },
    { "name": "Karen Nelson" },
    { "name": "Richard Mitchell" },
    { "name": "Susan Martinez" },
    { "name": "James Harris" },
    { "name": "Elizabeth Rivera" },
    { "name": "Robert King" },
    { "name": "Patricia Young" },
    { "name": "Charles Phillips" },
    { "name": "Linda Patterson" },
    { "name": "David Sanchez" },
    { "name": "Melissa Torres" },
    { "name": "George Ramirez" },
    { "name": "Donna Scott" },
    { "name": "Eric Perez" },
    { "name": "Carol Phillips" },
    { "name": "Kenneth Jackson" },
    { "name": "Cynthia Lopez" },
    { "name": "Gary Harris" },
    { "name": "Melissa Campbell" },
    { "name": "Daniel Moore" },
    { "name": "Donna Cruz" },
    { "name": "Joseph Rivera" },
    { "name": "Karen Martinez" },
    { "name": "Richard Davis" },
    { "name": "Susan Mitchell" },
    { "name": "James Harris" },
    { "name": "Elizabeth Nelson" },
    { "name": "Robert Taylor" },
    { "name": "Patricia King" },
    { "name": "Charles Moore" },
    { "name": "Linda Anderson" },
    { "name": "David Lewis" },
    { "name": "Melissa Walker" },
    { "name": "George Harris" },
    { "name": "Donna Campbell" },
    { "name": "Eric Davis" },
    { "name": "Carol Mitchell" },
    { "name": "Kenneth Moore" },
    { "name": "Cynthia Harris" },
    { "name": "Gary Taylor" },
    { "name": "Melissa Anderson" },
    { "name": "Daniel Lewis" },
    { "name": "Donna Walker" },
    { "name": "Joseph Harris" },
    { "name": "Karen Campbell" },
    { "name": "Richard Moore" },
    { "name": "Susan Davis" },
    { "name": "James Mitchell" },
    { "name": "Elizabeth Harris" },
    { "name": "Robert Taylor" },
    { "name": "Patricia Anderson" },
    { "name": "Charles Lewis" },
    { "name": "Linda Walker" },
    { "name": "David Harris" },
    { "name": "Melissa Campbell" },
    { "name": "Nadia Patel" }
  ];

  for (const user of dummyUsers) {
    console.log('inserting data:', user);
  const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE name = ?', [user.name], (err, row) => { // selects all columns from the table where the "name" column matches the name retrieved
        if (err) {
          reject(err);
        } else {
          resolve(row);
        } 
      });
    });

if (!existingUser) {
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
  }
}

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