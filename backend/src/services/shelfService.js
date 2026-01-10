
// src/services/gamesService.js
import prisma from '../config/database.js';
import { igdbQuery, buildCoverUrl } from './igdbClient.js';
import { IGDBCredentialsMissingError } from './igdbClient.js'; // se exportar a classe
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

export async function getOrFetchGamesByName(name) {
  // 1) tenta do banco
  const local = await findGamesByNameLocal(name);
  if (local.length) return local;

  // 2) se não tiver, tenta IGDB (search "<name>")
  try {
    const query = `
      search "${name}";
      fields id,name,summary,cover.image_id,genres.id,genres.name,genres.slug;
      limit 20;
    `;
    const igdbGames = await igdbQuery('games', query);

    // 3) persiste normalizado
    const result = [];
    for (const g of igdbGames) {
      const coverUrl = buildCoverUrl(g.cover?.image_id);

      const game = await prisma.game.upsert({
        where: { id: g.id },
        update: { name: g.name, summary: g.summary ?? null, coverUrl },
        create: { id: g.id, name: g.name, summary: g.summary ?? null, coverUrl },
      });

      if (Array.isArray(g.genres)) {
        for (const gen of g.genres) {
          const genre = await prisma.genre.upsert({
            where: { id: gen.id },
            update: { name: gen.name, slug: gen.slug ?? null },
            create: { id: gen.id, name: gen.name, slug: gen.slug ?? null },
          });

          await prisma.gameGenre.upsert({
            where: { gameId_genreId: { gameId: game.id, genreId: genre.id } },
            update: {},
            create: { gameId: game.id, genreId: genre.id },
          });
        }
      }
      result.push(game);
    }

    // 4) retorna já consultando com include (garantir gêneros)
    return findGamesByNameLocal(name);
  } catch (err) {
    if (err.name === 'IGDBCredentialsMissingError') {
      console.warn('[IGDB] Credenciais ausentes, retornando apenas dados locais.');
      return local; // vazio mesmo, por enquanto
    }
    throw err;
  }
}
