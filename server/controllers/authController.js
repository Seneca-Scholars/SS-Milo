import bcrypt, { hash } from "bcrypt";

export async function registerUser(req, res) {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password|| !firstName || !lastName ) {
       return console.log('missing fields')
} try {

        const saltRounds = 5
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

         
            const newUser = new User(firstName, lastName, username, hashedPassword, salt);
            await User.createUser(db, newUser);
            res.json({message: 'user created succesfully'});
        } catch (error) {
            console.error('err creating user:'. error);
            res.status(500).json({error: 'err creating user'});
        }
    }

