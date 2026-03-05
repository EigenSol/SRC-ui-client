# Docker Runtime

## Start

```bash
docker compose up --build
```

## Compose Service

- Service name: `ui-client`
- Port mapping: `5173:5173`
- Env source: `.env`

## Image

Multi-stage build:

1. Build Vite assets in builder stage.
2. Serve built assets via `vite preview` in runtime stage.
