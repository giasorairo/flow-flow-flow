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

type HomeProps = {
  posts: PostType[],
};

export default function Home(props: HomeProps) {
  const { posts } = props;
  return (
    <Layout>
      <div>
        <main>
          <div className="post">
            {posts.map((post, index) => (
              <div key={index}><Post post={ post } /></div>
            ))}
          </div>
        </main>
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
  return {
    props: { posts: posts.sort(sortByDate) }
  };
}
