# React Coding Style (EigenSol)

## 1. Architecture and Foldering

1. Keep frontend modular by feature and layer:
   - `pages/` for route-level composition only.
   - `components/` for reusable UI blocks.
   - `hooks/` for stateful logic.
   - `services/` for API and infra utilities.
   - `types/` for shared contracts.
2. Route config must stay centralized in `routes/`; avoid inline route definitions in random files.
3. Never let `App` or any page become a “god component”; split early when file grows or responsibilities mix.
4. Use consistent component directory pattern for reusable parts:
   - `ComponentName/ComponentName.tsx`
   - `ComponentName/ComponentName.css`

## 2. Component Design Rules

1. Prefer functional components + hooks only.
2. Keep components focused:
   - UI components should render and emit events.
   - Data fetching/business logic should live in hooks/services.
3. Reduce prop drilling:
   - Extract shared behavior into custom hooks.
   - Introduce scoped context/store only when truly shared across distant branches.
4. Reuse common primitives (`Button`, `Input`, etc.) instead of duplicating raw elements with ad-hoc styling.
5. Keep props typed with explicit interfaces; avoid `any` in component contracts.
6. For actions with side effects, use named handlers (`handleSubmit`, `handleDelete`) not inline complex lambdas.

## 3. State Management and Data Flow

1. Choose state scope intentionally:
   - Local UI state in component (`useState`).
   - Feature/shared state in custom hook or store.
2. Keep async state shape explicit: `loading`, `error`, `data/result`.
3. Do optimistic or local list updates only when deterministic; otherwise refresh from source.
4. Use `useCallback`/`useEffect` dependency lists correctly; no hidden stale-closure behavior.
5. Guard user actions before API calls (required IDs, trimmed text, valid form inputs).

## 4. API, Services, and Types

1. All backend communication goes through service clients (`services/api.ts` pattern).
2. Keep token/session concerns centralized in API client; never duplicate auth header logic in components.
3. Share request/response contracts in `types/` and use them end-to-end.
4. Translate backend errors into user-safe messages at hook/service boundary.
5. Keep environment-based configuration (`VITE_*`) in service/bootstrap level, not scattered through components.

## 5. Error Handling and Logging

1. Always handle async failures with `try/catch` in hooks or action handlers.
2. Expose meaningful UI error states; do not silently fail.
3. Use centralized logger service; avoid random `console.log` calls across the app.
4. In production, keep logs minimal and controlled by log level.

## 6. UI/UX and Accessibility

1. Use semantic HTML for structure (`main`, `header`, `nav`, `button`, `label`).
2. All interactive icons/buttons must have accessible labels/titles.
3. Prevent accidental destructive actions:
   - Confirm modals for delete operations.
   - Disable actions while async operation is running.
4. Keep “empty”, “loading”, and “error” states explicit in each major screen.
5. Theme logic should be encapsulated in dedicated hook/service (`useTheme` pattern).

## 7. Code Cleanliness and Consistency

1. Keep naming predictable:
   - Components: `PascalCase`
   - Hooks: `useXxx`
   - Functions/variables: `camelCase`
2. Prefer small files with one main responsibility.
3. Comments should be rare and meaningful (why/intent), not narration of obvious code.
4. Maintain consistent import ordering and avoid dead imports/unused state.
5. Eliminate duplication quickly; if copied twice, refactor into reusable component/hook/util.

## 8. Testing and Verification Expectations

1. Every major page flow must be manually verified for:
   - create/update/delete flows
   - loading/error behavior
   - route navigation
2. Add tests for critical hooks/services and reusable components as project matures.
3. Bug fixes should target root cause (state architecture, prop flow, or service boundary), not UI-only patches.

## 9. Non-Negotiables (Always Follow)

1. No oversized mixed-responsibility components.
2. No direct API calls inside presentational components.
3. No untyped payloads/responses for backend interactions.
4. No silent failure paths for async actions.
5. No frontend feature merge without at least basic loading/error/empty state handling.
