# C-Ride Web Architecture

This is one React + Vite app containing Rider and Driver experiences.

Dependency direction:

```text
app/pages
   ↓
features
   ↓
entities
   ↓
shared
```

- `app` owns routing, providers, layouts, and global styles.
- `pages` owns route-level composition for `auth`, `rider`, and `driver`.
- `features` owns business capabilities, not persona folders.
- `entities` owns reusable business concepts and server state boundaries.
- `shared` owns generic API, realtime, config, hooks, components, lib, and types.
- Use TanStack Query for server state.
- Keep generic Socket.IO transport in `shared/realtime`.
- Prefer absolute imports through configured aliases.
- Extract packages only for genuine cross-application reuse.
