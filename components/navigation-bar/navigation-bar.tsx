import Link from 'next/link';
import styles from './navigation-bar.module.scss';

export const NavigationBar = () => {
  return (
    <nav className={styles['navigation_bar']}>
      <img src="/images/icon/icon.png" alt="icon" />
      <ul>
        <li><h3><Link href="/"><a>about</a></Link></h3></li>
        <li><h3><a>product</a></h3></li>
        <li><h3>category</h3></li>
        <ul>
          <li><Link href="/category/JavaScript">JavaScript</Link></li>
          {/* <li><Link href="/category/node.js">Node.js</Link></li> */}
          <li></li>
        </ul>
      </ul>
    </nav>
  );
};