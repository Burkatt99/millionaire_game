import React from "react";

import Reward from "@/components/Reward";
import { IRewardItem } from "@/constants/types";

import { RewardBlock } from "./styled";

interface IRewardListProps {
  isOpen: boolean;
  listOfRewards: IRewardItem[];
}

const RewardList = (props: IRewardListProps) => {
  const { listOfRewards = [], isOpen } = props;

  return (
    <RewardBlock $isOpen={isOpen}>
      {listOfRewards.map(({ id, amount, status }) => (
        <Reward key={id} amount={amount} status={status} />
      ))}
    </RewardBlock>
  );
};

export default React.memo(RewardList);
