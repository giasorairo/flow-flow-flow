import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/destyle.css';
import '../styles/globals.scss';
import GoogleAnalytics from '../components/google-analytics/google-analytics';
import usePageView from '../hooks/use-page-view/use-page-view';
import { RecoilRoot } from 'recoil';

function App(props: AppProps) {
  const { Component, pageProps } = props;
  usePageView();
  return (
    <>
      <GoogleAnalytics />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default App;
