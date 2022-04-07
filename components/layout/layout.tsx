import Head from 'next/head';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useNavigationBar } from '../../hooks/use-navigationbar/use-navigationbar';
import { navigationBarStateAtom } from '../../recoil/atom';
import { HamburgerMenu } from '../hamburger-menu/hamburger-menu';
// import { GA_ID } from '../../utils/gtag';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import styles from './layout.module.scss';

export default function Layout(props: { children: JSX.Element }) {
  const { children } = props;
  const navigationBarState = useRecoilValue(navigationBarStateAtom);
  useNavigationBar();
  // ---------------------------- DOM ----------------------------
  return (
    <>
      <Head>
        <title>flow-flow-flow</title>
        {/* タブ部分のファビコン設定 */}
        <link rel="icon" href="/images/icon/icon.png" />
        {/* スマホのホーム画面に表示されるショートカットアイコン設定 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;900&display=swap" rel="stylesheet" />
        {/* OGPの設定 */}
        <meta name="description" key="description" content="すこしずつつよくなる開発ブログ" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:title" key="ogTItle" content="flow-flow-flow" />
        <meta property="og:site_name" key="ogSiteName" content="flow-flow-flow" />
        <meta
          property="og:description"
          key="ogDescription"
          content="すこしずつつよくなる開発ブログ"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/images/icon/icon.png`} />
        {/* twitterOGP */}
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/images/icon/icon.png`} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7112973654947785"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div>
        <div className={styles.header}>
          <Link href="/"><a><div className={styles['header-title']}>flow-flow-flow</div></a></Link>
        </div>
        <div className={styles['container']}>
          <div className={styles['container-main']}>
            {children}
            <footer className={styles['footer']}>
              <a href="https://twitter.com/gia_sorairo">gia&nbsp;</a>のブログ
            </footer>
            <HamburgerMenu />
          </div>
          <div className={styles['container-sidebar-pc']}>
            <NavigationBar />
          </div>
          {navigationBarState.display
            ? (
              <div className={styles['container-sidebar-sp']}>
                <NavigationBar />
              </div>
            )
            : <></>}
        </div>
      </div>
    </>
  );
}