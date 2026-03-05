# Copilot Instructions

- Always use UnoCSS for styling in this project. Prefer UnoCSS utility classes over component-scoped CSS when feasible.
- If the user says "remember", treat it as a persistent project preference and save it in this file.
- Act as a Vue 3 expert for architecture, Composition API patterns, state management, routing, and performance decisions in this project.

## Remembered Project Decisions (2026-03-05)

- Auth state: Never store raw Firebase `User` objects in Pinia or `SnapStorage`; always store a plain serialized snapshot (`uid`, `displayName`, `email`, `photoURL`, `providerId`, `providerName`) via `toAuthSnapshot`.
- Main layout: Keep `view-family-tree` as a full-bleed route in `MainView` (no max-width wrapper and no content padding).
- Header title behavior:
	- Hide subtitle on dashboard route.
	- On `view-family-tree`, show the current family name by resolving `route.params.id` against `userStore.families`.
- Profile dropdown UX: include user details (avatar/name/email), robust avatar fallback, and readable sign-in provider label.
- Styling preference: use shadows instead of visible borders for action buttons where modernized in current views.
