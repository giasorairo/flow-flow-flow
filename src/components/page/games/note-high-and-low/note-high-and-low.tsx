import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";
import * as Tone from "tone";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ResultMark } from "./components/result-mark/result-mark";
import { useResultMark } from "./components/result-mark/use-result-mark";
import { ResultModal } from "./components/result-modal/result-modal";
import React from "react";
import { DEGREE_LEVEL } from "./const/degree-level";
import { SelectDegreeLevel } from "./components/select-degree-level/select-degree-level";
import { useSelectDegreeLevel } from "./components/select-degree-level/use-select-degree-level";
import { DegreeLevel } from "./types/degree-level";
import { BsFillVolumeUpFill } from "react-icons/bs";
import Head from "next/head";
import { Adsense } from "../../../functional/adsense/adsense";

const getDegreeLevelText = (degreeLevel: number) => {
  const keys = Object.keys(DEGREE_LEVEL);
  return keys[degreeLevel];
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const getRandomNote = () => {
  const randomNum = Math.floor(Math.random() * NOTES.length);
  return NOTES[randomNum];
};

// eslint-disable-next-line no-undef
const playSound = (note: Tone.Unit.Frequency, degreeLevel: DegreeLevel) => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease(`${note}${degreeLevel}`, "2n", now);
};

const isCorrectAnswer = (
  currentNote: Tone.Unit.Frequency,
  questionNote: Tone.Unit.Frequency,
  highOrLow: "high" | "low"
) => {
  const currentNoteIndex = NOTES.findIndex((note) => note === currentNote);
  const questionNoteIndex = NOTES.findIndex((note) => note === questionNote);
  if (currentNoteIndex < 0 || questionNoteIndex < 0) {
    throw new Error("note is invalid");
  }
  switch (highOrLow) {
    case "high": {
      if (currentNoteIndex <= questionNoteIndex) {
        return true;
      }
      return false;
    }
    case "low": {
      if (currentNoteIndex >= questionNoteIndex) {
        return true;
      }
      return false;
    }
    default: {
      throw new Error("highOrLow is invalid");
    }
  }
};

const useDidmount = (fn: () => void) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const MAX_GAME_COUNT = 10;

