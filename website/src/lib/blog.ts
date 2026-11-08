// The blog is in Japanese only. Each post answers what people in Japan
// search for, so it is written for them rather than translated.

export interface Post {
  slug: string;
  frontmatter: { title: string; description: string; published: string; updated: string };
  Content: astroHTML.JSX.Element;
}

const files = import.meta.glob<Omit<Post, "slug">>("../blog/ja/*.md", { eager: true });

// posts are the published posts, newest first.
export const posts: Post[] = Object.entries(files)
  .map(([file, { frontmatter, Content }]) => ({ slug: file.split("/").pop()!.replace(/\.md$/, ""), frontmatter, Content }))
  .sort((a, b) => b.frontmatter.published.localeCompare(a.frontmatter.published));

// dated is how a post's date reads on the page.
export function dated(day: string) {
  return new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(day));
}
