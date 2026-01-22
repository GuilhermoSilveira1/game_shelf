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