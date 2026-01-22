import * as authService from '../services/authService.js';
import bcrypt from 'bcryptjs';

export async function registrarUsuario(req, res) {
  const { username, email, password } = req.body;

  try {
    // Validações básicas
    if (!username || !email || !password) {
      return res.status(400).json({ mensagem: 'username, email e password são obrigatórios.' });
    }

    const usernameNormalizado = String(username).trim();
    const emailNormalizado = String(email).trim().toLowerCase();

    // Checar se o usuário ou email já existem
    const emailExistente = await authService.encontrarEmail(emailNormalizado);
    if (emailExistente) {
      return res.status(409).json({ mensagem: 'email já cadastrado' });
    }

    const usuarioExistente = await authService.encontrarUsername(usernameNormalizado);
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'username já existente' });
    }

    // Hash de senha
    const senhaHash = await bcrypt.hash(password, 10);

    // Salvar novo usuário
    const usuarioSalvo = await authService.criarUsuario({
      username: usernameNormalizado,
      email: emailNormalizado,
      senhaHash
    });

    return res.status(201).json(usuarioSalvo);
  } catch (err) {
    // Tratamento de erro de unicidade (caso corra uma corrida entre checagem e insert)
    if (err?.code === 'P2002') {
      // Prisma unique constraint violation
      return res.status(409).json({
        mensagem: `Conflito de unicidade em: ${err?.meta?.target?.join(', ') || 'campo único'}`
      });
    }

    console.error('Erro em registrarUsuario:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao registrar usuário.' });
  }
}