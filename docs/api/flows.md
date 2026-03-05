# UI Flows and API Usage

## Register Flow

1. User submits register form.
2. UI calls `POST /auth/register` on IdP.
3. UI receives token and stores it in state.

## Login Flow

1. User submits login form.
2. UI calls `POST /auth/login` on IdP.
3. UI receives token and stores it in state.

## Protected Backend Flow

1. User clicks protected call action.
2. UI sends `Authorization: Bearer <token>` to backend.
3. Backend verifies token and returns protected response.

## Error Handling

- Service layer throws normalized errors.
- Hook captures and exposes user-safe error messages.
- Page renders explicit error state.
