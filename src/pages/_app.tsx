import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import GoogleAnalytics from '../components/functional/google-analytics/google-analytics';
import { RecoilRoot } from 'recoil';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Script from 'next/script';

const theme = extendTheme({
  fonts: {
    heading: 'Noto Sans JP, sans-serif;',
    body: 'Noto Sans JP, sans-serif;',
  },
})

function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Script
        id={'adsense'}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7112973654947785"
        crossOrigin="anonymous"
      />
      <GoogleAnalytics />
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}

export default App;
