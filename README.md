# SRC-ui-client

Frontend test client for IdP + backend verification flow.

Full docs index: [docs/README.md](./docs/README.md)

## What it does

- Register user at IdP (`POST /auth/register`)
- Login user at IdP (`POST /auth/login`)
- Use returned access token against backend (`GET /api/protected/ping`)

## Environment

```bash
cp .env.example .env
```

Set endpoints:

- `VITE_IDP_BASE_URL` (default `http://localhost:3000`)
- `VITE_BE_BASE_URL` (default `http://localhost:3001`)
- `VITE_LOG_LEVEL` (`error|warn|info|debug`)

## Run

```bash
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

## Logging

`npm run dev` writes run output to:

`logs/DD-mon-YYYY/HH-00/HH-mm-ss.log`
