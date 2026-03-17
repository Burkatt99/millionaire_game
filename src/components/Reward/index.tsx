import React from "react";

import { TRewardStatus } from "@/constants/types";
import { RewardIcon } from "@/icons/reward";

import { AmountBlock, Text } from "./styled";

interface IRewardProps {
  amount: number;
  status?: TRewardStatus;
}

const Reward = (props: IRewardProps) => {
  const { amount, status = "default" } = props;
  const formattedValue = amount.toLocaleString();

  return (
    <AmountBlock $status={status}>
      <RewardIcon />

      <Text $status={status}>
        <span>${formattedValue}</span>
      </Text>
    </AmountBlock>
  );
};

export default React.memo(Reward);
