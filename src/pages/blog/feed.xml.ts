import type { APIRoute } from "astro";
import { archiveFeed } from "@/content/feed";

export const GET: APIRoute = () =>
  new Response(archiveFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
