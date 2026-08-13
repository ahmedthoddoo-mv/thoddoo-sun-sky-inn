import type { MetadataRoute } from "next";

const baseUrl = "https://thoddoosunskyinn.com";
const routes = [
  "",
  "/stay",
  "/experiences",
  "/packages",
  "/gallery",
  "/discover",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
  }));
}
