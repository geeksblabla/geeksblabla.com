import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForArticle } from "@/lib/og-image";

export async function getStaticPaths() {
  const articles = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );
  return articles.map(article => ({
    params: { slug: article.data.slug },
    props: article,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForArticle(props as CollectionEntry<"blog">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
