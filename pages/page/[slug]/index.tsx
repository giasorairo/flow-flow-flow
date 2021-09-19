import Layout from '../../../components/layout/layout';
import fs from 'fs';
import path from 'path';
import { FrontMatterType, PostType } from '../../../models';
import matter from 'gray-matter';
import { sortByDate } from '../../../utils';
import Post from '../../../components/post/post';
import styles from '../../root.module.css';
import Link from 'next/link';

type PagePropsType = {
  slug: string,
  posts: PostType[],
  pages: number[],
};

export default function Page(props: PagePropsType) {
  const { slug, posts, pages } = props;
  return (
    <>
      <Layout>
        <div>
          <main>
            <div>
              {posts.map((post, index) => (
                <div className={styles.post} key={index}><Post post={ post } /></div>
              ))}
            </div>
          </main>
          <div className={styles.pageNationWrapper}>
            {pages.map((v, i) => <Link key={i} href={`/page/${v}`}><span>{v}</span></Link>)}
         </div>
        </div>
      </Layout>
    </>
  ); 
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  // 1ページに表示する記事の数
  const displayPostNumPerPage = 2;
  // ページURL生成
  const pages = new Array(Math.ceil(files.length / displayPostNumPerPage)).fill(null).map((_, i) => i + 1);
  const paths = pages.map((v) => ({
    params: {
      slug: v.toString(),
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
      slug,
      frontmatter: frontmatter as FrontMatterType,
    }
  });
  // ページ数の配列
  const pages = new Array(Math.ceil(files.length / Number(process.env.DISPLAY_POST_NUM_PER_PAGE))).fill(null).map((_, i) => i + 1);
  const postSortedByDate = posts.sort(sortByDate);
  // (displayPostNumPerPage * (page - 1)) から、displayPostNumPerPage個のpostを取り出す
  const displayPost = postSortedByDate.splice(Number(process.env.DISPLAY_POST_NUM_PER_PAGE) * (Number(slug) - 1), Number(process.env.DISPLAY_POST_NUM_PER_PAGE));
  return {
    props: { posts: displayPost, pages }
  };
}