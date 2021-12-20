import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { PostType } from '../../models';
import Button from '../button/button';
import styles from './post.module.scss';
import { CategoryTag } from '../../components/category-tag';

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
  const handlerClickCategory = useCallback((category: string) => {
    router.push(`/category/${category}`)
  }, [post]);
  return (
    <div className={styles.card} onClick={() => { router.push(`/post/${post.slug}`)}}>
      <>
        {post.frontmatter.cover_image
          ? (
            <div className={styles['thumbnail-wrapper']}>
              <img src={post.frontmatter.cover_image} alt="" />
            </div>
          )
          : <></>
        }
        <p>{post.frontmatter.date}</p>
        <p>
          {post.frontmatter.category.split(',').map((v, i) => (
            <React.Fragment key={i}>
              <CategoryTag
                category={v}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlerClickCategory(v);
                }}
              />
            </React.Fragment>
          ))}
        </p>
        <h2 className={styles['title']}>{post.frontmatter.title}</h2>
        {/* <p>{post.frontmatter.excerpt}...</p> */}
        <div className={styles['read-more-button-wrapper']}>
          <Button
            label="read more >"
            onClick={() => { router.push(`/post/${post.slug}`)}}
          />
        </div>
      </>
    </div>
  );
};