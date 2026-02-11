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
      game: true
    }
  });
}

// Rota Read - Mostrar um jogo específico do usuário
export async function listOneGame(userId, gameId) {
  return prisma.shelf.findUnique({
    where: {
      userId_gameId: {
        userId,
        gameId
      }
    },
    include: {
      game: true
    }
  });
}

/* Rota Update - Ajustar algum dado de algum jogo*/
export async function updateGame(userId, gameId, data) {
  return prisma.shelf.update({
    where: {
      userId_gameId: {
        userId,
        gameId
      }
    },
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
