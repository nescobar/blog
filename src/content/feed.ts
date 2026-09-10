import { archivePosts, archiveUrl } from "@/content/archive";
import { site } from "@/content/site";

export function archiveFeed() {
  const xmlItems = archivePosts
    .map((post) => {
      const url = new URL(archiveUrl(post), site.origin).href;
      const description = post.description[post.language];
      const published = new Date(`${post.publishedDate}T00:00:00Z`).toUTCString();
      return `<item><title><![CDATA[${post.title}]]></title><link>${url}</link><guid>${url}</guid><pubDate>${published}</pubDate><description><![CDATA[${description}]]></description></item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Data Guasu — Archivo</title><link>${new URL("/archivo/", site.origin).href}</link><description>Publicaciones históricas de Data Guasu.</description><language>es-PY</language>${xmlItems}</channel></rss>`;
}
