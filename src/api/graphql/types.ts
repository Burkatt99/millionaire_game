import { IGameConfig } from "@/constants/types";

export interface IGraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export interface IGetGameDataResponse {
  getGameData: IGameConfig;
}
