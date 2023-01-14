import Head from 'next/head';
import {
  Box,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { LinkItem } from '../atom/link-item/link-item';
import { ReactNode } from 'react';

export default function Layout(props: { children: ReactNode }) {
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
        {children}
        <NavigationBar />
      </Box>
    </>
  );
}


type NavigationItem = { label: string, path: string };

const NavigationBar = () => {
  const NAVIGATION_ITEMS: NavigationItem[] = [
    { label: 'top', path: '/' },
    { label: 'blog', path: '/post' },
    { label: 'product', path: '/product' },
    { label: 'about', path: '/about' },
  ];
  return (
    <Box
      position={'fixed'}
      width={'full'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'40px'}
      bottom={{ base: 0, md: undefined }}
      borderBottom={{ base: undefined, md: 'solid 1px #ddd' }}
      borderTop={{ base: 'solid 1px #ddd', md: undefined }}
      top={{ base: undefined, md: 0 }}
      backgroundColor="#fff"
    >
      <UnorderedList
        display={'flex'}
        listStyleType={'none'}
        justifyContent={'space-around'}
        width={'full'}
        maxWidth={'300px'}
        margin={0}
      >
        {NAVIGATION_ITEMS.map((item, itemIndex) => (
          <>
            <ListItem
              css={{
                a: {
                  color: '#aaa !important',
                  '&:hover': {
                    color: 'pink !important',
                  },
                }
              }}
            >
              <LinkItem
                linkProps={{ href: item.path }}
              >
                {item.label}
              </LinkItem>
            </ListItem>
            {itemIndex === NAVIGATION_ITEMS.length - 1
              ? <></>
              : <Box><Divider orientation='vertical' h={'full'} /></Box>}
          </>
        ))}
      </UnorderedList>
    </Box>
  );
};