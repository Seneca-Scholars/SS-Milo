import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
const { firstName, lastName, username } = req.user;
res.json({ user: req.user});

    res.json({
        message: `entered dash, ${username}!`,
        user: {firstName, lastName, username}
    });
});



export default router; 