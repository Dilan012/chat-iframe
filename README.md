# ThingsBoard Iframe AI Chat (Demo)

A minimal Express server serving a chat widget UI meant to be embedded as an `<iframe>` in a ThingsBoard dashboard (or any other page). This phase uses a demo/canned response instead of a real AI backend, to validate iframe integration first.

## Run

```
npm install
npm start
```

Server starts at `http://localhost:3000`.

## Embed

```html
<iframe src="http://localhost:3000" style="width:350px;height:500px;border:none;"></iframe>
```

The server sets headers (`Content-Security-Policy: frame-ancestors *`) to allow embedding from any origin.

## How it works

- `public/` — chat widget UI (HTML/CSS/JS) served statically.
- `server.js` — Express app. `POST /api/chat` accepts `{ message }` and returns `{ reply, timestamp }`.

Currently `/api/chat` returns a canned response after a simulated delay. Swap this out for a real AI call in a later phase.
