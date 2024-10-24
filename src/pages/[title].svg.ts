import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { generateOgImage } from "@/lib/og-image";

export const get: APIRoute = async ({ params }) => {
  const imageFormat = import.meta.env.MODE === "production" ? "png" : "svg";
  const contentType = imageFormat === "svg" ? "image/svg+xml" : "image/png";
  const body = await generateOgImage(params.title, imageFormat);
  return new Response(body, {
    headers: { "Content-Type": contentType },
  });
};

const articleImportResult = await getCollection(
  "blog",
  ({ data }) => !data.draft
);
const articles = Object.values(articleImportResult);

export function getStaticPaths() {
  return articles
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { title: data.title },
    }));
}
