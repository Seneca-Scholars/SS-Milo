export default class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    private passwordHash: string; 
  
    constructor(
      id: number, 
      firstName: string, 
      lastName: string, 
      username: string, 
      passwordHash?: string 
    ) 
  }