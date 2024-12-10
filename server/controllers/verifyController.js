import jwt from 'jsonwebtoken';
 
export function authenticateToken(req, res, next) {
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(
        ' '
    )[1];

    if (token == null) return 



    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return console.log('err verifying token', err);
        req.user = user;
        next();
    });
}

export const verifyRoute = async (req, res) => {
    if (req.user) { 
    res.json({ message: 'token valid' }); 
} else {
    res.sendStatus(401); 
  }
  };
  
