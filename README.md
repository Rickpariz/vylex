
# Vylex

Serviço para gerenciar usuários, assinatura de pacotes e relatório de filmes assistidos pelos usuários.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Configuração e Execução do Projeto

Siga os passos abaixo para configurar e executar o projeto:

### ENVs

Preencher a env abaixo com a sua API KEY do [TheMovieDB](https://www.themoviedb.org/settings/api)
```sh
THE_MOVIE_API_KEY="*"
```

### 1. Suba os contêineres do MySQL e MongoDB

Utilize o comando abaixo para subir os contêineres do MySQL e MongoDB em segundo plano:

```sh
docker-compose up -d
```

### 2. Instalar as dependências

Utilize o comando abaixo instalar as dependências:

```sh
yarn
```

### 3. Executar o servidor

Utilize o comando abaixo instalar executar o servidor:

```sh
yarn dev
```

## Estrutura de dados

#### MySQL

<img width="581" alt="image" src="https://github.com/user-attachments/assets/4abcb830-8acd-417a-95d0-fe769f18923d">

#### MongoDB

<img width="498" alt="image" src="https://github.com/user-attachments/assets/31bac182-a24f-40ea-b567-74572a6eacfd">

