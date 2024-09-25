const db = require('../db/users.db'); 


const userService = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    // make sure all forms are filled
 if (!name || !email || password) {
  return res.json({error: 'finish.'})
 }
 //check if email exists 
 const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
 if (existingUser) {
  return res.json ({error: 'email has been registered prior.'});
 }
    const hashedPw = await bcrypt.has(password, 32);
    // assess
    await db.run('INSER INTO users (name, email, password) VALUES (?,?,?', [name, email, hashedPw]);
    
    return res.json({message: 'Welcome'});
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    // VALIDATE cred
    if (!email || !password) {
      return res.json ({ error: 'please finish '});
    }
    
    //search
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.json({error: 'something doesnt look right'})
    }
    //verify pw
    const isPwValid = await bcrypt.compare(password, user.password);
    if (!isPwValid) {
      return res.json({
error: ' something doesnt look right'});
      }
    // generate JWT token
  const token = jwt.sign({ userId: 
    user.id}, process.env.JWT_SECRET, { expiresIn:'1hr' });
    
    return res.json ({ token }); 
  }, catch (error) {
    console.error(error); 
    return res.json ({error: 'server err'});
  }
};
//   getUserProfile: async (req, res) => {
// thoughts for another time
//   }
// };

// plan to add password reset, user profile management, etc

createTable: () => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Users table created successfully.');
      }
    });
  }


module.exports = userService;
