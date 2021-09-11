import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { PostType } from '../../models';

type PostProps = {
  post: PostType,
};

export default function Post (props: PostProps) {
  const router = useRouter();
  const { post } = props;
  return (
    <div className="card">
      <>
        <img src={post.frontmatter.cover_image} alt="" width="100%" />
        <div className="post-date">{post.frontmatter.date}</div>
        <h3>{post.frontmatter.title}</h3>
        <p>{post.frontmatter.excerpt}</p>
        <button type="button" onClick={() => { router.push(`/post/${post.slug}`) }}>
          read More
        </button>
      </>
    </div>
  );
};