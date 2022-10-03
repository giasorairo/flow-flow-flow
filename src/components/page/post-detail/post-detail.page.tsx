import { FrontMatterType } from '../../../models';
import Layout from '../../layout/layout';
import Article from './post-detail';

type PropsType = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

const PostDetailPage = (props: PropsType) => {
  const { frontmatter, slug, content } = props;
  return (
    <Layout>
      <Article frontmatter={frontmatter} slug={slug} content={content} />
    </Layout>
  );
};

export default PostDetailPage;