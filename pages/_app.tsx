import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/destyle.css';
import '../styles/globals.scss';
// import '../components/post/post.scss';
// import '../components/post/post.scss';

function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Component {...pageProps} />
  );
}

export default App;
