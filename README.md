# AGORA

Agora is a digital democracy platform (React + Vite) with pages for elections, polls, voting, applications, and results.

## Tech stack

- React 18
- React Router
- Vite

## Getting started

### Prerequisites

- Node.js 18+ (recommended)

### Install

```bash
cd agora-react
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print the local dev URL in the terminal (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deploy to Vercel (prototype)

The repo is wired for Vercel when the **Git root** is this folder (`agora-react` parent):

- Root `vercel.json` installs and builds inside `agora-react/`, outputs `agora-react/dist`, and rewrites all routes to `index.html` so React Router works after refresh.

**Steps:** Push this repo to GitHub → [vercel.com](https://vercel.com) → **Add New…** → **Project** → Import the repo → leave defaults (Vercel reads `vercel.json`) → **Deploy**.

**Alternative:** In the Vercel project, set **Root Directory** to `agora-react` and remove or ignore the root `vercel.json`; the inner `agora-react/vercel.json` keeps SPA rewrites.

**After the pitch:** Vercel → your project → **Settings** → **Delete Project** (or disconnect the Git integration). No backend secrets are involved in this static build.

## Project structure (high level)

- `agora-react/`: frontend app
  - `src/`: React source
  - `src/pages/`: route pages
  - `src/components/`: shared components