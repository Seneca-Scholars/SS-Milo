import { db } from './dbController.js';

export const searchUser = async (query) => {
    try {
        const rows = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM Users WHERE firstName LIKE ? OR lastName LIKE ?', `%${query}%`, `%${query}%`, (err, rows) => { //selects all users whose name is like the query string 
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
               });

               if (rows.length === 0) {
                return null;
               }
    return rows;
            } catch (err) {
                console.error('err fetching users:', err);
                throw err;
            }
     }