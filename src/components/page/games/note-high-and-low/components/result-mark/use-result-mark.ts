import { useState, useCallback } from "react";
import { sleep } from "../../../../../../utils/sleep";

export const useResultMark = () => {
  const [isResultCorrect, setIsResultCorrect] = useState(undefined);
  const [isShowResultMark, setIsShowResultMark] = useState(false);
  const showResultMark = useCallback(async (isCorrect: boolean) => {
    setIsResultCorrect(isCorrect);
    setIsShowResultMark(true);
    await sleep(500);
    setIsShowResultMark(false);
  }, []);

  return {
    isResultCorrect,
    isShowResultMark,
    showResultMark,
  };
};
