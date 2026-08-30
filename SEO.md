# SEO deployment notes

## Site URL configuration

All canonical, sitemap, Open Graph, Twitter and structured-data URLs use `NEXT_PUBLIC_SITE_URL`. When it is unset, the application temporarily falls back to:

`https://ratinabijashvili.com`

## Custom-domain migration

After purchasing a custom domain:

1. Set `NEXT_PUBLIC_SITE_URL` to the preferred custom-domain origin, without a trailing slash.
2. Deploy the new environment value.
3. Permanently redirect every Workers.dev path to the equivalent custom-domain path with a `301` or `308` redirect.
4. Choose either `www` or non-`www` as the preferred host and permanently redirect the other host.
5. Recheck canonical URLs, `/robots.txt`, `/sitemap.xml`, social metadata and JSON-LD in production.

Do not redirect until the final custom domain is known and configured.

## Search Console after deployment

1. Verify the preferred production property.
2. Submit `/sitemap.xml`.
3. Inspect and request indexing for the homepage and all three case studies.
4. Monitor Page indexing, Core Web Vitals and Enhancements reports.
5. Re-submit the sitemap and inspect redirects after a future domain migration.
