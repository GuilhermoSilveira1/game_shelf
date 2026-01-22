import express from 'express';
import { registrarUsuario } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register
router.post('/register', registrarUsuario);

export default router;
