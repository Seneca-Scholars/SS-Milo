import bcrypt from 'bcrypt';

async function generateSalt() {
  const saltRounds = 7; 
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
}

async function hashPassword(password, salt) {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export class User {
  constructor(id, firstName, lastName, username, passwordHash, salt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.passwordHash = passwordHash;
    this.salt = salt;
  }

 } 
 
 export async function createUser(db, username, password, firstName, lastName) {
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    try {
      const userId = await insertUser(db, username, hashedPassword, firstName, lastName);
      return userId; 
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }
//     return new User(userId, firstName, lastName, username, hashedPassword, salt);
  

//   get fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }

