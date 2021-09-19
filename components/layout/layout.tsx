import Head from 'next/head';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styles from './layout.module.css';

export default function Layout(props: { children: JSX.Element }) {
  const { children } = props;
  // ---------------------------- DOM ----------------------------
  return (
    <div>
      <Head>
        <title>二畳Lab</title>
        {/* タブ部分のファビコン設定 */}
        <link rel="icon" href="/images/icon/icon.png" />
        {/* スマホのホーム画面に表示されるショートカットアイコン設定 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;900&display=swap" rel="stylesheet" />
        {/* OGPの設定 */}
        <meta name="description" key="description" content="てきとうなことばっかり書いているブログ" />
        <meta property="og:url" content="https://nijyo-lag.web.app/" />
        <meta property="og:title" key="ogTItle" content="二畳Lab" />
        <meta property="og:site_name" key="ogSiteName" content="二畳ラボ" />
        <meta
          property="og:description"
          key="ogDescription"
          content="てきとうなことばっかり書いているブログ"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" key="ogImage" content="https://nijyo-lag.web.app/images/posts/img1.jpg" />
        {/* twitterOGP */}
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content="https://nijyo-lag.web.app/images/posts/img1.jpg" />
      </Head>
      <header className={styles.header}>
        <Link href="/"><div>二畳Lab</div></Link>
      </header>
      {children}
      <footer className={styles.footer}>ふったー</footer>
    </div>
  );
}