import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import styles from './link-item.module.scss';

type Props = {
  children: ReactNode,
  linkProps: LinkProps,
}

export const LinkItem = ({ children, linkProps }: Props) => {
  return (
    <Link {...linkProps} className={styles['link-item']}>
      { children }
    </Link>
  );
};
