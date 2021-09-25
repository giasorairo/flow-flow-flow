import styles from './button.module.scss';

type ButtonProps = {
  label: string,
  onClick: () => void,
};

export default function Button(props: ButtonProps) {
  const { label, onClick } = props;
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={styles.button}
      >
        {label}
      </button>
    </>
  );
};