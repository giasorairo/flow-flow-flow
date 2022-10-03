import Head from 'next/head';
import { Box, useColorModeValue, Center } from '@chakra-ui/react';
import { NavigationBar } from '../ui/navigation-bar/navigation-bar';

export default function Layout(props: { children: JSX.Element }) {
  const { children } = props;

  return (
    <>
      <Head>
        <title>flow-flow-flow</title>
        {/* タブ部分のファビコン設定 */}
        <link rel="icon" href="/images/icon/icon.png" />
        {/* スマホのホーム画面に表示されるショートカットアイコン設定 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon/icon.png" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;900&display=swap" rel="stylesheet" /> */}
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
      </Head>
      <Box minH='100vh' color={useColorModeValue('gray.600', 'gray.200')}>
        <NavigationBar />
        <Center marginTop={{ base: 2, md: 6 }} marginBottom={{ base: '100px', md: '30px' }} zIndex={0}>
          <Box maxW={'920px'} px={'10px'} overflow={'auto'}>
            {children}
          </Box>
        </Center>
      </Box>
    </>
  );
}