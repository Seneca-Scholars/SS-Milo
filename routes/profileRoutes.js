import express from 'express';
import { createProfileController, getProfileByUserIdController } from '../controllers/profileController.js';

const router = express.Router();

router.post('/', createProfileController); 
router.get('/:userId', getProfileByUserIdController);

export default router;