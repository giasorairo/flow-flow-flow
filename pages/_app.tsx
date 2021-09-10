import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/destyle.css';
import '../styles/globals.css';

function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Component {...pageProps} />
  );
}

export default App;
