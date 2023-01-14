import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FrontMatterType } from '../../../models';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import PostDetail from '../../../components/page/post-detail/post-detail.page';

type PostPageProps = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

export default function PostPage(props: PostPageProps) {
  const { frontmatter, slug, content } = props;
  // ---------------- useEffect ----------------
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <PostDetail frontmatter={frontmatter} slug={slug} content={content} />
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}