import { Link, LinkProps, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';


export const NextChakraLink = (props: { label: string, linkParam: LinkProps }) => {
  const { label, linkParam } = props;
  const linkHoverColor = useColorModeValue('pink.200', 'white');
  return (
    <NextLink href={props.linkParam.href} passHref>
      <Link
        color={useColorModeValue('pink.300', 'pink')}
        _hover={{
          textDecorationStyle: 'solid',
          textUnderlineOffset: '5px',
          textDecorationColor: 'pink.200',
          color: linkHoverColor,
        }}
        {...linkParam}
      >{label}</Link>
    </NextLink>
  );
};
