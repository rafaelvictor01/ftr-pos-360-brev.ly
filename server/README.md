# Back-end e DevOps

## 🚀 Funcionalidades e Regras

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com um encurtamento formatado incorretamente
  - [x] Não deve ser possível criar um link com um encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível recuperar a URL original através do encurtamento
- [x] Deve ser possível listar todas as URLs cadastradas
- [x] Deve ser possível incrementar o número de acessos de um link
- [] Deve ser possível baixar um CSV com o relatório dos links criados
  - [] Deve ser possível acessar o CSV através de uma CDN (Amazon S3, Cloudflare R2, etc.)
  - [] Deve ser gerado um nome aleatório e único para o arquivo
  - [] Deve ser possível listar as URLs de forma performática
  - [] O CSV deve incluir campos como URL original, URL encurtada, quantidade de acessos e data de criação
