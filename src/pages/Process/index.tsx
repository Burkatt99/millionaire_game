"use client";

import React, { useState } from "react";

import { CloseIcon } from "@/icons/close";
import { MenuIcon } from "@/icons/menu";
import { useGame } from "@/providers/GameContext";

import Question from "./components/Question";
import RewardList from "./components/RewardList";
import { MobileButton, ProcessPage } from "./styled";

const Process = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { listOfRewards } = useGame();

  return (
    <ProcessPage>
      <Question />

      <MobileButton variant="icon" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </MobileButton>

      <RewardList listOfRewards={listOfRewards} isOpen={isOpen} />
    </ProcessPage>
  );
};

export default Process;
