import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv'; 

import db from '../prismaInit.js';
dotenv.config();


 export const authMiddleware = async (req, res, next) => {
  try {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: ' no token ' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await db.users.findUnique({
    where: { id: decoded.userId },
  });
    if (!user) {
      return res.status(401).json({ message: 'invalid token' });
    }
    req.user = user; 
    next(); 

  } catch (err) {
    console.error('auth error:', err.message);
    res.status(401).json({ message: '401 token' });
  }
};
export default authMiddleware;

