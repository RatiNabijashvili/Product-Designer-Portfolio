# Portfolio development guide

Next.js App Router portfolio with React, TypeScript, Tailwind CSS and GSAP.

## Local development

Run `npm ci`, then `npm run dev`. The preview is available at http://localhost:9002.
On Windows with PowerShell script execution disabled, use `npm.cmd` instead of `npm`.

## Checks

- `npm run typecheck` checks TypeScript.
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

Firebase App Hosting configuration remains in `apphosting.yaml`; the portfolio itself does not require the Firebase client SDK or Genkit.
