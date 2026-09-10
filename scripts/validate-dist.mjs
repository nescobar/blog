import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve("dist");
const requiredFiles = [
  "index.html",
  "en/index.html",
  "servicios/index.html",
  "en/services/index.html",
  "experiencia/index.html",
  "en/experience/index.html",
  "nosotros/index.html",
  "en/about/index.html",
  "insights/index.html",
  "en/insights/index.html",
  "archivo/index.html",
  "en/archive/index.html",
  "visualize-databricks-dashboard-tableau/index.html",
  "Building-a-notebook-based-ETL-framework-with-Spark-and-Delta-Lake/index.html",
  "Utilizando-Twitter-para-Monitorear-los-Reclamos-de-la-Ciudadanía-(2)/index.html",
  "Analisis-Twitter-MuniAsu/index.html",
  "Tennis-Analytics/index.html",
  "Data-Guasu/index.html",
  "contacto/index.html",
  "en/contact/index.html",
  "privacidad/index.html",
  "en/privacy/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "CNAME",
  "og.png",
  "favicon.svg",
  "site.webmanifest",
  "feed.xml",
  "blog/feed.xml",
  "blog/twitter/nlp/eda/2019/11/18/analisis_tweets_municipalidad.html",
  "blog/tennis/eda/2018/10/12/data-visualizations-of-atp-tennis-competitions.html",
];

const errors = [];
for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required output: ${file}`);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function outputForUrl(url) {
  const pathname = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (pathname === "/") return join(root, "index.html");
  if (extname(pathname)) return join(root, pathname);
  return join(root, pathname, "index.html");
}

const htmlFiles = existsSync(root) ? walk(root).filter((file) => file.endsWith(".html")) : [];
let combinedHtml = "";
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  combinedHtml += html;
  const relative = file.slice(root.length + 1);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (!existsSync(outputForUrl(url)))
      errors.push(`Broken internal reference in ${relative}: ${url}`);
  }

  const isLegacy = html.includes('http-equiv="refresh"');
  if (!isLegacy && relative !== "404.html") {
    const isArchiveArticle = html.includes('property="og:type" content="article"');
    if (!html.includes('rel="canonical"')) errors.push(`Missing canonical URL in ${relative}`);
    if (isArchiveArticle) {
      if (
        (!html.includes('hreflang="es"') && !html.includes('hreflang="en"')) ||
        !html.includes('hreflang="x-default"')
      )
        errors.push(`Incomplete original-language hreflang set in ${relative}`);
      if (!html.includes('"@type":"BlogPosting"'))
        errors.push(`Missing BlogPosting data in ${relative}`);
    } else if (
      !html.includes('hreflang="es"') ||
      !html.includes('hreflang="en"') ||
      !html.includes('hreflang="x-default"')
    ) {
      errors.push(`Incomplete hreflang set in ${relative}`);
    }
    if (!html.includes('property="og:image"'))
      errors.push(`Missing Open Graph image in ${relative}`);
    if (!html.includes('type="application/ld+json"'))
      errors.push(`Missing structured data in ${relative}`);
    if (html.includes('href="/blog/'))
      errors.push(`Unexpected repository base path in ${relative}`);
  }
}

if (combinedHtml.includes("nicoej@gmail.com")) {
  errors.push("The retired personal Gmail address is exposed in the built site");
}

const linkedin = "https://www.linkedin.com/in/nicolas-escobar-9389398/";
for (const file of [
  "index.html",
  "nosotros/index.html",
  "contacto/index.html",
  "en/index.html",
  "en/about/index.html",
  "en/contact/index.html",
]) {
  if (existsSync(join(root, file)) && !readFileSync(join(root, file), "utf8").includes(linkedin)) {
    errors.push(`Approved LinkedIn URL missing from ${file}`);
  }
}

if (
  existsSync(join(root, "CNAME")) &&
  readFileSync(join(root, "CNAME"), "utf8").trim() !== "www.dataguasu.com"
) {
  errors.push("CNAME does not preserve www.dataguasu.com");
}

if (existsSync(join(root, "sitemap.xml"))) {
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  for (const path of [
    "/servicios/",
    "/en/services/",
    "/contacto/",
    "/en/contact/",
    "/archivo/",
    "/en/archive/",
    "/Tennis-Analytics/",
  ]) {
    if (!sitemap.includes(`https://www.dataguasu.com${path}`))
      errors.push(`Sitemap missing ${path}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${htmlFiles.length} HTML files and ${requiredFiles.length} required outputs.`,
);
