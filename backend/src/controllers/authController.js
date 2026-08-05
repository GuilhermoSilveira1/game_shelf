import * as authService from '../services/authService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// POST /auth (login)
export async function realizarLogin(req, res) {
  try {
    const { identifier, password } = req.body ?? {};

    if (!identifier || !password) {
      return res.status(400).json({
        mensagem: 'identifier e password são obrigatórios.',
      });
    }

    if (
      typeof identifier !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        mensagem: 'identifier e password devem ser textos.',
      });
    }

    const identifierNormalizado = identifier.trim();

    if (!identifierNormalizado || !password.trim()) {
      return res.status(400).json({
        mensagem: 'identifier e password não podem ser vazios.',
      });
    }

    const isEmail = identifierNormalizado.includes('@');

    const user = isEmail
      ? await authService.buscarUsuarioPorEmail(
          identifierNormalizado.toLowerCase()
        )
      : await authService.buscarUsuarioPorUsername(
          identifierNormalizado
        );

    if (!user) {
      return res.status(401).json({
        mensagem: 'Credenciais inválidas.',
      });
    }

    const senhaConfere = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!senhaConfere) {
      return res.status(401).json({
        mensagem: 'Credenciais inválidas.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    const isProduction =
      process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Erro no login:', err);

    return res.status(500).json({
      mensagem: 'Erro interno ao efetuar login.',
    });
  }
}

// Função que verifica se o email ou username já existe, e registra um novo usuário
export async function registrarUsuario(req, res) {
  try {
    const { email, username, password } = req.body ?? {};

    if (!username || !email || !password) {
      return res.status(400).json({
        mensagem: 'username, email e password são obrigatórios.',
      });
    }

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        mensagem: 'username, email e password devem ser textos.',
      });
    }

    const usernameNormalizado = username.trim();
    const emailNormalizado = email.trim().toLowerCase();

    if (!usernameNormalizado || !emailNormalizado || !password.trim()) {
      return res.status(400).json({
        mensagem: 'username, email e password não podem ser vazios.',
      });
    }

    const emailExistente =
      await authService.encontrarEmail(emailNormalizado);

    if (emailExistente) {
      return res.status(409).json({
        mensagem: 'E-mail já cadastrado.',
      });
    }

    const usuarioExistente =
      await authService.encontrarUsername(usernameNormalizado);

    if (usuarioExistente) {
      return res.status(409).json({
        mensagem: 'Username já cadastrado.',
      });
    }

    const senhaHash = await bcrypt.hash(password, 10);

    const usuarioSalvo = await authService.criarUsuario({
      username: usernameNormalizado,
      email: emailNormalizado,
      senhaHash,
    });

    return res.status(201).json(usuarioSalvo);
  } catch (err) {
    if (err?.code === 'P2002') {
      return res.status(409).json({
        mensagem: 'E-mail ou username já cadastrado.',
      });
    }

    console.error('Erro em registrarUsuario:', err);

    return res.status(500).json({
      mensagem: 'Erro interno ao registrar usuário.',
    });
  }
}

// Função para realizar o logout do sistema.
export function logout(req, res) {
  const isProduction =
    process.env.NODE_ENV === 'production';

  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });

  return res.status(200).json({
    mensagem: 'Logout realizado',
  });
}