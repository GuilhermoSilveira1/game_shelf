import { Router } from 'express';
import { listarUsuarios } from '../controllers/profileController.js';

const router = Router();

router.get('/users', listarUsuarios);

export default router;
