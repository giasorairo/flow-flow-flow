import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useCallback } from 'react';
import { PostType } from '../../models';
import Button from '../button/button';
import styles from './post.module.css';

type PostProps = {
  post: PostType,
};

export default function Post (props: PostProps) {
  const router = useRouter();
  const { post } = props;
  /**
   * カテゴリクリック時のハンドラ
   * 
   * カテゴリページヘのページ遷移
   */
  const handlerClickCategory = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/category/${post.frontmatter.category}`)
  }, [post]);
  return (
    <div className={styles.card} onClick={() => { router.push(`/post/${post.slug}`)}}>
      <>
        <div className={styles.thumbnailWrapper}>
          <img src={post.frontmatter.cover_image} alt="" />
        </div>
        <p>
          {post.frontmatter.date}
          <span
            className={styles.categoryTag}
            onClick={handlerClickCategory}>
            {`#${post.frontmatter.category}`}
          </span>
        </p>
        <h2 className={styles.title}>{`[${post.frontmatter.category}] ${post.frontmatter.title}`}</h2>
        <p>{post.frontmatter.excerpt}...</p>
        <div className={styles.readMoreButtonWrapper}>
          <Button
            label="read more >"
            onClick={() => { router.push(`/post/${post.slug}`)}}
          />
        </div>
      </>
    </div>
  );
};