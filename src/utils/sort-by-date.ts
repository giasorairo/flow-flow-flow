import { PostType } from "../models";

export const sortByDate = (a: PostType, b: PostType): number => {
  return Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date));
}