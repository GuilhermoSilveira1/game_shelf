import * as userService from '../services/profileService.js';

export async function listarUsuarios(req, res) {
  try {
    const users = await userService.listarUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

export async function criarUsuario(req, res) {
  try {
    const user = await userService.criarUsuario(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}
