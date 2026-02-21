import * as authService from '../services/authService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// POST /auth (login)
export async function realizarLogin(req, res) {
  try {
    const { email, username, password } = req.body || {};
    if ((!email && !username) || !password) {
      return res.status(400).json({ mensagem: 'Forneça email ou username, e password.' });
    }

    const emailNorm = email ? String(email).trim().toLowerCase() : null;
    const usernameNorm = username ? String(username).trim() : null;

    // Busca usuário
    const user = emailNorm
      ? await authService.buscarUsuarioPorEmail(emailNorm)
      : await authService.buscarUsuarioPorUsername(usernameNorm);

    // Mensagem genérica
    if (!user) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // Comparar senha com hash do banco
    const confere = await bcrypt.compare(password, user.passwordHash);
    if (!confere) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // Gera JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // --- setar cookie httpOnly ---
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,        // true em produção (HTTPS)
      sameSite: 'lax',       // ajuste para 'strict' se quiser mais proteção
      maxAge: 60 * 60 * 1000 // 1h
    });

    // Retornando JWT em json para facilitar testes e integrações simples
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao efetuar login.' });
  }
}

// Função que verifica se o email ou username já existe, e registra um novo usuário
export async function registrarUsuario(req, res) {
  const { email, username, password } = req.body;

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
