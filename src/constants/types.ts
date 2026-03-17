export type TPropsWithChildren<P = unknown> = P & { children: React.ReactNode };

export type TButtonTypes = "primary" | "icon";

export type TAnswerStatus = "correct" | "incorrect" | "default" | "chosen";

export type TGameStatus = "loading" | "playing" | "finished";

export type TRewardStatus = "current" | "won" | "default";

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: number;
  level: number;
  reward: number;
  text: string;
  minCorrectToPass: number;
  answers: IAnswer[];
}

export interface IGameConfig {
  questions: IQuestion[];
}

export interface IRewardItem {
  id: number;
  amount: number;
  status: TRewardStatus;
}
