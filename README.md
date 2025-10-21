# PillFly (Vue + Firebase)

Simple 2D infinite-run game built with Vue 3, Vite, and Firebase Authentication + Firestore.

How to run

1. Install dependencies:

```powershell
npm install
```

2. Run the dev server:

```powershell
npm run dev
```

Notes
- The project expects the GIF assets (sol.gif, rocks.gif, rocket.gif, pillfly.gif) to be at the project root so they are served by the dev server at `/sol.gif` etc. If you put them elsewhere, update the paths in `src/components/Game.vue`.
- Firebase configuration is already placed in `src/firebase.js` using the configuration you provided.
