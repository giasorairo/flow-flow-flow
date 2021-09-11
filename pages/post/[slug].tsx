import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markd from 'marked';
import Link from 'next/link';
import Layout from '../../components/layout/layout';
import { FrontMatterType } from '../../models';
import { useRouter } from 'next/dist/client/router';

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
        <button type="button" onClick={() => { router.push('/') }}>go back</button>
        <div className="card-page">
          <h1>{ frontmatter.title }</h1>
          <div className="post-date">{ frontmatter.date }</div>
          <img src={frontmatter.cover_image} alt="" width="100%"/>
          <div>
            <div dangerouslySetInnerHTML={{ __html: markd(content) }} />
          </div>
        </div>
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