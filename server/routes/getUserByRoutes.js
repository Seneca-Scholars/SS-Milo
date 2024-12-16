import express from 'express';
import { getUserByIdController } from '../controllers/getUserByController.js';
import { getUserByUsernameController } from '../controllers/getUserByController.js';
const router = express.Router();

router.get('/:id', getUserByIdController);
router.get('/username/:username', getUserByUsernameController); 


export default router;
