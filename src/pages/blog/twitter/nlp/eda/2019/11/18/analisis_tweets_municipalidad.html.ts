import type { APIRoute } from "astro";
import { legacyRedirectHtml } from "@/content/legacy";

export const GET: APIRoute = () =>
  new Response(legacyRedirectHtml("/Analisis-Twitter-MuniAsu/"), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
