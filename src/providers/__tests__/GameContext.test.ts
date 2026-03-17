import React from "react";
import { act, renderHook, RenderHookResult } from "@testing-library/react";

import { fetchGameData } from "@/api";
import { GameProvider, IGameContext, useGame } from "@/providers/GameContext";

type HookResult = RenderHookResult<IGameContext, undefined>["result"];

jest.mock("@/api", () => ({
  fetchGameData: jest.fn(),
}));

const mockQuestions = [
  {
    id: 1,
    reward: 100,
    text: "Question 1",
    minCorrectToPass: 1,
    answers: [
      { id: "a", text: "Answer A", isCorrect: true },
      { id: "b", text: "Answer B", isCorrect: false },
      { id: "c", text: "Answer C", isCorrect: false },
      { id: "d", text: "Answer D", isCorrect: false },
    ],
  },
  {
    id: 2,
    reward: 200,
    text: "Question 2",
    minCorrectToPass: 2,
    answers: [
      { id: "a", text: "Answer A", isCorrect: true },
      { id: "b", text: "Answer B", isCorrect: true },
      { id: "c", text: "Answer C", isCorrect: false },
      { id: "d", text: "Answer D", isCorrect: false },
    ],
  },
  {
    id: 3,
    reward: 400,
    text: "Question 3",
    minCorrectToPass: 3,
    answers: [
      { id: "a", text: "Answer A", isCorrect: true },
      { id: "b", text: "Answer B", isCorrect: true },
      { id: "c", text: "Answer C", isCorrect: false },
      { id: "d", text: "Answer D", isCorrect: false },
      { id: "e", text: "Answer E", isCorrect: true },
    ],
  },
];

const mockConfig = {
  questions: mockQuestions,
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(GameProvider, null, children);

beforeEach(() => {
  jest.useFakeTimers();
  (fetchGameData as jest.Mock).mockResolvedValue(mockConfig);
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

const startGame = async (result: HookResult) => {
  await act(async () => {});
  act(() => {
    result.current.setStatus("playing");
  });
};

describe("GameContext", () => {
  describe("initialization", () => {
    it("loading by default", () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      expect(result.current.status).toBe("loading");
    });

    it("after fetch - data are uploaded but yet loading — game hasn't started yet", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await act(async () => {});

      expect(result.current.questions?.length).toBe(3);
      expect(result.current.status).toBe("loading");
    });

    it("after update setStatus playing — game start", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      expect(result.current.status).toBe("playing");
      expect(result.current.currentQuestionId).toBe(1);
    });

    it("if fetchGameData has error, status -> finished", async () => {
      (fetchGameData as jest.Mock).mockRejectedValue(new Error("fetch error"));

      const { result } = renderHook(() => useGame(), { wrapper });

      await act(async () => {});

      expect(result.current.status).toBe("finished");
    });
  });

  describe("listOfRewards", () => {
    it("reverse sorted list of rewards", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      expect(result.current.listOfRewards[0].id).toBe(3);
      expect(result.current.listOfRewards[1].id).toBe(2);
      expect(result.current.listOfRewards[2].id).toBe(1);
    });

    it("first question has status - current", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      const current = result.current.listOfRewards.find((r) => r.id === 1);

      expect(current?.status).toBe("current");
    });

    it("other questions have status - default", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      const defaultReward = result.current.listOfRewards.find(
        (r) => r.id === 2,
      );

      expect(defaultReward?.status).toBe("default");
    });
  });

  describe("handleSelectAnswer", () => {
    const goToQuestion2 = async (result: HookResult) => {
      act(() => {
        result.current.handleSelectAnswer("a");
      });
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
    };

    it("Selected answer get status chosen", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion2(result);

      act(() => {
        result.current.handleSelectAnswer("b");
      });

      expect(result.current.answerStatus["b"]).toBe("chosen");
    });
  });

  describe("checkAnswer — 1 right answer", () => {
    it("right answer get status correct", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      expect(result.current.answerStatus["a"]).toBe("correct");
    });

    it("wrong answer get status incorrect", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("b");
      });

      expect(result.current.answerStatus["b"]).toBe("incorrect");
    });

    it("right answer — totalReward incrise after timeout", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.totalReward).toBe(100);
    });

    it("wrong answer — status finished after timeout", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("b");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.status).toBe("finished");
    });

    it("right answer —> next question after timeout", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.currentQuestionId).toBe(2);
    });
  });

  describe("checkAnswer — 2 right answers", () => {
    const goToQuestion2 = async (result: HookResult) => {
      act(() => {
        result.current.handleSelectAnswer("a");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
    };

    it("both right — both get status correct", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion2(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      act(() => {
        result.current.handleSelectAnswer("b");
      });

      expect(result.current.answerStatus["a"]).toBe("correct");
      expect(result.current.answerStatus["b"]).toBe("correct");
    });

    it("one of all is wrong — wrong get incorrect, right correct", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion2(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      act(() => {
        result.current.handleSelectAnswer("c");
      });

      expect(result.current.answerStatus["a"]).toBe("correct");
      expect(result.current.answerStatus["c"]).toBe("incorrect");
    });

    it("both wrong — both get status incorrect", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion2(result);

      act(() => {
        result.current.handleSelectAnswer("c");
      });

      act(() => {
        result.current.handleSelectAnswer("d");
      });

      expect(result.current.answerStatus["c"]).toBe("incorrect");
      expect(result.current.answerStatus["d"]).toBe("incorrect");
    });
  });

  describe("checkAnswer — a few right answers", () => {
    const goToQuestion3 = async (result: HookResult) => {
      act(() => {
        result.current.handleSelectAnswer("a");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.handleSelectAnswer("a");
      });
      act(() => {
        result.current.handleSelectAnswer("b");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
    };

    it("3 right — 3 get status correct", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion3(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      act(() => {
        result.current.handleSelectAnswer("b");
      });

      act(() => {
        result.current.handleSelectAnswer("e");
      });

      expect(result.current.answerStatus["a"]).toBe("correct");
      expect(result.current.answerStatus["b"]).toBe("correct");
      expect(result.current.answerStatus["e"]).toBe("correct");
    });

    it("one of all is wrong — wrong get incorrect, right correct", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);
      await goToQuestion3(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      act(() => {
        result.current.handleSelectAnswer("c");
      });

      act(() => {
        result.current.handleSelectAnswer("e");
      });

      expect(result.current.answerStatus["a"]).toBe("correct");
      expect(result.current.answerStatus["c"]).toBe("incorrect");
      expect(result.current.answerStatus["e"]).toBe("correct");
    });
  });

  describe("resetGame", () => {
    it("clear all data", async () => {
      const { result } = renderHook(() => useGame(), { wrapper });

      await startGame(result);

      act(() => {
        result.current.handleSelectAnswer("a");
      });

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.currentQuestionId).toBe(1);
      expect(result.current.totalReward).toBe(0);
      expect(result.current.answerStatus).toEqual({});
      expect(result.current.status).toBe("playing");
    });
  });

  describe("useGame out of provider", () => {
    it("throw error if without GameProvider", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => renderHook(() => useGame())).toThrow(
        "useGame should use in GameProvider",
      );

      consoleSpy.mockRestore();
    });
  });
});
