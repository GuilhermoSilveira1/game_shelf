/*
Acredito que para esse arquivo funcionar como esperado, seria interessante utilizar o Prisma, ao invés de escrever as 
querys manualmente.
Única coisa que preciso escrever é o código de acompanhamento dos dados da twitch, para sempre manter atualizado
E uma única vez, copiar alguns jogos da API para o meu banco, e depois ele ir adicionando conforme as pessoas pesquisam, e 
daí só precisa monitorar para caso mude alguma informação de alguma dado já populado no banco
*/
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
