import styled, { css } from "styled-components";

import { TRewardStatus } from "@/constants/types";
import { COLORS } from "@/styles/styles";

const STATUS_STROKE: Record<string, string> = {
  default: COLORS.TEXT.PRIMARY,
  current: COLORS.TEXT.ACCENT,
  won: COLORS.TEXT.SECONDARY,
};

export const AmountBlock = styled.div<{
  $status: TRewardStatus;
}>`
  width: fit-content;
  position: relative;
  background: none;
  padding: 0 41px;
  transition: all 0.3s ease;

  svg {
    height: 32px;
    width: 240px;
    color: ${({ $status }) =>
      $status === "current" ? COLORS.BORDER.WARNING : COLORS.BORDER.DEFAULT};
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 16px;
    width: 41px;
    height: 1px;
    background: ${({ $status }) =>
      $status === "current" ? COLORS.BORDER.WARNING : COLORS.BORDER.DEFAULT};
    flex-shrink: 0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (min-width: 1024px) {
    padding: 0 69px;

    &::before,
    &::after {
      top: 20px;
      width: 69px;
    }

    svg {
      height: 40px;
    }
  }
`;

export const Text = styled.div<{
  $status: TRewardStatus;
}>`
  width: 240px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 41px;
  font-size: 14px;
  font-weight: 400;

  ${({ $status }) => css`
    color: ${STATUS_STROKE[$status]};
  `}

  @media (min-width: 1024px) {
    height: 40px;
    font-size: 20px;
    left: 69px;
  }
`;
