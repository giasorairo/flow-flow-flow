import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markd from 'marked';
import Head from 'next/head';
import Layout from '../../../components/layout/layout';
import { FrontMatterType } from '../../../models';
import { useRouter } from 'next/dist/client/router';
import Button from '../../../components/button/button';
import styles from './post-page.module.css';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { ShareButtons } from '../../../components/share-buttons';

type PostPageProps = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

export default function PostPage(props: PostPageProps) {
  const { frontmatter, slug, content } = props;
  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Layout>
      <>
        {/* headタグの中の上書き */}
        <Head>
          {/* OGPの設定 */}
        <meta name="description" key="description" content={frontmatter.excerpt} />
        <meta property="og:site_name" key="ogSiteName" content="二畳ラボ" />
        <meta property="og:title" key="ogTItle" content={`[${frontmatter.category}] ${frontmatter.title}`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
        <meta
          property="og:description"
          key="ogDescription"
          content={frontmatter.excerpt}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image}`} />
        {/* twitterOGP */}
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image}`} />
        </Head>
        {/* ページの内容 */}
        <Button label="< back" onClick={() => { router.push('/') }} />
        <div className={styles.post}>
          <h1 className={styles.title}>{`[${frontmatter.category}] ${frontmatter.title}`}</h1>
          <p className="post-date">{frontmatter.date}</p>
          <div className={styles.thumbnailWrapper}>
            <img src={frontmatter.cover_image} alt="" />
          </div>
          <div className={`${styles.content} prose`}>
            <div dangerouslySetInnerHTML={{ __html: markd(content) }} />
          </div>
        </div>
        {/* シェアボタン */}
        <div className={styles.shareButtonsWrapper}>
          <ShareButtons slug={slug} frontmatter={frontmatter} />
        </div>
        <Button label="< back" onClick={() => { router.push('/') }} />
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