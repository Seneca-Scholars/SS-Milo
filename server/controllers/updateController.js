import { db } from './dbController.js';

export async function updateUser(userId, updatedData) {
    const { firstName, lastName } = updatedData;

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE Users SET firstName = ?, lastName = ? WHERE id = ?`,
            [firstName, lastName, userId],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes === 1) { //checks to see if rows affected is 1, sends success if so 
                        resolve(updatedData); //return
                    } else {
                        return(null);
                    }
                }
            }
        );
    });
}