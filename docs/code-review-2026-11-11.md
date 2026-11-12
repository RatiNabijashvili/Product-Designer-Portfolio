# Code review — 11 November 2026

**Post-review correction:** At the user's request, the reduced-motion guards added in this review were removed. The original reveal, pinning, tab-slide, back-to-top and marquee animation behavior is restored. References below to those guards describe the original audit changes, not the current implementation. Other fixes remain in place.

## Result

Reviewed application routes, shared components, case-study views, interaction lifecycle, animation setup, metadata, asset references, scripts and configuration. Ran TypeScript, ESLint, production builds, production HTTP checks and npm dependency audits. Existing design/content changes in the working tree were preserved; nothing was committed or deployed.

The local production build passes. This is not a claim that the site is free of bugs or that all dependency advisories are exploitable in this application.

## Findings still open

### High: a vulnerable PostCSS version remains inside Next.js

The final production audit reports **5 affected dependency entries: 1 high, 4 moderate, 0 critical**. The high entry is `node_modules/next/node_modules/postcss`; `next` is also reported through that dependency. The other entries are `glob`, `minimatch` and `sucrase`.

Next.js 15.5.29 pins this PostCSS dependency. npm recommends Next.js 16.4.6 to resolve it, which is a major-version migration. A dependency override would also need an explicit compatibility assessment. Neither was applied blindly. The compatible `npm audit fix` pass left these entries outstanding even though some transitive entries advertise a compatible fix.

The repository has no application endpoint accepting user-supplied CSS, XML, templates or schemas. That limits the observed attack surface, but does not prove the affected dependencies unreachable in every hosting/build configuration. Treat the remaining advisory as unresolved.

Evidence: [initial audit](dependency-audit.json), [final production audit](dependency-audit-after.json), `package.json`, `package-lock.json`. The final all-dependency audit emitted 10 findings (9 moderate, 1 high), including lint/build dependencies; the 5-count above is specifically `--omit=dev`.

### Medium: paragraph contrast is below the normal-text threshold

The widely reused `#919191` paragraph color has approximately **3.07:1** contrast against `#FCFCFC`, before accounting for the decorative background image. The 16px mobile and 20px medium-weight paragraphs need the normal-text 4.5:1 threshold. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Example: `src/components/projects/noxtton-case-sections.tsx`, the shared case-section body styling. This pattern also appears in homepage and other case-study components. A darker shared paragraph color should be chosen and checked against the actual background. The palette was not changed during this review.

### Medium: remaining motion/accessibility work

Reveal, pinning, tab-slide and marquee effects now respect a reduced-motion preference present when the relevant component mounts. Autoplay videos still have no visible pause control, and the reveal preference checks do not subscribe to a preference change made while the page is already open. A complete motion/accessibility pass should address these behaviors and include keyboard/screen-reader testing.

### Low: image optimization warnings and legacy component structure

ESLint passes with **18 warnings**, all for native `<img>` elements. Most are small SVG icons/logos, for which raster optimization offers little benefit; four are service-pattern WebPs. Review their loading behavior and dimensions rather than mechanically replacing every tag.

`src/components/projects/hapttic-project-page.tsx` remains a large legacy multi-project component. The active Noxtton overview and shared Explore More Work cards use it, while its old Hapttic/White Square branches are no longer routed. Those old branches reference some assets removed by earlier design changes. They are not current page failures, but should be removed when extracting the Noxtton overview and shared project-card components. This broader refactor was left out to avoid changing already-approved layouts.

## Fixed in this review

| Finding | Change |
| --- | --- |
| Critical-rated framework/image dependencies | Updated Next.js from 15.5.9 to 15.5.29; compatible dependency remediation brought Sharp to 0.35.5. This matches the patched image-library threshold in the [Next.js advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw). |
| Unused dependency attack surface | Removed unused Genkit/Firebase client scaffolding, AI scripts and dependencies, plus unused Zod, dotenv and patch-package. No portfolio route imported these. Firebase App Hosting YAML remains. Production audit entries fell from 103 (6 critical) to 5 (0 critical). |
| Build checks bypassed | Removed `ignoreBuildErrors` and `ignoreDuringBuilds` from `next.config.ts`. |
| Lint command did not actually run | Added an explicit ESLint configuration and dependencies; `npm run lint` now runs without a setup prompt. |
| False clipboard success / rejected promises | Footer now awaits clipboard completion, shows failure feedback and announces status. Its feedback timer is cleared before reuse and on unmount. |
| Missing tab ARIA targets / duplicated controls | Extracted `ProjectCaseTabs`; both tabs point to an existing panel, with keyboard behavior retained and scroll reset after the new view commits. Reduced-motion tab switching is immediate. |
| Unhandled video play rejections | Hover-video playback catches rejected promises and restores the still image. |
| Ignored reduced-motion preference | Added guards to the GSAP reveal/pinning effects and back-to-top action; disabled the CSS logo marquee under reduced motion. Scope limitations are recorded above. |
| Incorrect social image metadata | UX Challenges' WebP was declared as a 1200×630 PNG. Its metadata now reports WebP and its actual 2400×1350 dimensions. |
| Carousel event listener cleanup | The reusable carousel now unregisters `reInit` as well as `select`. This was a latent shared-component issue, not an observed failure of the CSS logo marquee. |
| Repeated toast subscriptions | Toast subscription no longer detaches/re-attaches on every toast state update. |
| Cleanup | Removed unused icon code/imports and type-only runtime constants, updated stale sitemap dates and replaced the starter README with actual setup/check instructions. |

## Verification

- `npm run typecheck`: passed during implementation; final production build also checks types.
- `npm run lint`: passed with 0 errors and 18 image warnings.
- `npm run build`: passed after dependency cleanup and compatible updates; all routes prerendered successfully.
- `node scripts/check-site.mjs` against the production server: 5 pages, 119 rendered assets, canonical/social metadata, tab control references, 404 behavior, robots and sitemap passed.
- The same script verified 37 authored case-study image references, including exact filename casing. Full Case content is mounted in the client, so these checks complement the default Overview HTTP responses.
- `npm ls next sharp eslint eslint-config-next --depth=1`: resolved Next.js 15.5.29, Sharp 0.35.5, ESLint 9.39.5 and eslint-config-next 15.5.29.
- Security reports saved before and after changes. No `--force` upgrades used.

No connected browser was available (`apps: []`, `browsers: []`). Therefore animation timing, pointer interactions, clipboard permissions, responsive screenshots and screen-reader behavior were not exercised in a real browser. The HTTP checks validate delivered output, not complete client interaction behavior. A production deployment was not performed.

## Follow-up order

1. Plan/test the Next.js major upgrade or a narrowly reviewed PostCSS override; rerun both production and full dependency audits.
2. Choose a compliant paragraph color and complete motion/keyboard/accessibility checks.
3. Extract the legacy Noxtton overview/shared project cards; optimize large media where measurements justify it.
