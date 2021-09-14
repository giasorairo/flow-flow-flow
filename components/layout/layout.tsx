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
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;900&display=swap" rel="stylesheet" />
        {/* OGPの設定 */}
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#" />
        <meta property="og:url" content="https://nijyo-lag.web.app/" />
        <meta property="og:type" content="blog" />
        <meta property="og:title" content="title" />
        <meta property="og:description" content="両手の届く範囲のことだけを書いているブログ" />
        <meta property="og:site_name" content="二畳ラボ" />
        <meta property="og:image" content="/images/posts/img1.jpg" />
      </Head>
      <header className={styles.header}>
        <Link href="/"><div>二畳Lab</div></Link>
      </header>
      {children}
      <footer className={styles.footer}>ふったー</footer>
    </div>
  );
}