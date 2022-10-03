import { Center, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import { NextChakraLink } from '../../ui/next-chakra-link/next-chakra-link';

const About = () => {
  return (
    <Center as={'main'} h={{ base: 'calc(100vh - 60px)', md: 'calc(100vh - 200px)' }} flexDirection={'column'} alignItems={'start'}>

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
          <NextChakraLink
            label={'twitter'}
            linkParam={{
              href: 'https://mobile.twitter.com/gia_sorairo',
            }}
          />
        </ListItem>
        <ListItem>
          <NextChakraLink
            label={'zenn'}
            linkParam={{
              href: 'https://zenn.dev/gia',
            }}
          />
        </ListItem>
        <ListItem>
          <NextChakraLink
            label={'qiita'}
            linkParam={{
              href: 'https://qiita.com/gia_sorairo',
            }}
          />
        </ListItem>
      </UnorderedList>
    </Center>
  );
};

export default About;