🎮 Game Shelf API

Backend da Game Shelf

Permite que usuários:

Criem conta
Façam login
Busquem jogos (com integração à Twitch API)
Organizem seus jogos por status
Avaliem, adicionem tempo jogado e plataforma

🚀 Tecnologias Utilizadas

Node.js
Express
Prisma ORM
PostgreSQL
JWT (autenticação)
bcrypt (hash de senha)
Twitch API (IGDB)

🧠 Funcionalidades

🔐 Autenticação
Registro com senha criptografada
Login com geração de JWT
Rotas protegidas por middleware

🎮 Integração com Twitch API
Busca local no banco
Caso não exista → busca na Twitch
Salva no banco para evitar requisições repetidas

📚 Shelf

CRUD completo autenticado:
Adicionar jogo
Listar jogos
Buscar jogo específico
Atualizar informações
Remover jogo

🏗️ Arquitetura do Projeto

O projeto segue arquitetura em camadas:
routes → controllers → services → prisma

Separação clara de responsabilidades:

Routes → definem endpoints
Controllers → lidam com request/response
Services → regras de negócio
Prisma → acesso ao banco

⚙️ Como Rodar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/GuilhermoSilveira1/game_shelf.git
cd game_shelf/backend

2️⃣ Instale as dependências:
npm install

3️⃣ Configure as variáveis de ambiente

Crie um arquivo .env:
DATABASE_URL="postgresql://user:password@localhost:5432/gameshelf"
JWT_SECRET="sua_chave_secreta"
TWITCH_CLIENT_ID="seu_client_id"
TWITCH_CLIENT_SECRET="seu_client_secret"

4️⃣ Rode as migrations
npx prisma migrate dev
npx prisma generate

5️⃣ Inicie o servidor
npm run dev

Servidor rodando em:
http://localhost:5000

🔑 Autenticação

As rotas protegidas exigem header, então no Postman ou outra ferramenta, selecionar Authorization: Bearer e colocar o valor gerado do token.

📌 Status possíveis da Shelf
WANT_TO_PLAY
PLAYING
COMPLETED
DROPPED

🔜 Próximos Passos

Padronização de tratamento de erros
Paginação
Filtros por status
Frontend integrado
Docker
