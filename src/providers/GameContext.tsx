"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchGameData } from "@/api";
import {
  IQuestion,
  IRewardItem,
  TAnswerStatus,
  TGameStatus,
} from "@/constants/types";

export interface IGameContext {
  questions: IQuestion[] | null;
  status: TGameStatus;
  currentQuestionId: number;
  totalReward: number;
  listOfRewards: IRewardItem[];
  currentQuestion?: IQuestion;
  answerStatus: Record<string, TAnswerStatus>;
  handleSelectAnswer: (answerId: string) => void;
  setStatus: React.Dispatch<React.SetStateAction<TGameStatus>>;
  resetGame: () => void;
}

type GameProviderProps = {
  children: React.ReactNode;
};

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [status, setStatus] = useState<TGameStatus>("loading");
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [totalReward, setTotalReward] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<
    Record<string, TAnswerStatus>
  >({});

  const listOfRewards = useMemo(
    () =>
      questions
        .map(
          ({ reward, id }) =>
            ({
              id: id,
              amount: reward,
              status:
                id === currentQuestionId
                  ? "current"
                  : id < currentQuestionId
                    ? "won"
                    : "default",
            }) as IRewardItem,
        )
        .reverse(),
    [questions, currentQuestionId],
  );

  const currentQuestion = questions.find(
    (quest) => quest.id === currentQuestionId,
  );

  useEffect(() => {
    fetchGameData()
      .then((data) => {
        setQuestions(data.questions);
        setCurrentQuestionId(1);
      })
      .catch(() => setStatus("finished"));
  }, []);

  const checkAnswer = useCallback(
    (chosenAnswers: string[]) => {
      const correctIds =
        currentQuestion?.answers
          .filter((answer) => answer.isCorrect)
          .map((a) => a.id) || [];

      const newStatuses: Record<string, TAnswerStatus> = {};

      currentQuestion?.answers.forEach(({ id }) => {
        if (correctIds.includes(id)) {
          newStatuses[id] = "correct";
        } else if (chosenAnswers.includes(id)) {
          newStatuses[id] = "incorrect";
        } else {
          newStatuses[id] = "default";
        }
      });

      setAnswerStatus(newStatuses);

      const isCorrect = chosenAnswers.every((id) => correctIds.includes(id));

      setTimeout(() => {
        if (isCorrect) {
          setTotalReward((prev) => prev + (currentQuestion?.reward ?? 0));
          setCurrentQuestionId((prev) => prev + 1);
          setSelected([]);
          setAnswerStatus({});

          if (currentQuestionId >= questions.length) {
            setStatus("finished");
            setCurrentQuestionId(1);
          }
        } else {
          setStatus("finished");
        }
      }, 2000);
    },
    [currentQuestion, currentQuestionId, questions.length],
  );

  const handleSelectAnswer = useCallback(
    (answerId: string) => {
      if (!currentQuestion) return;
      if (selected.includes(answerId)) return;

      const newSelectedAnswers = [...selected, answerId];

      setSelected(newSelectedAnswers);
      setAnswerStatus((prev) => ({ ...prev, [answerId]: "chosen" }));

      if (newSelectedAnswers.length === currentQuestion?.minCorrectToPass) {
        checkAnswer(newSelectedAnswers);
      }
    },
    [checkAnswer, selected, currentQuestion, setSelected, setAnswerStatus],
  );

  const resetGame = useCallback(() => {
    setCurrentQuestionId(1);
    setSelected([]);
    setAnswerStatus({});
    setTotalReward(0);
    setStatus("playing");
  }, []);

  return (
    <GameContext.Provider
      value={{
        questions,
        status,
        listOfRewards,
        currentQuestionId,
        totalReward,
        currentQuestion,
        answerStatus,
        handleSelectAnswer,
        setStatus,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame should use in GameProvider");
  }

  return context;
};
