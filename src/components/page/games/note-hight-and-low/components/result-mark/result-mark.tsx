import { Flex, keyframes } from "@chakra-ui/react";

type Props = {
  isCorrect: boolean;
};

const animation = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 70%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const myAnimation = `${animation} .3s`;

export const ResultMark = (props: Props) => {
  const { isCorrect } = props;
  return (
    <Flex
      position={"absolute"}
      fontSize="5xl"
      color="green"
      top="50%"
      left="50%"
      transform={"translate(-50%, -40%)"}
      animation={myAnimation}
    >
      {isCorrect ? "👍👍👍" : "😢😢😢"}
    </Flex>
  );
};
