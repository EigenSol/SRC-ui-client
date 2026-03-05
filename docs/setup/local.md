# Local Development

## Environment

```bash
cp .env.example .env
```

Set:

- `VITE_IDP_BASE_URL` (default `http://localhost:3000`)
- `VITE_BE_BASE_URL` (default `http://localhost:3001`)
- `VITE_LOG_LEVEL` (`error|warn|info|debug`)

## Run

```bash
npm install
npm run dev
```

## Build Check

```bash
npm run lint
npm run build
```
