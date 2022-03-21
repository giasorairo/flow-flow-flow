import Link from 'next/link';
import styles from './category-tag.module.css';

type PropsType = {
  category: string,
};

export const CategoryTag = (props: PropsType) => {
  const { category } = props;
  return (
    <Link href={`/category/${category}`}>
      <a>
        <span
          className={styles.categoryTag}
        >
          #{category}
        </span>
      </a>
    </Link>
  );
};