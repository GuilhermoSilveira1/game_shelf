import prisma from '../config/database.js';

// Rota Create - Adicionar jogo na shelf do usuário
export async function addGame({
  userId,
  gameId,
  status,
  description,
  plataform,
  rating,
  time_played
}) {
  return prisma.shelf.create({
    data: {
      user: {
        connect: { id: userId }
      },
      game: {
        connect: { id: gameId }
      },
      status,
      description,
      plataform,
      rating,
      time_played
    },
    include: {
      game: true
    }
  });
}

// Rota Read - Mostrar os jogos da shelf do usuário
export async function listGames(userId) {
  return prisma.shelf.findMany({
    where: { userId },
    include: {
      gameId: true,
      game: true
    }
  });
}

// Rota Read - Mostrar um jogo específico do usuário
export async function listOneGame(gameId) {
  return prisma.shelf.findOne({
    where: { 
      userId_gameId: {
        userId,
        gameId
      }
    },
    include: {
      gameId: true,
      game: true,
      status: true,
      description: true,
      plataform: true,
      rating: true,
      time_palyed: true
    }
  });
}

/* Rota Update - Ajustar algum dado de algum jogo*/
export async function updateGame(userId, gameId, data) {
  return prisma.shelf.update({
    where: { game: { equals: game, mode: 'insensitive' },
    userId_gameId: {
      userId,
      gameId
    }},
    data: { 
      status: data.status,
      description: data.description,
      plataform: data.plataform,
      rating: data.rating,
      time_played: data.time_played
     } 
  });
}

// Rota Delete - ver se o jogo está na shelf, e deletar ele, precisa de autenticação para liberar
export async function deleteGame(userId, gameId) {
  return prisma.shelf.delete({
    where: {
      userId_gameId: {
        userId,
        gameId
      }
    }
  });
}
