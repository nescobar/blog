import type { APIRoute } from "astro";
import { archivePosts, archiveUrl } from "@/content/archive";
import { site } from "@/content/site";

const pairs = [
  [site.routes.es.home, site.routes.en.home],
  [site.routes.es.services, site.routes.en.services],
  [site.routes.es.experience, site.routes.en.experience],
  [site.routes.es.about, site.routes.en.about],
  [site.routes.es.insights, site.routes.en.insights],
  [site.routes.es.archive, site.routes.en.archive],
  [site.routes.es.contact, site.routes.en.contact],
  [site.routes.es.privacy, site.routes.en.privacy],
] as const;

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const GET: APIRoute = () => {
  const entries = pairs.flatMap(([esPath, enPath]) =>
    ([esPath, enPath] as const).map((path) => {
      const loc = new URL(path, site.origin).href;
      const es = new URL(esPath, site.origin).href;
      const en = new URL(enPath, site.origin).href;
      return `<url><loc>${escape(loc)}</loc><xhtml:link rel="alternate" hreflang="es" href="${escape(es)}"/><xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escape(es)}"/></url>`;
    }),
  );

  const archiveEntries = archivePosts.map((post) => {
    const loc = new URL(archiveUrl(post), site.origin).href;
    return `<url><loc>${escape(loc)}</loc><xhtml:link rel="alternate" hreflang="${post.language}" href="${escape(loc)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escape(loc)}"/></url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[...entries, ...archiveEntries].join("")}</urlset>`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
};
