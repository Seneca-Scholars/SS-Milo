import { db } from './dbController.js';

export async function deleteUser(userId, deletedData) {
    if (!deleteUser) {
        return reject(new Error ('0 data for deletion'));
    }
    const firstName = deletedData?.firstName;
    const lastName =  deletedData?.lastName;

    console.log(
        'removing user with ID:', userId, 'with data', firstName, lastName
    );

    const sql = `DELETE FROM Users WHERE id = ?`;

    try {
     db.run(sql, [userId]);
        console.log('user deleted successfully.');
    } catch (error) {
        console.error('err deleting user:', error);
        throw error;
    }
}