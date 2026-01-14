import prisma from '../config/database.js';

export async function listarUsuarios() {
  return prisma.user.findMany();
}

export async function criarUsuario(data) {
  return prisma.user.create({
    data
  });
}
