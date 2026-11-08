// The blog is in Japanese only. Each post answers what people in Japan
// search for, so it is written for them rather than translated.

import type { ImageMetadata } from "astro";

export interface Post {
  slug: string;
  frontmatter: { title: string; description: string; published: string; updated: string };
  Content: astroHTML.JSX.Element;
  // card is the post's own picture in link previews, such as a post on X.
  card: ImageMetadata;
}

const files = import.meta.glob<Omit<Post, "slug" | "card">>("../blog/ja/*.md", { eager: true });
const cards = import.meta.glob<ImageMetadata>("../assets/blog/*.png", { eager: true, import: "default" });

const slugOf = (file: string) => file.split("/").pop()!.replace(/\.(md|png)$/, "");
const cardOf = (slug: string) => {
  const card = Object.entries(cards).find(([file]) => slugOf(file) === slug)?.[1];
  if (!card) throw new Error(`The blog post ${slug} has no card; run node scripts/render-blog-cards.mjs`);
  return card;
};

// posts are the published posts, newest first.
export const posts: Post[] = Object.entries(files)
  .map(([file, { frontmatter, Content }]) => ({ slug: slugOf(file), frontmatter, Content, card: cardOf(slugOf(file)) }))
  .sort((a, b) => b.frontmatter.published.localeCompare(a.frontmatter.published));

// dated is how a post's date reads on the page.
export function dated(day: string) {
  return new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(day));
}
