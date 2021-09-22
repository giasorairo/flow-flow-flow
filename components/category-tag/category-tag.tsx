import styles from './category-tag.module.css';

type PropsType = {
  category: string,
  onClick: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
};

export const CategoryTag = (props: PropsType) => {
  const { category, onClick } = props;
  return (
    <span
      className={styles.categoryTag}
      onClick={onClick}
    >
      #{category}
    </span>
  );
};