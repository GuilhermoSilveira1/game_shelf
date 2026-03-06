### Backend - Game Shelf

O backend do Game Shelf fornece a API responsável por autenticação, busca de jogos (via Twitch/IGDB) e gerenciamento da shelf do usuário.

## ✅ Funcionalidades

- Criar conta
- Fazer login e logout
- Buscar jogos (Twitch API / IGDB)
- Organizar jogos por status (jogando, concluído, etc.)
- Avaliar jogos
- Adicionar tempo jogado
- Registrar plataforma
- Gerenciar a shelf personalizada do usuário

## Tecnologias
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- bcrypt (hash de senha)
- Twitch API / IGDB (consulta de jogos)

## Arquitetura
O projeto segue o padrão MVC, com uma leve variação devido ao uso do Prisma:
routes → controllers → services → prisma

- Routes: definem os endpoints
- Controllers: recebem requisições e respondem
- Services: lidam com a lógica de negócio
- Prisma: camadas de acesso ao banco de dados

## Rotas
# Rotas de pesquisa de jogos
Recebe todos os jogos do banco
- GET /games

Busca por nome. Retorna todos os jogos encontrados. Se o nome corresponder a uma série, retorna todos os títulos relacionados.
- GET /games/search
  const res = await fetch(`${API}/games/search?${params.toString()}`, {
    method: "GET",
    credentials: "include"
  });

# Rotas de Autenticação
Login
- POST /auth
Exemplo de envio:
    const res = await fetch(`${API}/auth`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    })

Registro
- POST /auth/register
Exemplo de envio:
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })

Logout
- POST /auth/logout
Exemplo de envio:
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });

# Rotas da shelf
Adicionar jogo à shelf
- POST /shelf
  const res = await fetch(`${API}/shelf`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      gameId: data.gameId,
      status: data.status,
      description: data.description,
      plataform: data.plataform,
      rating: data.rating,
      time_played: data.time_played
    })
  })

Listar todos os jogos da shelf do usuário
- GET /shelf
  const res = await fetch(`${API}/shelf`, {
    method: "GET",
    credentials: "include"
  })

Ler detalhes de um jogo específico
- GET /shelf/:gameId
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "GET",
    credentials: "include"
  })

Atualizar informações de um jogo da shelf
- PATCH /shelf/:gameId
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

Remover jogo da shelf
- DELETE /shelf/:gameId
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "DELETE",
    credentials: "include"
  })

## Autenticação
A autenticação utiliza JWT, enviado e validado via cookies HTTP-only.
O backend verifica o token em todas as rotas protegidas, garantindo segurança e persistência da sessão.