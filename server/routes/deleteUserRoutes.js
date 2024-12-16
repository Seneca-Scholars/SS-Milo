import express from 'express';
import { deleteUserController } from '../controllers/deleteUserController.js';

const router = express.Router();

router.delete('/:id', deleteUserController);

export default router;