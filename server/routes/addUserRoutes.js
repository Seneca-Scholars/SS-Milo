import express from 'express';
import { addUserController } from '../controllers/addUserController.js';

const router = express.Router();

router.post('/add-user', addUserController);

export default router;