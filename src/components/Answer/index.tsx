import React from "react";

import { TAnswerStatus } from "@/constants/types";
import { AnswerIcon } from "@/icons/answer";

import { AnswerButton, Text, Variant } from "./styled";

interface IAnswerProps extends React.ComponentProps<"button"> {
  text: string;
  variant: string;
  status?: TAnswerStatus;
}

const Answer = (props: IAnswerProps) => {
  const { text, variant, status = "default", ...rest } = props;

  return (
    <AnswerButton $status={status} {...rest}>
      <AnswerIcon />

      <Text>
        <Variant>{variant}</Variant>
        {text}
      </Text>
    </AnswerButton>
  );
};

export default React.memo(Answer);
