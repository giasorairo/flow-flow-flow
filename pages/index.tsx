import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout/layout';
import { FrontMatterType, PostType } from '../models';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '../components/post/post';
import { sortByDate } from '../utils';
import styles from './root.module.css';

type HomeProps = {
  posts: PostType[],
  pages: number[],
};

export default function Home(props: HomeProps) {
  const { posts, pages } = props;
  return (
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
          {pages.map((v, i) => <Link key={i} href={`/page/${v}`}><a><span>{v}</span></a></Link>)}
        </div>
      </div>
    </Layout>
  )
}

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
  // ページURL生成
  const pages = new Array(Math.ceil(files.length / Number(process.env.DISPLAY_POST_NUM_PER_PAGE))).fill(null).map((_, i) => i + 1);
  return {
    props: { posts: posts.sort(sortByDate).splice(0, Number(process.env.DISPLAY_POST_NUM_PER_PAGE)), pages },
  };
}
