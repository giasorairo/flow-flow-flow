import Link from 'next/link';
import styles from './navigation-bar.module.scss';

export const NavigationBar = () => {
  
  return (
    <nav className={styles['navigation_bar']}>
      <img src="/images/icon/icon.png" alt="icon" />
      <ul>
        <li><h3><Link href="/about"><a>about</a></Link></h3></li>
        <li><h3><Link href="/product"><a>product</a></Link></h3></li>
        <li><h3>category</h3></li>
        <ul>
          <li><Link href="/category/javascript"><a>javascript</a></Link></li>
          <li><Link href="/category/react">react</Link></li>
          <li><Link href="/category/node.js">node.js</Link></li>
          <li><Link href="/category/express">express</Link></li>
          <li><Link href="/category/firebase">firebase</Link></li>
          <li><Link href="/category/read">read</Link></li>
          <li><Link href="/category/diary">diary</Link></li>
        </ul>
      </ul>
    </nav>
  );
};