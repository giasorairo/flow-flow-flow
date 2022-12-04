import { Text, Center } from '@chakra-ui/react';
import { useWindowSize } from 'usehooks-ts';

const Home = () => {

  const { height } = useWindowSize();

  return (
    <Center h={height}>
      <Text>flow-flow-flow</Text>
    </Center>
  );
};

export default Home;