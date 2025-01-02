import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv'; 

dotenv.config();


 export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: ' no token ' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('authentication err', err.message);
  }
};

export default authMiddleware;

