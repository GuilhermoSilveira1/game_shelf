import { igdbQuery, buildCoverUrl } from './igdbClient.js';
import { IGDBCredentialsMissingError } from './igdbClient.js'; // se exportar a classe
import prisma from '../config/database.js';


export async function findGamesByNameLocal(name, limit = 20, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.game.findMany({
    where: { name: { contains: name, mode: 'insensitive' } },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
    skip,
  });
}

// Rota Read - Mostrar um jogo específico 
export async function listOneGame(gameId) {
  return prisma.game.findUnique({
    where: {
      id: gameId
    }
  });
}

export async function findGamesByGenreNameLocal(genreName, limit = 50, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.game.findMany({
    where: {
      genres: { some: { genre: { name: { equals: genreName, mode: 'insensitive' } } } },
    },
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
    skip,
  });
}

export async function listAllGamesLocal(limit = 100, page = 1) {
  const skip = (page - 1) * limit;
  return prisma.game.findMany({
    include: { genres: { include: { genre: true } } },
    orderBy: { name: 'asc' },
    take: limit,
    skip,
  });
}

export async function getOrFetchGamesByName(name, limit = 20, page = 1) {
  const local = await findGamesByNameLocal(name, limit, page);
  if (local.length) return local;

  console.log("Chamando IGDB para:", name);
  try {
    const query = `
      search "${name}";
      fields id,name,summary,cover.image_id,genres.id,genres.name,genres.slug;
      limit 20;
    `;

    const igdbGames = await igdbQuery('games', query);

    for (const g of igdbGames) {
      const coverUrl = buildCoverUrl(g.cover?.image_id);

      await prisma.game.upsert({
        where: { id: g.id },
        update: { name: g.name, summary: g.summary ?? null, coverUrl },
        create: { id: g.id, name: g.name, summary: g.summary ?? null, coverUrl },
      });

      if (Array.isArray(g.genres)) {
        for (const gen of g.genres) {
          await prisma.genre.upsert({
            where: { id: gen.id },
            update: { name: gen.name, slug: gen.slug ?? null },
            create: { id: gen.id, name: gen.name, slug: gen.slug ?? null },
          });

          await prisma.gameGenre.upsert({
            where: { gameId_genreId: { gameId: g.id, genreId: gen.id } },
            update: {},
            create: { gameId: g.id, genreId: gen.id },
          });
        }
      }
    }

    // 🔥 retorna já paginado corretamente
    return findGamesByNameLocal(name, limit, page);

  } catch (err) {
    console.error(err);
    return local;
  }
}