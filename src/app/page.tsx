import { GameProvider } from "@/providers/GameContext";
import GlobalStyles from "@/styles/global";

import Game from "./Game";

export default function Home() {
  return (
    <GameProvider>
      <GlobalStyles />
      <Game />
    </GameProvider>
  );
}
