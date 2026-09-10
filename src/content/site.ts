export type Locale = "es" | "en";

type Localized<T> = Record<Locale, T>;

export const site = {
  brand: "Data Guasu",
  descriptor: "Marketing Measurement & Decision Science",
  founder: "Nicolás Escobar",
  professionalEmail: "",
  bookingUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/nicolas-escobar-9389398/",
  location: {
    es: "Paraguay · trabajo internacional",
    en: "Paraguay · working internationally",
  },
  origin: "https://www.dataguasu.com",
  socialImage: "/og.png",
  social: {
    es: {
      title: "Data Guasu — Medición de marketing y ciencia de decisiones",
      description:
        "Medí el impacto real de tus campañas, proyectá retornos y asigná mejor tu presupuesto de adquisición.",
    },
    en: {
      title: "Data Guasu — Marketing Measurement & Decision Science",
      description:
        "Measure incremental campaign impact, forecast returns, and allocate acquisition budgets with confidence.",
    },
  },
  routes: {
    es: {
      home: "/",
      services: "/servicios/",
      experience: "/experiencia/",
      about: "/nosotros/",
      insights: "/insights/",
      archive: "/archivo/",
      contact: "/contacto/",
      privacy: "/privacidad/",
    },
    en: {
      home: "/en/",
      services: "/en/services/",
      experience: "/en/experience/",
      about: "/en/about/",
      insights: "/en/insights/",
      archive: "/en/archive/",
      contact: "/en/contact/",
      privacy: "/en/privacy/",
    },
  },
  navigation: {
    es: [
      { key: "services", label: "Servicios" },
      { key: "experience", label: "Experiencia" },
      { key: "about", label: "Nosotros" },
      { key: "insights", label: "Ideas" },
    ],
    en: [
      { key: "services", label: "Services" },
      { key: "experience", label: "Experience" },
      { key: "about", label: "About" },
      { key: "insights", label: "Insights" },
    ],
  },
  services: {
    es: [
      {
        id: "health-check",
        number: "01",
        title: "Diagnóstico de medición de marketing",
        summary:
          "Una evaluación enfocada para saber qué podés medir hoy, qué brechas importan y cuál es el próximo paso con mayor valor.",
        deliverables: [
          "Revisión de atribución, reportes y definiciones de KPI",
          "Mapa de datos, calidad y brechas de medición",
          "Oportunidades de incrementalidad y experimentación",
          "Roadmap priorizado para MMM, forecasting u optimización",
        ],
      },
      {
        id: "forecasting",
        number: "02",
        title: "Forecasting y optimización de presupuesto",
        summary:
          "Modelos, herramientas de decisión y sistemas de optimización para proyectar valor, explorar escenarios y asignar inversión bajo restricciones reales: desde recomendaciones hasta ejecución autónoma.",
        deliverables: [
          "Forecasts de LTV, revenue y ROAS",
          "Economía de cohortes y escenarios de inversión",
          "Asignación por canal y campaña con restricciones",
          "Optimización online de presupuestos y objetivos de ROAS, con ejecución autónoma",
        ],
      },
      {
        id: "fractional",
        number: "03",
        title: "Liderazgo fraccional de marketing analytics",
        summary:
          "Acompañamiento continuo para elevar la calidad de las decisiones sin sumar una estructura permanente desde el primer día.",
        deliverables: [
          "Revisiones de performance y planificación",
          "Diseño y evaluación de experimentos",
          "Monitoreo y actualización de modelos",
          "Guía para analistas, marketers y stakeholders",
        ],
      },
    ],
    en: [
      {
        id: "health-check",
        number: "01",
        title: "Marketing Measurement Health Check",
        summary:
          "A focused assessment of what you can measure today, which gaps matter, and which next step will create the most value.",
        deliverables: [
          "Attribution, reporting, and KPI definition review",
          "Data availability, quality, and measurement gap map",
          "Incrementality and experimentation opportunities",
          "Prioritized roadmap for MMM, forecasting, or optimization",
        ],
      },
      {
        id: "forecasting",
        number: "02",
        title: "Forecasting & Budget Optimization",
        summary:
          "Models, decision tools, and optimization systems to project value, explore scenarios, and allocate investment under real-world constraints—from recommendations to autonomous execution.",
        deliverables: [
          "LTV, revenue, and ROAS forecasts",
          "Cohort economics and investment scenarios",
          "Channel and campaign allocation with constraints",
          "Online optimization of budgets and ROAS targets, with autonomous execution",
        ],
      },
      {
        id: "fractional",
        number: "03",
        title: "Fractional Marketing Analytics Leadership",
        summary:
          "Ongoing guidance that raises decision quality without requiring a permanent leadership structure from day one.",
        deliverables: [
          "Performance reviews and planning",
          "Experiment design and evaluation",
          "Model monitoring and refreshes",
          "Guidance for analysts, marketers, and stakeholders",
        ],
      },
    ],
  },
} as const;

