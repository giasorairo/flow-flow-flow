export type PostType = {
  slug: string,
  frontmatter: FrontMatterType,
};

export type FrontMatterType = {
  title: string,
  date: string,
  excerpt: string,
  cover_image: string,
  category: string,
};