import prisma from '../config/database.js';

// Existe email?
export async function encontrarEmail(email) {
  return prisma.user.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    select: { id: true } // só para checagem de existência
  });
}

// Existe username?
export async function encontrarUsername(username) {
  return prisma.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
    select: { id: true }
  });
}

// Criar usuário (com passwordHash)
export async function criarUsuario({ username, email, senhaHash }) {
  const user = await prisma.user.create({
    data: { username, email, passwordHash: senhaHash },
    select: { id: true, username: true, email: true, createdAt: true }
  });
  return user;
}

// Buscar para login: por email
export async function buscarUsuarioPorEmail(email) {
  return prisma.user.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    select: { id: true, username: true, email: true, passwordHash: true, createdAt: true }
  });
}

// Buscar para login: por username
export async function buscarUsuarioPorUsername(username) {
  return prisma.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
    select: { id: true, username: true, email: true, passwordHash: true, createdAt: true }
  });
}