import {
  Box,
  Flex,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const NavigationBar = () => {
  return (
    <Box zIndex={1}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('pink.200', 'pink.400')}
        align={'center'}
        display={{ base: 'none', md: 'flex' }}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'center' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <MobileNav />
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('pink.200', 'white');
  const { asPath } = useRouter();

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <NextLink href={navItem.href} passHref>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  borderBottom={navItem.href === asPath ? 1 : 0}
                  borderStyle={'solid'}
                  borderColor={useColorModeValue('pink.200', 'gray.900')}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </NextLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      zIndex={1}
      bg={useColorModeValue('white', 'gray.600')}
      h='50px'
      display={{ base: 'flex', md: 'none' }}
      position='fixed'
      bottom='0'
      right={0}
      flexDirection='row'
      w='full'
      justifyContent='space-around'
      alignItems={'start'}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('pink.200', 'gray.900')}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem}/>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { asPath } = useRouter();
  const linkHoverColor = useColorModeValue('pink.200', 'white');
  return (
    <Stack
      w='full'
      h='full'
      display='flex'
      justifyContent='center'
      alignItems='center'
      css={{
        marginTop: '0 !important',
      }}
      borderRight={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('pink.200', 'pink.400')}
    >
      <Box>
        <NextLink href={href} passHref>
          <Link
            w='full'
            h='full'
            color={useColorModeValue('gray.600', 'pink')}
            pb={10}
            textDecoration={ href === asPath ? 'underline 5px' : 'none'}
            textDecorationStyle='solid'
            textUnderlineOffset='5px'
            textDecorationColor={useColorModeValue('pink.200', 'pink.400')}
            _hover={{
              textDecoration: href === asPath ? 'underline 5px' : 'none',
              textDecorationStyle: 'solid',
              textUnderlineOffset: '5px',
              textDecorationColor: 'pink.200',
              color: linkHoverColor,
            }}
          >
            {label}
          </Link>
        </NextLink>
      </Box>
    </Stack>
  );
};

type NavItem = {
  label: string,
  href: string,
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'post',
    href: '/post',
  },
  {
    label: 'product',
    href: '/product',
  },
  {
    label: 'about',
    href: '/about',
  },
];