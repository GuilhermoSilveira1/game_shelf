import prisma from '../config/database.js';

// Busca por email (case-insensitive) para verificar existência
export async function encontrarEmail(email) {
  return prisma.user.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    select: { id: true } // só precisamos saber se existe
  });
}

// Busca por username (case-insensitive) para verificar existência
export async function encontrarUsername(username) {
  return prisma.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
    select: { id: true }
  });
}

// Cria um novo usuário (já com senha hasheada)
export async function criarUsuario({ username, email, senhaHash }) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: senhaHash
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true
      // NÃO retornar senha
    }
  });
  return user;
}

// Função para validar a senha de um usuário que está tentando fazer login
// Usuario e senha são strings
export async function validarSenha(usuario, senha) {
  // primeiro testa se é um email que vai ser usado para realizar o login
  if (usuario) {
    const password = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { password: true } // aqui selecionamos a senha para poder bater com a senha do usuário
    });
    // verificamos se a senha é igual, e retornamos o resultado para o controller
    if (password == senha) {
      return true;
    } else {
      return false;
    }
  } 
  else {
    const password = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: { password: true } // aqui selecionamos a senha para poder bater com a senha do usuário
    });
    // verificamos se a senha é igual, e retornamos o resultado para o controller
    if (password == senha) {
      return true;
    } else {
      return false;
    }
  }

}