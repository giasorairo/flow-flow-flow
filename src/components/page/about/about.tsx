import { Center, Heading, ListItem, UnorderedList, Box } from '@chakra-ui/react';
import { LinkItem } from '../../atom/link-item/link-item';
import { NextChakraLink } from '../../ui/next-chakra-link/next-chakra-link';

const About = () => {
  return (
    <Center
      as={'main'}
      flexDirection={'column'}
      marginTop={{ base: undefined, md: '40px' }}
      marginBottom={{ base: '40px', md: undefined }}
      paddingY={4}
    >
      <Box
        maxWidth={'620px'}
        paddingX={'20px'}
        paddingY={4}
      >

        <Heading as={'h3'} fontSize={'1.5rem'} my={3} borderBottom={'1px solid pink'} pb={1}>me</Heading>
        <UnorderedList listStylePos={'inside'}>
          <ListItem>1991年生まれ</ListItem>
          <ListItem>愛媛大学理学部化学科中退</ListItem>
          <ListItem>フロントエンドエンジニア</ListItem>
          <ListItem>小説とプログラミングが好き☕</ListItem>
        </UnorderedList>

        <Heading as={'h3'} fontSize={'1.5rem'} my={3} borderBottom={'1px solid pink'} pb={1}>skill</Heading>
        <UnorderedList listStylePos={'inside'}>
          <ListItem>typescript</ListItem>
          <ListItem>react / next.js</ListItem>
          <ListItem>electron</ListItem>
          <ListItem>node.js</ListItem>
          <ListItem>express</ListItem>
        </UnorderedList>

        <Heading as={'h3'} fontSize={'1.5rem'} my={3} borderBottom={'1px solid pink'} pb={1}>media</Heading>
        <UnorderedList listStylePos={'inside'}>
          <ListItem>
            <LinkItem
              linkProps={{
                href: 'https://mobile.twitter.com/gia_sorairo',
              }}
            >
              twitter
            </LinkItem>
          </ListItem>
          <ListItem>
            <LinkItem
              linkProps={{
                href: 'https://zenn.dev/gia',
              }}
            >
              zenn
            </LinkItem>
          </ListItem>
          <ListItem>
            <LinkItem
              linkProps={{
                href: 'https://qiita.com/gia_sorairo',
              }}
            >
              qiita
            </LinkItem>
          </ListItem>
        </UnorderedList>
      </Box>
    </Center>
  );
};

export default About;