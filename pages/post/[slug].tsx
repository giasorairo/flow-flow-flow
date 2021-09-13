import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markd from 'marked';
import Link from 'next/link';
import Layout from '../../components/layout/layout';
import { FrontMatterType } from '../../models';
import { useRouter } from 'next/dist/client/router';
import Button from '../../components/button/button';
import styles from './post-page.module.css';

type PostPageProps = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

export default function PostPage(props: PostPageProps) {
  const { frontmatter, slug, content } = props;
  const router = useRouter();
  return (
    <Layout>
      <>
        <Button label="< back" onClick={() => { router.push('/') }} />
        <div className={styles.post}>
          <h1 className={styles.title}>{ frontmatter.title }</h1>
          <p className="post-date">{ frontmatter.date }</p>
          <div className={styles.thumbnailWrapper}>
            <img src={frontmatter.cover_image} alt="" />
          </div>
          <div className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: markd(content) }} />
          </div>
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