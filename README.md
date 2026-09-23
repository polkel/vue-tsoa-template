# vue-tsoa-template

This is a standard template for a web project with a vue frontend and a tsoa backend.

## Quick Start

- Install requirements (see [requirements](#requirements))
- Populate the .env in frontend and backend
    - Run this from the repo root to use the example files

```bash
cp packages/frontend/.env.example packages/frontend/.env.development
cp packages/backend/.env.example packages/backend/.env
```

- Run the docker compose script `docker/local-db/compose.yaml`
    - Might need to `chmod u+x` the shell script
- `npm i && npm run dev` from root and visit `http://localhost:5173'
- Make changes to the frontend or backend and watch it reload!

## Requirements

- install npm and node (tested on npm v12 and node v24)
- install docker and docker-compose (tested on docker v29 and docker-compose v5)
- install java (tested on openjdk v26)

## About

This is a typescript template for a full stack monorepo web app. This template was developed with 3
focuses in mind:

- Velocity
- Simplicity
- Extensibility

### Velocity

Development velocity is an important factor when considering what tech stack to choose. The ability
to start developing the important parts of your app rather than worry about tooling is essential.
Here are a few examples of where velocity was kept top of mind in this template:

- The frontend api client is generated from tsoa's swagger spec. This client is automatically
  regenerated when there are changes in the backend code while nodemon is running.
- Vue is implemented for quick management of the script, html, and css in the same file.
- The deploy script automatically redeploys the whole stack.

### Simplicity

Having a simple, easy to follow codebase also contributes to velocity. Additionally, it also helps
with the longevity and maintainability of a codebase. Here's a few ways that this template keeps the
development workflow simple:

- Tailwind and PrimeVue come with out of the box classes and components to reduce the html/css
  overhead.
- Tsoa controller format is very intuitive to use when adding new endpoints (compared to raw
  express).
- Prisma ORM keeps the database and app models in one place (schema.prisma). No drift between the
  two models.

### Extensibility

What good is a template if it cannot be extended for one's own purposes? Using npm works spaces
makes it easy to add a new app to this monorepo. The local `shared` package (or any other one) can
be installed in any other local app for re-use. There are also a many frontend and backend utilities
included that get users started on the right track, but can be extended if desired (backend errors,
prisma seeding, etc).

## Components

- frontend
    - vue v3
    - primevue v4 (for licensing) and theme package at previous version for licensing
    - tailwind css
- backend
    - tsoa
        - openapigenerator
        - swagger doc served at /docs
    - prisma (postgresql)
    - dotenv and zod
- shared
    - api client generated from tsoa swagger spec
        - api.ts needs to be modified when adding/deleting controllers

## Using npm workspaces

The app you want to build may contain multiple frontend or backend apps. To declare additional apps,
add a new npm project in the `packages` directory and run npm i. Make sure it doesn't conflict with
any existing package names in that directory.

Here's a [primer](https://docs.npmjs.com/cli/v12/using-npm/workspaces) on npm workspaces if it's
your first time using it.

## Other considerations

This template deliberately lacks a testing module. Also, the prisma client is not regenerated upon
changes to the `schema.prisma` file. This is deliberate because changes to that file is usually done
in batches and needs to be more intentional. The user will likely pair with with
`prisma migrate dev` and generate that client that way.

---

Find more about me and other projects [here](https://polkel.dev)!
