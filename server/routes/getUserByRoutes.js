import express from 'express';
import { getUserByIdController } from '../controllers/getUserByController.js';
import { getUserByUsernameController } from '../controllers/getUserByController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', getUserByIdController);
router.get('/username/:username', getUserByUsernameController); 


export default router;
