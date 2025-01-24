import express from 'express';
import { createUserWithProfileTransactionallyController } from '../controllers/createUserWithProfileTransactionallyController.js'


const router = express.Router();

router.post('/transaction', createUserWithProfileTransactionallyController);

export default router;