import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import { PostType } from '../../models';
import Button from '../button/button';
import styles from './post.module.scss';
import { CategoryTag } from '../../components/category-tag';
import Link from 'next/link';

type PostProps = {
  post: PostType,
};

export default function Post (props: PostProps) {
  const router = useRouter();
  const { post } = props;
  return (
    <div className={styles.card}>
      <>
        {/* {post.frontmatter.cover_image
          ? (
            <div className={styles['thumbnail-wrapper']}>
              <img src={post.frontmatter.cover_image} alt="" />
            </div>
          )
          : <></>
        } */}
        <p>{post.frontmatter.date}</p>
        <p>
          {post.frontmatter.category.split(',').map((v, i) => (
            <React.Fragment key={i}>
              <CategoryTag
                category={v}
              />
            </React.Fragment>
          ))}
        </p>
        <Link href={`/post/${post.slug}`}><a><h2 className={styles['title']}>{post.frontmatter.title}</h2></a></Link>
        {/* <p>{post.frontmatter.excerpt}...</p> */}
        {/* <div className={styles['read-more-button-wrapper']}>
          <Link href={`/post/${post.slug}`}>
            <a>
              <Button
                label="read more >"
                onClick={() => {}}
              />
            </a>
          </Link>
        </div> */}
      </>
    </div>
  );
};