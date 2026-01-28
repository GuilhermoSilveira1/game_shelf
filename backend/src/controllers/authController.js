import * as authService from '../services/authService.js';
import bcrypt from 'bcryptjs';

// Função que verifica se o email ou username já existe, e registra um novo usuário
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

export async function realizarLogin(req, res) {
  const { emailUsername, password } = req.body;

  try {
    // Validações básicas
    if (!emailUsername || !password) {
      return res.status(400).json({ mensagem: 'username ou email e password são obrigatórios.' });
    }

    //Normalizando email ou username e a senha.
    const emailUsernameNormalizado = String(emailUsername).trim();
    const senhaNormalizada = String(password).trim();
    // Hash de senha
    const senhaHash = await bcrypt.hash(senhaNormalizada, 10);

    // Checar se o usuário ou email já existem
    const emailExistente = await authService.encontrarEmail(emailUsernameNormalizado);

    // Se o email existe, valida a senha
    if (emailExistente) {
      // service valida a senha, e retorna true or false
      const senhaBanco = await authService.validarSenha(emailUsernameNormalizado, senhaHash);
      if (senhaBanco == true) {
        // Se o email existe, e a senha está correta, retorna um JWT
        return res.status(200).json({ mensagem: 'Usuário autenticado com sucesso' })
      } else {
        // Caso a função retorne false, retorna erro e pede nova senha
        return res.status(422).json({ mensagem: 'Senha incorreta, favor tentar novamente '})
      }
    } else {
      // Se o email não existe, valida o username, e depois a senha
      const usuarioExistente = await authService.encontrarUsername(emailUsernameNormalizado);
      if (usuarioExistente) {
        const senhaBanco = await authService.validarSenha(emailUsernameNormalizado, senhaHash);
        if (senhaBanco == true) {
          // Se o email existe, e a senha está correta, retorna um JWT
          return res.status(200).json({ mensagem: 'Usuário autenticado com sucesso' })
        } else {
          // Caso a função retorne false, retorna erro e pede nova senha
          return res.status(422).json({ mensagem: 'Senha incorreta, favor tentar novamente '})
        }
      }
    }

  } catch (err) {
    // Tratamento de erro de unicidade (caso corra uma corrida entre checagem e insert)
    if (err?.code === 'P2002') {
      // Prisma unique constraint violation
      return res.status(409).json({
        mensagem: `Conflito de unicidade em: ${err?.meta?.target?.join(', ') || 'campo único'}`
      });
    }

    console.error('Erro em autenticar o usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao autenticar usuário.' });
  }
}