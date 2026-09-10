# Data Guasu

The bilingual website for Data Guasu, an independent marketing measurement and decision science consultancy led by Nicolás Escobar.

Spanish is published at `/`; English is published below `/en/`. The site is built as static HTML with Astro and is ready for the existing `www.dataguasu.com` GitHub Pages custom domain. There is no repository-name base path.

## Local setup

Requirements: Node.js 22 and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Astro. Common commands:

```bash
npm run format
npm run lint
npm run check
npm run build
npm test
npm run validate
npm run preview
```

`npm test` validates the built routes, internal links, CNAME, sitemap, canonical URLs, `hreflang`, Open Graph metadata, structured data, and the absence of an accidental `/blog/` base path.

## Editing content

The main editable configuration is [`src/content/site.ts`](src/content/site.ts). It centralizes:

- Founder name and location
- Professional email and booking URL
- LinkedIn URL
- Navigation labels and bilingual route mappings
- The three service descriptions and deliverables
- Site origin and social metadata

Page-specific bilingual copy lives in the corresponding component under `src/components/`:

- `HomePage.astro` — homepage positioning, decision questions, industries, and founder summary
- `ServicesPage.astro` — service framing and supporting capabilities
- `ExperiencePage.astro` — anonymized representative work
- `AboutPage.astro` — biography, education, and career context
- `InsightsPage.astro` — short-form perspectives
- `ArchivePage.astro` — bilingual index for the original blog archive
- `ContactPage.astro` — contact choices
- `PrivacyPage.astro` — privacy policy

To add a full Insights article, create matching Spanish and English routes under `src/pages/insights/<slug>/index.astro` and `src/pages/en/insights/<slug>/index.astro`, then add both canonical URLs to `src/pages/sitemap.xml.ts`. Link the article from `InsightsPage.astro` only when it is published.

The six posts from the original Data Guasu blog are preserved at their existing public URLs. Their shared listing metadata lives in `src/content/archive.ts`; the original Markdown lives in the corresponding route directories under `src/pages/`, and the article presentation is handled by `src/layouts/ArchiveArticleLayout.astro`. Posts remain in their original language and are linked from `/archivo/`, `/en/archive/`, the Insights page, and the footer. The unpublished historical “Hello World” draft is intentionally excluded.

## Contact configuration before deployment

`professionalEmail` and `bookingUrl` in `src/content/site.ts` are intentionally empty because neither was supplied. The public site therefore uses the approved LinkedIn profile as its only direct contact action and displays no placeholder or personal Gmail address.

When a professional email or booking URL is approved, add it to `src/content/site.ts`. The contact page will render each configured option automatically.

## Professional-profile verification

The supplied LinkedIn URL is included as a visible profile link and in Schema.org `sameAs`. LinkedIn blocked direct automated profile retrieval during this rebuild. Copy currently uses only the supplied business context plus limited publicly discoverable facts: senior data scientist, approximately seven years applying data science in gaming, telecommunications experience, international/remote work from Paraguay, and an M.S. in Data Science from Indiana University Bloomington.

Before deployment, review the founder biography in `HomePage.astro` and `AboutPage.astro`. A LinkedIn PDF export, résumé, or copied profile text would allow current and previous positions, dates, leadership scope, and career progression to be verified and refined.

## Legacy URLs

The old Fastpages/Jekyll source is retained in the repository as an additional source archive, but it is not part of the Astro build. The six published articles and their image assets were recovered from the source of the live Jekyll site and are now part of the Astro build. Known duplicate and generated URLs are mapped to lightweight static redirect pages. See [`legacy/redirect-map.md`](legacy/redirect-map.md) for the inventory and destinations.

GitHub Pages cannot emit HTTP 301 responses. These routes use `noindex`, canonical URLs, and immediate HTML refreshes. If hosting later moves behind a redirect-capable platform, convert the map to server-side 301 redirects.

The old Universal Analytics property (`UA-127024424-1`) was not carried forward because Universal Analytics has been retired. No current analytics or search-verification file was present. Add a new analytics implementation only after selecting a provider and updating the privacy policy.

## GitHub Pages deployment

The current production workflow on `master` used the retired Fastpages stack and deployed the Jekyll `_site` directory to `gh-pages` with `SSH_DEPLOY_KEY`. The replacement keeps the existing `gh-pages` publishing model and custom domain but makes deployment manual to prevent an unapproved release.

After review and explicit deployment approval:

1. Open a pull request from `codex/dataguasu-redesign` into `master`.
2. Confirm that the **Site quality** workflow passes.
3. Review and merge the pull request.
4. In GitHub Actions, manually run **Deploy Data Guasu** from `master`.
5. Confirm that Pages still serves the `gh-pages` branch.
6. Verify `https://www.dataguasu.com/`, both language trees, the legacy redirects, and HTTPS after the workflow succeeds.

The root `CNAME` is preserved, and `public/CNAME` ensures the built artifact also contains `www.dataguasu.com`. Do not change DNS while the domain continues to point to GitHub Pages.

## Social image and brand assets

The requested social card is `public/og.png` (1200×630). It was generated specifically for Data Guasu and is referenced in Open Graph and X/Twitter metadata. The favicon and web manifest are under `public/`.
