# IdP and Backend Integration Flow

## Required Environment

- `VITE_IDP_BASE_URL`
- `VITE_BE_BASE_URL`
- `VITE_LOG_LEVEL`

## Dependency Contract

- IdP must be reachable and issuing valid `RS256` JWTs.
- Backend must use the matching IdP public key.

## End-to-End Sequence

1. UI register/login request -> IdP.
2. IdP returns `accessToken`.
3. UI sends token to backend protected endpoint.
4. Backend verifies signature and expiration.
5. Backend responds with decoded user context.
