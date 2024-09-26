function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const jwt = require ('jsonwebtoken')
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.json({ message: 'Token expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.json({ message: 'Invalid token' });
      } else {
        return res.json({ message: 'Internal server error' });
      }
    }
  }

module.exports = authenticateToken;