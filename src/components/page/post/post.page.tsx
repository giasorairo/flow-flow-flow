import { PostType } from '../../../models';
import Layout from '../../layout/layout';
import { Post } from './post';

type PostPageProps = {
  posts: PostType[],
  categories: string[],
  tags: string[],
};

export const PostPage = (props: PostPageProps) => {
  const { posts, categories, tags } = props;
  return (
    <Layout>
      <Post posts={posts} categories={categories} tags={tags} />
    </Layout>
  );
};
