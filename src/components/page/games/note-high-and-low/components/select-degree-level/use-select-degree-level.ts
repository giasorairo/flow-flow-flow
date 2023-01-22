import React, { useState, useCallback } from "react";
import { DEGREE_LEVEL } from "../../const/degree-level";
import { DegreeLevel } from "../../types/degree-level";

export const useSelectDegreeLevel = () => {
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>(
    DEGREE_LEVEL["MIDDLE"]
  );

  const handlerChangeDegreeLevelSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setDegreeLevel(Number(value) as DegreeLevel);
    },
    []
  );

  return {
    degreeLevel,
    handlerChangeDegreeLevelSelect,
  };
};
