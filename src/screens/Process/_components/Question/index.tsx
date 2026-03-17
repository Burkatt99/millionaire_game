import React from "react";

import Answer from "@/components/Answer";
import { useGame } from "@/providers/GameContext";

import { AnswerList, GameContent, Title } from "./styled";

const Question = () => {
  const { currentQuestion, answerStatus, handleSelectAnswer } = useGame();

  return (
    <GameContent>
      <Title>{currentQuestion?.text}</Title>

      <AnswerList>
        {currentQuestion?.answers.map(({ id, text }) => {
          return (
            <Answer
              key={id}
              text={text}
              variant={id}
              onClick={() => handleSelectAnswer(id)}
              status={answerStatus[id]}
            />
          );
        })}
      </AnswerList>
    </GameContent>
  );
};

export default Question;
