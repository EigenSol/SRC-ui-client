# Architecture Overview

`SRC-ui-client` is a lightweight integration frontend for validating IdP + backend auth flow.

## Responsibilities

- Register and login against IdP.
- Hold received access token in client state.
- Call backend protected endpoint with bearer token.
- Show explicit loading, error, and result states.

## Non-Responsibilities

- Does not verify JWT signatures in browser.
- Does not store user credentials long-term.
- Does not issue tokens.
