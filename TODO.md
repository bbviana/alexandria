# Parei
- star, unstar implementados: testar na tela
- controllers/star

# Next
- snippets favoritos

- proteger telas se user nao logado
- no resultado da busca, usar MarkdownViewer

- tela de usuarios:
    - remoção
    - setar admin
- permissões
    - usuário só pode editar/remover seu proprio snippet
    - admin pode editar/remover todos
    - usuário deve estar logado para criar
    - buscar e consuotar ficam abertos
- ordenar snippets por recentemente editados (hoje os criados vem antes)
- usar um error handler no server, ele da crash (simule com um undefined por ex)
- fuzzy search text com elastic search (mongo nao faz)
- permanent link
- se elemento nao existe => 404
- criação: so habilitar quando tiver mais de  1 file (validação)
- Details -> MD -> Raw
- sort by: your snippets, starred

# Melhorias, nao imprescindíveis para release
- aumentar lineHeight sem efeito "pular"
- ao salvar e voltar pra view, scrollar pro inicio
- botao Ctrl+C (clipboard) em cada File
- middleware para logar rotas "removendo snippet 122..."
- unificar navegação: link href e gotoXX
- busca avançada (ver cheat sheet do gist)
- usar Immutable nas stores
