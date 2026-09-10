import type { Locale } from "@/content/site";

export interface ArchivePost {
  slug: string;
  title: string;
  description: Record<Locale, string>;
  publishedDate: string;
  language: Locale;
  topic: Record<Locale, string>;
}

export const archivePosts: ArchivePost[] = [
  {
    slug: "visualize-databricks-dashboard-tableau",
    title: "Visualizing Databricks dashboards in Tableau",
    description: {
      es: "Cómo exportar un dashboard de Databricks, publicarlo en S3 e integrarlo en Tableau.",
      en: "How to export a Databricks dashboard, publish it to S3, and embed it in Tableau.",
    },
    publishedDate: "2020-09-16",
    language: "en",
    topic: { es: "Visualización de datos", en: "Data visualization" },
  },
  {
    slug: "Building-a-notebook-based-ETL-framework-with-Spark-and-Delta-Lake",
    title: "Building a notebook-based ETL framework with Spark and Delta Lake",
    description: {
      es: "Una arquitectura de notebooks para orquestar, ejecutar y auditar pipelines de datos.",
      en: "A notebook-based architecture for orchestrating, running, and auditing data pipelines.",
    },
    publishedDate: "2020-08-14",
    language: "en",
    topic: { es: "Ingeniería de datos", en: "Data engineering" },
  },
  {
    slug: "Utilizando-Twitter-para-Monitorear-los-Reclamos-de-la-Ciudadanía-(2)",
    title: "Utilizando Twitter para Monitorear los Reclamos de la Ciudadanía (2)",
    description: {
      es: "Detalles técnicos y datos ampliados para analizar reclamos ciudadanos publicados en Twitter.",
      en: "Technical details and an expanded dataset for analyzing civic complaints published on Twitter.",
    },
    publishedDate: "2019-11-21",
    language: "es",
    topic: { es: "Datos cívicos", en: "Civic data" },
  },
  {
    slug: "Analisis-Twitter-MuniAsu",
    title: "Utilizando Twitter para Monitorear los Reclamos de la Ciudadanía (1)",
    description: {
      es: "Un análisis exploratorio de 70.000 publicaciones sobre servicios e infraestructura de Asunción.",
      en: "An exploratory analysis of 70,000 posts about public services and infrastructure in Asunción.",
    },
    publishedDate: "2018-10-21",
    language: "es",
    topic: { es: "Datos cívicos", en: "Civic data" },
  },
  {
    slug: "Tennis-Analytics",
    title: "Analyzing 50 years of Tennis",
    description: {
      es: "Una exploración visual de cinco décadas de torneos ATP, jugadores, superficies y rivalidades.",
      en: "A visual exploration of five decades of ATP tournaments, players, surfaces, and rivalries.",
    },
    publishedDate: "2018-10-12",
    language: "en",
    topic: { es: "Analítica deportiva", en: "Sports analytics" },
  },
  {
    slug: "Data-Guasu",
    title: "Data Guasu",
    description: {
      es: "La historia personal y profesional detrás del blog original de Data Guasu.",
      en: "The personal and professional story behind the original Data Guasu blog.",
    },
    publishedDate: "2018-10-07",
    language: "en",
    topic: { es: "Historia de origen", en: "Origin story" },
  },
];

export function archiveUrl(post: ArchivePost) {
  return `/${post.slug}/`;
}

export function archiveDate(post: ArchivePost, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-PY" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${post.publishedDate}T00:00:00Z`));
}
