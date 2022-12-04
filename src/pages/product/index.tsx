import { Box, Center, Heading, Image, Text, Link, Flex, useColorModeValue, UnorderedList, ListItem } from '@chakra-ui/react';
import Layout from '../../components/layout/layout';

const PRODUCTS = [
  {
    name: '名刺代わりの10冊メイカー',
    description: '名刺代わりの小説10選というハッシュタグを OGP と書籍リンク付きで強化するためのアプリです。',
    thumbnail: '/images/product/tenbooksmaker.png',
    link: [
      { title: '名刺代わりの10冊メイカー', href: 'tenboolsmaker.com' },
      { title: 'qiita: 【個人開発】名刺代わりの10冊メイカーというサービスを作ったけど、恥ずかしくて宣伝してなかった', href: 'https://qiita.com/gia_sorairo/items/4aff11325caaf9ae3efd' }
    ]
  },
  {
    name: 'youtube thumbnails getter',
    description: 'Youtube で動画を観ながらその動画のサムネイルを確認できる拡張機能です。\nYoutube で動画を観てるときに、「この動画のサムネイルってどうやって確認するんだ？」ってなってつくりました。',
    thumbnail: '/images/product/youtube-thmubnails-getter.svg',
    link: [
      { title: 'youtube thumbnails getter', href: 'https://chrome.google.com/webstore/detail/youtube-thumbnails-getter/ghhbhfmihfneeonmbchmkfpdcnmolfgo' },
      { title: 'github', href: 'https://github.com/giasorairo/youtube-thumbnails-getter' }
    ]
  },
  {
    name: 'アンダーラインを教えて',
    description: '好きな小説や漫画の一文を twitter で共有するサービスです。',
    thumbnail: '/images/product/your-underline.svg',
    link: [
      { title: 'アンダーラインを教えて', href: 'https://yourunderline.net' }
    ]
  },
];

export default function Product() {
  return (
    <Layout>
      <Center
        marginTop={{ base: undefined, md: '40px' }}
        marginBottom={{ base: '40px', md: undefined }}
        paddingY={4}
      >
        <Box maxWidth={'620px'} paddingX={'10px'}>
          {PRODUCTS.map((product) => (
            <Flex key={product.name} flexDirection={'column'}>
              <Center>
                <Heading
                  as={'h2'}
                  fontSize={'lg'}
                  textDecoration={'underline 4px'}
                  textUnderlineOffset={4}
                  textDecorationStyle={'solid'}
                  textDecorationColor={'pink.200'}
                >
                  {product.name}
                </Heading>
              </Center>
              <Box p={2} />
              <Image py={2} src={product.thumbnail} alt={''} />
              <Box p={2} />
              <Heading as={'h3'} fontSize={'md'}>概要</Heading>
              <Box p={1} />
              {product.description.split('\n').map((text) => (
                <Text>{text}</Text>
              ))}
              <Box p={2}/>
              <Heading as={'h3'} fontSize={'md'}>link</Heading>
              <Box p={1} />
              <UnorderedList listStylePos={'inside'}>
                {product.link.map((link) => (
                  <ListItem key={link.title}>
                    <Link
                      href={link.href}
                      fontWeight={'bold'}
                      color={useColorModeValue('pink.200', 'pink.400')}
                      _hover={{
                        color: useColorModeValue('pink.400', 'pink.600'),
                      }}
                    >
                      {link.title}
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
              <Box pb={8}/>
            </Flex>
          ))}
        </Box>
      </Center>
    </Layout>
  )
};
