# Portfolio development guide

Next.js App Router portfolio with React, TypeScript, Tailwind CSS and GSAP.

## Local development

Run `npm ci`, then `npm run dev`. The preview is available at http://localhost:9002.
On Windows with PowerShell script execution disabled, use `npm.cmd` instead of `npm`.

## Checks

- `npm run typecheck` checks TypeScript.
- `npm run check:assets` checks image/icon/background/metadata paths against exact Git filename casing. This also runs automatically before production builds, with filesystem validation on hosts that omit Git metadata.
- `node --test scripts/project-layout-ready.test.mjs` checks loader bypass/fallback, font/layout readiness and animation setup cancellation during navigation.
- `npm run lint` runs ESLint without an interactive setup prompt.
- `npm run build` creates a production build and checks lint/types.
- `npm run start -- -p 9003` serves that build for validation.
- `node scripts/check-site.mjs` checks pages, assets, metadata and case-image paths against port 9003. Set `SITE_CHECK_URL` to check a different local server.

Stop the development server before building: both commands use `.next`.

## Editing content

- Project card names, descriptions and tags: `src/lib/projects-data.ts`.
- Case-study pages: `src/components/projects/` and `src/app/projects/`.
- Search and social metadata: `src/lib/site-config.ts`.
- Images and icons: `public/`.
- Site URL: `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

After replacing project WebPs, run `node scripts/prepare-project-images.mjs` to regenerate static responsive files, blur previews and `src/lib/project-image-manifest.json`. Keep original filenames exactly as Git records them; production paths are case-sensitive. `scripts/check-site.mjs` checks this alongside decoding and requesting every generated variant.

Firebase App Hosting configuration remains in `apphosting.yaml`; the portfolio itself does not require the Firebase client SDK or Genkit.

## First-visit loader

The first-visit loader combines a small 0-100 startup counter with wandering eyes adapted from Loading UI (MIT; see `docs/licenses/loading-ui.txt`). It uses an embedded 128px tile of the portfolio texture, so the loader background needs no image request. The larger eyes use the original Loading UI component and unchanged gaze/blink keyframes, with a 2.4-second cycle. Tailwind 4 container/gap utilities are expressed as native styles for this Tailwind 3 site. No reduced-motion rule disables the requested eye animation. The full page texture is preloaded for the reveal. Normal timing is 2.5 seconds: 1.63 seconds of smoothly eased counting, then the eyes and counter fade together with a 6px lift. After 220ms the 650ms cover fade overlaps that exit. The original eye keyframes are unchanged. The counter indicates the startup sequence, not bytes downloaded. The 3.5-second fallback still prevents a blocked cover. Entrance animations prepare before the cover fade, and scroll animations prepare during it. The page renders underneath with content hidden until the reveal.

Timing and the session key are in `src/lib/site-loader.ts`; the overlay is `src/components/shared/site-loader.tsx`. To replay it, use a new private browsing session. Returning visits and client navigation skip it. Without JavaScript the overlay remains hidden and content stays accessible.
