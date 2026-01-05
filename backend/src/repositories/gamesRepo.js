
// src/repositories/gamesRepo.js
import prisma from '../config/database.js';

export async function findGamesByNameLocal(name, limit = 20) {
  return prisma.game.findMany({
    where: { name: { contains: name, mode: 'insensitive' } },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
  });
}

export async function findGamesByGenreNameLocal(genreName, limit = 50) {
  return prisma.game.findMany({
    where: {
      genres: {
        some: { genre: { name: { equals: genreName, mode: 'insensitive' } } },
      },
    },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
  });
}

export async function listAllGamesLocal(limit = 100) {
  return prisma.game.findMany({
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
  });
}
