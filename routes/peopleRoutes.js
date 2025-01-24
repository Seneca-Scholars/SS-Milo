import express from 'express';
import { searchUserController } from '../controllers/peopleController.js';

const router = express.Router();

router.get('/search', searchUserController); 

export default router;
