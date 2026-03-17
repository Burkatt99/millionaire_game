"use client";

import { useGame } from "@/providers/GameContext";
import Process from "@/screens/Process";
import Result from "@/screens/Result";
import Start from "@/screens/Start";

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
