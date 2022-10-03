import matter from 'gray-matter';
import path from 'path';
import { PostPage } from '../../components/page/post/post.page';
import { PostType, FrontMatterType } from '../../models';
import { sortByDate } from '../../utils';
import fs from 'fs';
import { NextPage } from 'next';

type HomeProps = {
  posts: PostType[],
  categories: string[],
  tags: string[],
};

const Articles: NextPage<HomeProps> = (props) => {
  const { posts, categories, tags } = props;
  return (
    <PostPage posts={posts} categories={categories} tags={tags} />
  )
};

export async function getStaticProps() {
  // postsディレクトリからファイルを取得する
  const files = fs.readdirSync(path.join('posts'));
  // slug と frontmatter をpostsから取得
  const posts: PostType[] = files.map((fileName) => {
    // crate slug
    const slug = fileName.replace('.md', '');
    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    // return
    return {
      slug,
      frontmatter: frontmatter as FrontMatterType,
    }
  });

  const postsOrderByDateDescending = posts.sort(sortByDate);
  const categories = postsOrderByDateDescending
    .map((post) => post.frontmatter.category)
    .reduce((result, category) => {
      if (result.includes(category)) {
        return result;
      }
      result.push(category);
      return result;
    }, []);
  const tags = postsOrderByDateDescending
    .map((post) => (post.frontmatter.tags))
    .filter((tag) => tag)
    .reduce((result, tagString) => {
      const tagArray = tagString.split(',');
      tagArray.forEach((tag) => {
        if (!result.includes(tag)) {
          result.push(tag);
        }
      });
      return result;
    }, []);

  return {
    props: { posts: postsOrderByDateDescending, categories, tags },
  };
}

export default Articles;
