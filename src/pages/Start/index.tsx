"use client";

import Button from "@/components/Button";
import { useGame } from "@/providers/GameContext";

import { Content, CustomImage, StartPage, Title } from "./styled";

const Start = () => {
  const { setStatus } = useGame();

  return (
    <StartPage>
      <CustomImage src="/icons/hand.svg" alt="hand" width={288} height={182} />

      <Content>
        <Title>Who wants to be a millionaire?</Title>
        <Button onClick={() => setStatus("playing")}>Start</Button>
      </Content>
    </StartPage>
  );
};

export default Start;
