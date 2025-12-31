# game_shelf
Projeto baseado no Skoob, a ideia é criar algo muito parecido, mas voltado para jogos.

Para a base de jogos, foi usada a API da IGBD, feita pela Twitch.

A pasta routes é responsável por chamar os controllers que vão fazer alguma coisa realmente.

Então a ideia mental que tenho é assim:

Frontend -> requisição (route) -> route -> controller (da rota) -> models -> Banco de dados
E retorna o mesmo caminho para mostrar alguma coisa na tela.