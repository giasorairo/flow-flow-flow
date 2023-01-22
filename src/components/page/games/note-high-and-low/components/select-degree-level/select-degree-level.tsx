import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
import { DEGREE_LEVEL } from "../../const/degree-level";

type Props = {
  onChangeDegreeLevelSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectDegreeLevel = (props: Props) => {
  const { onChangeDegreeLevelSelect } = props;
  return (
    <Flex alignItems={"center"} gap={2}>
      <Text fontSize={"3xl"}>mode: </Text>
      <Select
        defaultValue={DEGREE_LEVEL["MIDDLE"]}
        onChange={onChangeDegreeLevelSelect}
        borderColor="black"
      >
        <option value={DEGREE_LEVEL["SUPER_SUPER_LOW"]}>super super low</option>
        <option value={DEGREE_LEVEL["SUPER_LOW"]}>super low</option>
        <option value={DEGREE_LEVEL["LOW"]}>low</option>
        <option value={DEGREE_LEVEL["MIDDLE"]}>middle</option>
        <option value={DEGREE_LEVEL["HIGH"]}>high</option>
        <option value={DEGREE_LEVEL["SUPER_HIGH"]}>super high</option>
        <option value={DEGREE_LEVEL["SUPER_SUPER_HIGH"]}>
          super super high
        </option>
        <option value={DEGREE_LEVEL["HYPER_HIGH"]}>hyper high</option>
        <option value={DEGREE_LEVEL["HYPER_HYPER_HIGH"]}>
          hyper hyper high
        </option>
        <option value={DEGREE_LEVEL["ULTIMATE_HIGH"]}>ultimate high</option>
      </Select>
    </Flex>
  );
};
