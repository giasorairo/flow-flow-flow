import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markd from 'marked';
import Head from 'next/head';
import Layout from '../../../components/layout/layout';
import { FrontMatterType } from '../../../models';
import { useRouter } from 'next/dist/client/router';
import Button from '../../../components/button/button';
import styles from './post-page.module.scss';
import Prism from 'prismjs';
import React, { useCallback, useEffect } from 'react';
import { ShareButtons } from '../../../components/share-buttons';
import { CategoryTag } from '../../../components/category-tag';
import Link from 'next/link';

type PostPageProps = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

export default function PostPage(props: PostPageProps) {
  const { frontmatter, slug, content } = props;
  const router = useRouter();
  // ---------------- useEffect ----------------
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Layout>
      <>
        {/* headタグの中の上書き */}
        <Head>
          <title>{frontmatter.title}</title>
            {/* OGPの設定 */}
          <meta name="description" key="description" content={frontmatter.excerpt} />
          <meta property="og:site_name" key="ogSiteName" content="二畳ラボ" />
          <meta property="og:title" key="ogTItle" content={frontmatter.title} />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
          <meta
            property="og:description"
            key="ogDescription"
            content={frontmatter.excerpt}
          />
          <meta property="og:type" content="article" />
          <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image || '/images/icon/icon.png'}`} />
          {/* twitterOGP */}
          <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
          <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image || '/images/icon/icon.png'}`} />
        </Head>
        <Link href="/"><a><Button label="< back" onClick={() => {}} /></a></Link>
        {/* ページの内容 */}
        <div className={styles.post}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
          <p>
            {frontmatter.category.split(',').map((v, i) => (
              <React.Fragment key={i}>
                <CategoryTag
                  category={v}
                />
              </React.Fragment>
            ))}
          </p>
          {frontmatter.cover_image
            ? (
              <div className={styles['thumbnail-wrapper']}>
                <img src={frontmatter.cover_image} alt="" />
              </div>
            )
            : <></>
          }
          <div className={`${styles.content} prose`}>
            <div dangerouslySetInnerHTML={{ __html: markd(content) }} />
          </div>
        </div>
        {/* シェアボタン */}
        <div className={styles.shareButtonsWrapper}>
          <ShareButtons slug={slug} frontmatter={frontmatter} />
        </div>
        <Link href="/"><a><Button label="< back" onClick={() => {}} /></a></Link>
      </>
    </Layout>
  );
};

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
};

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