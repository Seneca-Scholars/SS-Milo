export default class User {
   constructor(id, firstName, lastName, username, passwordHash, ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.passwordHash = passwordHash;
  }

   get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
