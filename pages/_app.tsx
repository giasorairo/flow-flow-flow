import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/destyle.css';
import '../styles/globals.scss';
import GoogleAnalytics from '../components/google-analytics/google-analytics';
import usePageView from '../hooks/use-page-view/use-page-view';

function App(props: AppProps) {
  const { Component, pageProps } = props;
  usePageView();
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default App;
