# Blog

My personal blog using modern web technologies.

## Table of Contents:

- [Stack](#stack)
- [Features](#features)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [License](#license)

## Stack

- TypeScript
- React
- Express
- PostgreSQL
- Docker
- JWT

## Features

- Authentication using JWT
- REST API for blog posts
- Admin-protected post creation, editing, and deletion
- Responsive frontend using React + Vite
- PostgreSQL as the database
- Dockerized development and production environments

## Setup

1. Clone the repository
2. Create the `.env.docker` files for both `server` and `client` folders
3. Run docker containers in development mode

```
docker-compose up --build
```

- Access:
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3030/api

## Endpoints

### Public

| HTTP Verb | Endpoint | Action |
| --- | --- | --- |
| GET | /api/posts | List all posts |
| GET | /api/posts/:slug | Get post by slug |
| POST | /api/login | Authenticate and get JWT (admin) |

### Protected (JWT required)

| HTTP Verb | Endpoint | Action |
| --- | --- | --- |
| POST | /api/posts | Create a new post |
| PUT | /api/posts/:slug | Update post by slug |
| DELETE | /api/posts/:slug | Delete post by slug |

## Environment Variables

You will need at least:

### `server/.env.docker`

```
API_PORT=3030
JWT_SECRET=<your-secret>
ADM_PASS_HASH=<bcrypt hash of admin password>
```

### `client/.env.docker`

```
INSIDE_DOCKER=true
```

## License

[MIT](./LICENSE)
