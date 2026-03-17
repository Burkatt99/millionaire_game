"use client";

import Button from "@/components/Button";
import { useGame } from "@/providers/GameContext";

import { Content, CustomImage, ResultPage, Score, Text, Title } from "./styled";

const Result = () => {
  const { totalReward, resetGame } = useGame();
  const formattedValue = totalReward.toLocaleString();

  return (
    <ResultPage>
      <CustomImage src="/icons/hand.svg" alt="hand" width={288} height={182} />

      <Content>
        <Text>
          <Title>Total score:</Title>
          <Score>${formattedValue} earned</Score>
        </Text>

        <Button onClick={() => resetGame()}>Try again</Button>
      </Content>
    </ResultPage>
  );
};

export default Result;
