# Brev.ly

![Encurtador de Links Thumbnail](readme-thumbnail.png)

<p align="center"> 
  <a href="https://www.figma.com/design/38Z1s9VnoA1kB4xPv1IQBd/Encurtador-de-Links--Community-?node-id=0-1&m=dev&t=k6jeOmvV7h9NzLTt-1">
    <img alt="Figma Badge" src="https://img.shields.io/badge/Figma-%23F24E1E?style=flat&logo=figma&logoColor=%23FFFFFF">
  </a>
</p>

<ul>
  <li><a href="#-sobre">📑 Sobre</a></li>
  <li>
    <a href="#-funcionalidades-e-regras-propostas">
      🚀 Funcionalidades e Regras Propostas
    </a>
  </li>
  <li><a href="#-">🛠️ Tech</a></li>
  <li><a href="#-">🤔 Como Rodar o Projeto</a></li>
</ul>

## 📑 Sobre

Brev.ly é uma aplicação para encurtamento de URLs. O projeto visa criar uma plataforma que permita o registro, a listagem e a remoção de links encurtados, além de gerar relatórios com o número de acessos para cada link. O aplicativo também garante o redirecionamento correto dos links encurtados para seus URLs originais, fornecendo uma solução prática e eficiente para otimizar o compartilhamento de links e monitorar o tráfego gerado.

Este projeto foi desenvolvido como parte do meu curso de pós-graduação [**Pós Tech Developer 360**](https://www.rocketseat.com.br/faculdade/tech-developer-360) na [**Rocketseat**](https://www.rocketseat.com.br/). 

<br/>

## 🚀 Funcionalidades e Regras Propostas

### Front-end

-   [] Deve ser possível criar um link
    -   [] Não deve ser possível criar um link com encurtamento mal formatado
    -   [] Não deve ser possível criar um link com encurtamento já existente
-   [] Deve ser possível deletar um link
-   [] Deve ser possível obter a URL original por meio do encurtamento
-   [] Deve ser possível listar todas as URL’s cadastradas
-   [] Deve ser possível incrementar a quantidade de acessos de um link
-   [] Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

-   [] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
-   [] Siga o mais fielmente possível o layout do Figma;
-   [] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
-   [] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.

### Back-end

-   [] Deve ser possível criar um link
    -   [] Não deve ser possível criar um link com URL encurtada mal formatada
    -   [] Não deve ser possível criar um link com URL encurtada já existente
-   [] Deve ser possível deletar um link
-   [] Deve ser possível obter a URL original por meio de uma URL encurtada
-   [] Deve ser possível listar todas as URL’s cadastradas
-   [] Deve ser possível incrementar a quantidade de acessos de um link
-   [] Deve ser possível exportar os links criados em um CSV
    -   [] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    -   [] Deve ser gerado um nome aleatório e único para o arquivo
    -   [] Deve ser possível realizar a listagem de forma performática
    -   [] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.