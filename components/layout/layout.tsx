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
        <title>二畳ラボ</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;900&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>
        <div>二畳ラボ</div>
      </header>
      {children}
    </div>
  );
}