export const NoteHighAndLow = () => {
  const [currentNote, setCurrentNote] = useState<Tone.Unit.Frequency>("");
  const [questionNote, setQuestionNote] = useState<Tone.Unit.Frequency>("");
  const [gameCount, setGameCount] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  const calcScore = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }, []);

  const { isResultCorrect, isShowResultMark, showResultMark } = useResultMark();
  const { degreeLevel, handlerChangeDegreeLevelSelect } =
    useSelectDegreeLevel();

  const isEndGame = useMemo(() => gameCount >= MAX_GAME_COUNT, [gameCount]);

  const nextGame = useCallback(() => {
    setGameCount((prev) => prev + 1);
    if (gameCount + 1 >= MAX_GAME_COUNT) {
      return;
    }
    setCurrentNote(questionNote);
    setQuestionNote(getRandomNote());
  }, [gameCount, questionNote]);

  const handlerClickCurrenNoteButton = useCallback(() => {
    playSound(currentNote, degreeLevel);
  }, [currentNote, degreeLevel]);

  const handlerClickQuestionNoteButton = useCallback(() => {
    playSound(questionNote, degreeLevel);
  }, [questionNote, degreeLevel]);

  const handlerClickHighLowButton = useCallback(
    async (highOrLow: "high" | "low") => {
      try {
        // 正誤判定
        const isCorrect = isCorrectAnswer(currentNote, questionNote, highOrLow);
        await showResultMark(isCorrect);
        calcScore(isCorrect);
        nextGame();
      } catch (error) {
        console.error(error);
      }
    },
    [calcScore, currentNote, nextGame, questionNote, showResultMark]
  );

  const resetGame = useCallback(() => {
    setGameCount(0);
    setScore(0);
    setCurrentNote(getRandomNote());
    setQuestionNote(getRandomNote());
  }, []);

  const handlerClickResultModalCloseButton = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const disableControllerButton = useMemo(() => {
    if (isEndGame) {
      return true;
    }
    if (isShowResultMark) {
      return true;
    }
    return false;
  }, [isEndGame, isShowResultMark]);

  useDidmount(async () => {
    setCurrentNote(getRandomNote());
    setQuestionNote(getRandomNote());
  });

  useEffect(() => {
    resetGame();
  }, [degreeLevel, resetGame]);

  return (
    <>
      <Head>
        <meta
          name="description"
          key="description"
          content={"note high and low"}
        />
        <meta
          property="og:site_name"
          key="ogSiteName"
          content="note high and low"
        />
        <meta property="og:title" key="ogTItle" content={"note high and low"} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/games/note-high-and-low`}
        />
        <meta
          property="og:description"
          key="ogDescription"
          content={"note high and low"}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          key="ogImage"
          content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/games/note-high-and-low.png`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/games/note-high-and-low.png`}
        />
      </Head>
      <Flex
        flexDirection={"column"}
        alignItems="center"
        style={{
          fontFamily: "'Covered By Your Grace', cursive",
        }}
        minHeight="100vh"
      >
        <Flex marginY={4} flexDirection="column" alignItems={"center"} gap={4}>
          <Heading as={"h1"} fontFamily="font-family: 'Pacifico', cursive">
            note high & low
          </Heading>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"red"}>Watch the volume.</Text>
            <Icon as={BsFillVolumeUpFill} color="red" />
          </Flex>
        </Flex>
        <Flex position={"relative"} width={"full"} justifyContent="center">
          <Flex
            className="game_main"
            flexFlow={"column"}
            alignItems={"center"}
            bgColor="black"
            width={{ base: "full", md: "700px" }}
            paddingY={8}
            paddingX={4}
          >
            <Flex width={"100%"} className="cards_container" gap={2}>
              <Flex
                className="card_container"
                flexFlow={"column"}
                alignItems="center"
                gap={2}
                flex={1}
              >
                <Flex
                  width={"full"}
                  height={"200px"}
                  bgColor="black"
                  border="3px solid white"
                  justifyContent={"center"}
                  alignItems="center"
                  fontSize={"3rem"}
                  color="white"
                  borderRadius={"md"}
                >
                  {isShowResultMark ? questionNote : "?"}
                  <br />
                </Flex>
                <IconButton
                  width={"50px"}
                  aria-label="play"
                  icon={<TriangleUpIcon css={{ rotate: "90deg" }} />}
                  borderRadius={"50%"}
                  size="lg"
                  onClick={handlerClickQuestionNoteButton}
                  disabled={disableControllerButton}
                />
              </Flex>
              <Flex
                className="card_container"
                flexFlow={"column"}
                alignItems="center"
                gap={2}
                flex={1}
              >
                <Flex
                  width={"full"}
                  height={"200px"}
                  bgColor="black"
                  border="3px solid white"
                  justifyContent={"center"}
                  alignItems="center"
                  fontSize={"3rem"}
                  color="white"
                  borderRadius={"md"}
                >
                  {currentNote}
                </Flex>
                <IconButton
                  width={"50px"}
                  aria-label="play"
                  icon={<TriangleUpIcon css={{ rotate: "90deg" }} />}
                  borderRadius={"50%"}
                  size="lg"
                  onClick={handlerClickCurrenNoteButton}
                  disabled={disableControllerButton}
                />
              </Flex>
            </Flex>
            <Box p={2} />
            <Text color="white" fontSize={"4xl"}>
              score: {score}/10
            </Text>
            <Box p={2} />
            <Flex gap={4}>
              <Button
                fontSize={"2xl"}
                variant={"solid"}
                colorScheme={"white"}
                border="white solid 1px"
                onClick={() => {
                  handlerClickHighLowButton("high");
                }}
                size="lg"
                disabled={disableControllerButton}
              >
                high
              </Button>
              <Button
                fontSize={"2xl"}
                variant={"solid"}
                colorScheme={"white"}
                border="white solid 1px"
                onClick={() => {
                  handlerClickHighLowButton("low");
                }}
                size="lg"
                disabled={disableControllerButton}
              >
                Low
              </Button>
            </Flex>
          </Flex>
          {isShowResultMark ? (
            <ResultMark isCorrect={isResultCorrect} />
          ) : (
            <></>
          )}
          {isEndGame ? (
            <ResultModal
              score={score}
              degreeLevelText={getDegreeLevelText(degreeLevel)}
              onClickCloseButton={handlerClickResultModalCloseButton}
            />
          ) : (
            <></>
          )}
        </Flex>
        <Box p={4} />
        <SelectDegreeLevel
          onChangeDegreeLevelSelect={handlerChangeDegreeLevelSelect}
        />
        <Box
          textAlign={"center"}
          py={4}
          maxWidth={"620px"}
          minWidth={"300px"}
          height="150px"
        >
          <Text>sponsored link</Text>
          <Box p={1} />
          <Adsense />
        </Box>
      </Flex>
    </>
  );
};
