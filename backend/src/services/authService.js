import prisma from '../config/database.js';

// Verifica o banco para ver se o email passado já foi cadastrado
export async function encontrarEmail(email, limit = 20, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.user.findUnique({
    where: { email: { contains: email, mode: 'insensitive' } },
    take: limit,
    skip,
  });
}

// Verifica o banco para ver se o username já foi cadastrado
export async function encontrarUsername(username, limit = 20, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.user.findUnique({
    where: { username: { contains: username, mode: 'insensitive' } },
    take: limit,
    skip,
  });
}
