import prisma from '../database.js';

export async function listarTodosJogos() {
  return prisma.game.findMany();
}

export async function criarJogo(data) {
  return prisma.game.create({
    data
  });
}
