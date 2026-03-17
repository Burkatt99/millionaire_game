import styled, { css } from "styled-components";

import { TAnswerStatus } from "@/constants/types";
import { COLORS } from "@/styles/styles";

interface IAnswerButtonProps {
  $status: TAnswerStatus;
}

const STATUS_STROKE: Record<string, string> = {
  correct: COLORS.BORDER.SUCCESS,
  incorrect: COLORS.BORDER.DANGER,
  chosen: COLORS.BORDER.WARNING,
};

const STATUS_FILL: Record<string, string> = {
  correct: COLORS.BACKGROUND.SUCCESS,
  incorrect: COLORS.BACKGROUND.DANGER,
  chosen: COLORS.BACKGROUND.ACCENT,
};

export const AnswerButton = styled.button<IAnswerButtonProps>`
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  padding: 0 17px;
  transition: stroke 0.3s ease;

  svg {
    height: 56px;
    width: 288px;
    stroke: ${COLORS.BORDER.DEFAULT};
  }

  &:hover {
    svg {
      stroke: ${COLORS.BORDER.WARNING};
    }

    &::before,
    &::after {
      background: ${COLORS.BORDER.WARNING};
    }
  }

  ${({ $status }) => css`
    svg {
      stroke: ${STATUS_STROKE[$status] ?? COLORS.BORDER.DEFAULT};

      path {
        fill: ${STATUS_FILL[$status] ?? COLORS.BACKGROUND.DEFAULT};
      }
    }
  `}

  &::before,
    &::after {
    content: "";
    display: block;
    position: absolute;
    top: 28px;
    width: 17px;
    height: 1px;
    background: ${({ $status }) =>
      STATUS_STROKE[$status ?? ""] ?? COLORS.BORDER.DEFAULT};
    flex-shrink: 0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (min-width: 1024px) {
    &::before,
    &::after {
      top: 36px;
    }

    svg {
      height: 72px;
      width: 373px;
    }
  }
`;

export const Text = styled.div`
  display: flex;
  gap: 12px;
  position: absolute;
  top: 20px;
  left: 40px;
  font-size: 14px;
  font-weight: 400;

  @media (min-width: 1024px) {
    font-size: 20px;
    top: 25px;
    left: 48px;
  }
`;

export const Variant = styled.span`
  color: ${COLORS.TEXT.ACCENT};
  font-weight: 600;
`;
