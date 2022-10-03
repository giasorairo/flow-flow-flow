import { Box, Flex, Heading, Button, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FrontMatterType } from '../../../models';
import { Adsense } from '../../functional/adsense/adsense';
import marked from 'marked';
import 'github-markdown-css/github-markdown-light.css';
import { SocialButtons } from '../../ui/social-buttons/social-buttons';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

type PropsType = {
  frontmatter: FrontMatterType,
  slug: string,
  content: string,
};

const PostDetail = (props: PropsType) => {
  const { frontmatter, slug, content } = props;
  return (
    <Box>
      {/* headタグの中の上書き */}
      <Head>
        <title>{frontmatter.title}</title>
          {/* OGPの設定 */}
        <meta name="description" key="description" content={frontmatter.excerpt} />
        <meta property="og:site_name" key="ogSiteName" content="flow-flow-flow" />
        <meta property="og:title" key="ogTItle" content={frontmatter.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${slug}`} />
        <meta
          property="og:description"
          key="ogDescription"
          content={frontmatter.excerpt}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image || '/images/icon/icon.png'}`} />
        {/* twitterOGP */}
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image || '/images/icon/icon.png'}`} />
      </Head>
      {/* <NextLink href="/" passHref><Button as={'link'}>back</Button></NextLink> */}
      {/* ページの内容 */}
      <Box as={'main'}>
        <Box marginY={4}>
          <NextLink href={'/post'}>
            <Button leftIcon={<ArrowLeftIcon />} color={'pink'} variant={'outline'}>
              back
            </Button>
          </NextLink>
        </Box>
        <Heading as={'h1'} fontSize={'1.5rem'}>{frontmatter.title}</Heading>
        <Box p={1} />
        <Text color={'gray.200'}>{frontmatter.date}</Text>
        <Box p={4} />
        {frontmatter.cover_image
          ? (
            <Image
              src={frontmatter.cover_image}
              alt="thumbnail"
              maxWidth={'100%'}
              margin={'0 auto'}
              border={'5px solid pink'}
              boxSizing={'border-box'}
            />
          )
          : <></>
        }
        <Box p={4} />
        <Box
          as={'article'}
          className={'markdown-body'}
          css={{
            // background: '#000',
            // color: '#ddd',
            pre: {
              backgroundColor: '#333',
              border: '1px solid #ddd',
            },
            'h1, h2': {
              borderColor: 'pink',
            },
            img: {
              border: '3px solid pink',
              boxSizing: 'border-box',
              margin: '0 auto',
              marginBottom: '30px',
              marginTop: '30px',
              maxWidth: '100%',
              maxHeight: 'auto',
            },
            iframe: {
              margin: '0 auto',
              maxWidth: '100%',
              maxHeight: 'auto',
            },

          }}
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
        <Box p={4} />

        <Flex columnGap={2} justifyContent={'end'}>
          <SocialButtons
            url={`${process.env.NEXT_PUBLIC_URL}/${slug}`}
            title={frontmatter.title}
            iconSize={'40px'}
            media={`${process.env.NEXT_PUBLIC_URL}/images/icon/icon.png`}
          />
        </Flex>

        <Box textAlign={'center'} py={4}>
          <Text>sponsored link</Text>
          <Box p={1} />
          <Adsense />
        </Box>

      </Box>
    </Box>
  );
};

export default PostDetail;
