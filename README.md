# Rick & Morty Gallery

A **Next.js 13+ App Router** project showcasing Rick & Morty characters with a polished, performant UI.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Scripts](#scripts)
3. [Architecture & Decision Points](#architecture--decision-points)
4. [Folder Structure](#folder-structure)
5. [Performance Tuning](#performance-tuning)
6. [Future Improvements](#future-improvements)

---

## Getting Started

**Prerequisites**: Node.js ≥16, npm or Yarn

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd rick-morty-gallery
   ```
2. Install dependencies:
   ```bash
   npm install
   # or `yarn`
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – Start Next.js in development mode (Fast Refresh).
- `npm run build` – Build for production (SSR + ISR).
- `npm start` – Start the production server.
- `npm run lint` – Run ESLint.

## Architecture & Decision Points

### 1. Next.js App Router & SSR/ISR

- **App Router** for file-based routing and React Server Components.
- Root layout (`app/layout.tsx`) wraps children in a **client-only** provider (`ClientProviders`) to avoid hydration mismatches.
- Data fetching done via Apollo Client in **server components**, with:
  ```ts
  export const revalidate = 60
  ```
  enabling ISR (rebuild every 60s).

### 2. User Gating Modal

- Client-only `SetupModalClient` prompts for **username** & **job title** stored in cookies.

### 3. GraphQL & Apollo

- Server: `lib/apolloClient.ts` uses `registerApolloClient`.
- Client: `lib/apolloWrapper.tsx` wraps app in `ApolloNextAppProvider`.

### 4. Pagination & Deep Linking

- URL‐based page query `?page=` supports direct linking.
- Compact controls show **first**, **last**, and **current ±2** pages with ellipses.

### 5. Responsive UI & Accessibility

- **Chakra UI** for theming, layout, and components.
- Responsive grid: 1 column (mobile), 2 columns (sm), 3 columns (md+).
- Semantic HTML (`<header>`, `<main>`, `<footer>`).


---

## Folder Structure

```text
├── app
│   ├── layout.tsx         # Root layout + ClientProviders
│   ├── loading.tsx        # Global loading spinner
│   ├── error.tsx          # Global error boundary
│   ├── page.tsx           # Home page (SSR + ISR)
│   └── types.d.ts         # GraphQL types
├── components
│   ├── characterList.tsx    # Client: grid + pagination + modal control
│   ├── characterCard.tsx    # Client: card + detail modal
│   ├── setupModal.tsx       # Client: user info input modal
│   └── userInfo.tsx         # Client: avatar edit trigger
├── lib
│   ├── fetch.ts           # Server fetch wrapper for Apollo
│   ├── makeApolloClient.ts# Shared Apollo factory
│   ├── apolloClient.ts    # Server Apollo integration
│   └── apolloWrapper.tsx  # Client Apollo provider
├── next.config.js
├── tsconfig.json
└── package.json
``` 

- **Image Optimization**:
  - Next.js `<Image>` with `priority` & `fetchPriority="high"` on cover and first 3 cards.

- **Code Splitting** (`next/dynamic`):
  Splits heavy UI into on-demand chunks.

- **Tree Shaking**:
  - Add `"sideEffects": false"` in `package.json`.
  - Import only specific functions (e.g. `import debounce from 'lodash/debounce'`).

- **Bundle Analysis**: run `ANALYZE=true npm run build` to inspect output.