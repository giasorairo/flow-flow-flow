import { Center, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

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
        <ListItem><a href="https://mobile.twitter.com/gia_sorairo">twitter</a></ListItem>
        <ListItem><a href="https://zenn.dev/gia">zenn</a></ListItem>
      </UnorderedList>
    </Center>
  );
};

export default About;