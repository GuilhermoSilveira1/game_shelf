import express from 'express';
import { registrarUsuario, realizarLogin, logout } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register é a rota para registrar um novo usuário
router.post('/register', registrarUsuario);
// POST /auth/logout é a rota para fazer logout do sistema
router.post("/logout", logout);
// POST /auth é a rota para fazer login
router.post('/', realizarLogin);

export default router;