export const pageMeta: Localized<Record<string, { title: string; description: string }>> = {
  es: {
    home: site.social.es,
    services: {
      title: "Servicios — Data Guasu",
      description:
        "Diagnóstico, forecasting, optimización de presupuesto y liderazgo fraccional de marketing analytics.",
    },
    experience: {
      title: "Experiencia — Data Guasu",
      description:
        "Problemas representativos resueltos en forecasting, optimización, privacidad móvil y automatización de marketing.",
    },
    about: {
      title: "Sobre Data Guasu y Nicolás Escobar",
      description:
        "Consultoría independiente liderada desde Paraguay, con experiencia internacional en marketing, gaming y ciencia de datos.",
    },
    insights: {
      title: "Ideas sobre medición de marketing — Data Guasu",
      description:
        "Perspectivas prácticas sobre incrementalidad, forecasting, ROAS y decisiones de inversión en marketing.",
    },
    archive: {
      title: "Archivo de publicaciones — Data Guasu",
      description:
        "Publicaciones históricas de Data Guasu sobre ingeniería de datos, visualización, analítica deportiva y datos cívicos.",
    },
    contact: {
      title: "Contacto — Data Guasu",
      description:
        "Conversemos sobre tu desafío de medición, forecasting o inversión de marketing.",
    },
    privacy: {
      title: "Privacidad — Data Guasu",
      description: "Información sobre privacidad y tratamiento de datos en Data Guasu.",
    },
  },
  en: {
    home: site.social.en,
    services: {
      title: "Services — Data Guasu",
      description:
        "Measurement diagnostics, forecasting, budget optimization, and fractional marketing analytics leadership.",
    },
    experience: {
      title: "Experience — Data Guasu",
      description:
        "Representative work across forecasting, optimization, mobile privacy, and marketing automation.",
    },
    about: {
      title: "About Data Guasu and Nicolás Escobar",
      description:
        "An independent consultancy led from Paraguay, with international experience across marketing, gaming, and data science.",
    },
    insights: {
      title: "Marketing measurement insights — Data Guasu",
      description:
        "Practical perspectives on incrementality, forecasting, ROAS, and marketing investment decisions.",
    },
    archive: {
      title: "Publication archive — Data Guasu",
      description:
        "Historical Data Guasu articles on data engineering, visualization, sports analytics, and civic data.",
    },
    contact: {
      title: "Contact — Data Guasu",
      description:
        "Start a conversation about your measurement, forecasting, or marketing investment challenge.",
    },
    privacy: {
      title: "Privacy — Data Guasu",
      description: "How Data Guasu handles privacy and personal information.",
    },
  },
};

export function route(locale: Locale, key: keyof (typeof site.routes)["es"]) {
  return site.routes[locale][key];
}

export function alternatePath(locale: Locale, key: keyof (typeof site.routes)["es"]) {
  const alternate = locale === "es" ? "en" : "es";
  return site.routes[alternate][key];
}
