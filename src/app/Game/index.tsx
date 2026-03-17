"use client";

import Process from "@/pages/Process";
import Result from "@/pages/Result";
import Start from "@/pages/Start";
import { useGame } from "@/providers/GameContext";

const SCREENS = {
  loading: Start,
  playing: Process,
  finished: Result,
};

const Game = () => {
  const { status } = useGame();
  const Screen = SCREENS[status];

  return <Screen />;
};

export default Game;
