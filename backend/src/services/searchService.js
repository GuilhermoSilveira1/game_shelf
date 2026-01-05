import prisma from '../config/database.js';

export async function listarTodosJogos() {
  return prisma.game.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function listarJogoPorNome(name) {
  return prisma.game.findMany({
    where: { name: { contains: name, mode: 'insensitive' } },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: 20,
  });
}

export async function listarJogoPorGenero(genreName) {
  return prisma.game.findMany({
    where: {
      genres: {
        some: { genre: { name: { equals: genreName, mode: 'insensitive' } } },
      },
    },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
  });
}
