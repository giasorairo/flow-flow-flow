import Layout from '../../../components/layout/layout';
import fs from 'fs';
import path from 'path';
import { FrontMatterType, PostType } from '../../../models';
import matter from 'gray-matter';
import { sortByDate } from '../../../utils';
import Post from '../../../components/post/post';
import styles from '../../root.module.css';
import categoryStyles from './category-page.module.css'
import Link from 'next/link';

type CategoryPagePropsType = {
  posts: PostType[],
  category: string,
};

export default function CategoryPage(props: CategoryPagePropsType) {
  const { posts, category } = props;
  return (
    <>
      <Layout>
        <div>
          <p className={categoryStyles.category}>{`category: ${category}`}</p>
          <main>
            <div>
              {posts.map((post, index) => (
                <div className={styles.post} key={index}><Post post={ post } /></div>
              ))}
            </div>
          </main>
        </div>
      </Layout>
    </>
  ); 
};


export async function getStaticPaths() {
  // postsディレクトリ内のファイル名の配列を取得
  const files = fs.readdirSync(path.join('posts'));
  // カテゴリの配列を取得
  const categories = files.reduce((a, fileName) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    const { category } = frontmatter;
    (category as string).split(',').forEach((c) => {
      if (c && !a.includes(c)) {
        a.push(c);
      }
    });
    return a;
  }, []);
  const paths = categories.map((category) => ({
    params: {
      slug: category,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params: { slug } }) {
  // postsディレクトリからファイルを取得する
  const files = fs.readdirSync(path.join('posts'));
  // slug と frontmatter をpostsから取得
  const posts: PostType[] = files.map((fileName) => {
    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    // return
    return {
      slug: fileName.replace('.md', ''),
      frontmatter: frontmatter as FrontMatterType,
    }
  });
  // カテゴリで記事を絞り込みして、日付でソート
  const displayPost = posts
    .filter((post) => post.frontmatter.category.split(',').includes(slug))
    .sort(sortByDate);
  return {
    props: { posts: displayPost, category: slug }
  };
}