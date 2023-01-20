import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { TwitterShareButton, TwitterIcon } from "next-share";

type Props = {
  score: number;
  degreeLevelText: string;
  onClickCloseButton: () => void;
};

export const ResultModal = (props: Props) => {
  const { score, degreeLevelText, onClickCloseButton } = props;
  return (
    <Flex
      position={"absolute"}
      top="50%"
      left="50%"
      transform={"translate(-50%, -50%)"}
      bgColor="white"
      width={"300px"}
      borderRadius={"md"}
      padding={4}
      flexDirection="column"
      alignItems={"center"}
      gap={4}
    >
      <Text fontSize={"3xl"}>result</Text>
      <Text fontSize={"2xl"}>your score is {score} 🎉</Text>
      <Flex alignItems={"center"} gap={4}>
        <Text fontSize={"2xl"}>let share</Text>
        <IconButton
          aria-label=""
          icon={<TwitterIcon round={true} size={50} />}
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_URL}/games/note-hight-and-low&text=note hight and low ♪%0D%0Amode: ${degreeLevelText}%0D%0Ascore: ${score} 🎉%0D%0A%23note_height_and_low%0D%0A`
            );
          }}
        />
      </Flex>
      <Button
        variant={"solid"}
        bgColor="black"
        colorScheme="white"
        onClick={onClickCloseButton}
        fontSize="2xl"
        size={"lg"}
      >
        close & retry
      </Button>
    </Flex>
  );
};
