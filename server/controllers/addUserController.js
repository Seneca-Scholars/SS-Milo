import { db } from "./dbController.js";

export const addUser = {
    create: async ( firstName, lastName) => {
        console.log('mm:', firstName, lastName);
        try {
            const result = await new Promise ((resolve, reject) => {
        db.run(
            'INSERT INTO Users (firstName, lastName) VALUES (?, ?)',
            [firstName, lastName],
              (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
    return result;
} catch (err){
 console.error("err inserting:", err);
 throw err;
}
},
};
                             