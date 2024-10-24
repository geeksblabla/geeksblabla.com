import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config";
// TODO: add the posts to the rss + episode to the rss
export async function GET(context) {
  const articles = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site,
    items: articles.map(article => ({
      ...article.data,
      pubDate: new Date(article.data.pubDatetime),
      link: `/blog/${article.data.slug}/`,
    })),
  });
}
