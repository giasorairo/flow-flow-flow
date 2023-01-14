import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { PostType } from '../../../models';
import NextLink from 'next/link';

type PostProps = {
  posts: PostType[],
  categories: string[],
  tags: string[],
};

export const Post = (props: PostProps) => {
  const { posts } = props;

  return (
    <Box
      marginTop={{ base: undefined, md: '40px' }}
      marginBottom={{ base: '40px', md: undefined }}
      paddingY={4}
    >

      {/* category */}
      {/* <Box>
        <Heading as={'h2'} fontWeight={'medium'} color={'gray.600'} fontSize={'1.1rem'}>category</Heading>
        <Box p={1} />
        <Flex gap={2} flexWrap={'wrap'}>
          {categories.map((category) => (
            <NextLink href={`/post`} passHref>
              <Link
                backgroundColor={'pink.100'}
                p={1.5}
                rounded={'md'}
                color={'gray.600'}
                _hover={{
                  color: 'pink.200',
                  backgroundColor: 'pink.500',
                }}
              >
                #{category}
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Box> */}

      {/* <Box p={2} /> */}

      {/* tag */}
      {/* <Box>
        <Heading as={'h2'} fontWeight={'medium'} color={'gray.600'} fontSize={'1.1rem'}>tag</Heading>
        <Box p={1} />
        <Flex gap={2} flexWrap={'wrap'}>
          {tags.map((tag) => (
            <NextLink href={`/post`} passHref>
              <Link
                as={'a'}
                backgroundColor={'pink.100'}
                p={1.5}
                rounded={'md'}
                color={'gray.600'}
                _hover={{
                  color: 'pink.200',
                  backgroundColor: 'pink.500',
                }}
              >
                #{tag}
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Box> */}
      
      <Flex as={'section'} justifyContent={'center'}>
        <Flex flexDirection={'column'} gap={10} maxWidth={'620px'} paddingX={'10px'}>
          {posts.map((post) => (
            <NextLink key={post.slug} href={`/post/${post.slug}`}>
              <Box flexDirection={'column'}>
                <Heading
                  as={'h2'}
                  fontSize={{ base: '1.1rem', md: '1.3rem'}}
                  fontWeight={'600'}
                  color={'gray.600'}
                  _hover={{
                    color: 'pink.200',
                  }}
                >
                  {post.frontmatter.title}
                </Heading>
                <Box p={1} />
                <Text color={'gray.500'}>{post.frontmatter.date}</Text>
                <Box p={1} />
                <Text color={'gray.500'}>{post.frontmatter.excerpt}</Text>
              </Box>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};