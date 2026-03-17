import { IGameConfig } from "@/constants/types";

export async function fetchGameData(): Promise<IGameConfig> {
  const response = await fetch("/data/config.json");

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  return response.json();
}
