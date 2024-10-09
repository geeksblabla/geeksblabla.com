import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config";
// TODO: add the posts to the rss + episode to the rss
export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
