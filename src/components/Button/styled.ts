import styled, { css } from "styled-components";

import { TButtonTypes } from "@/constants/types";
import { COLORS } from "@/styles/styles";

interface ICustomButtonProps {
  $variant: TButtonTypes;
}

export const StyledButton = styled.button<ICustomButtonProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  width: 288px;
  height: 48px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  color: ${COLORS.TEXT.INVERSE};
  background: ${COLORS.BUTTONS.INACTIVE};

  &:hover {
    background: ${COLORS.BUTTONS.HOVER};
  }

  &:active {
    background: ${COLORS.BUTTONS.PRESSED};
  }

  &:disabled {
    opacity: 0.5;
  }

  ${({ $variant }) => {
    if ($variant === "icon") {
      return css`
        max-width: 24px;
        max-height: 24px;
        background: none;
        border-radius: 0;
        color: ${COLORS.ICONS.DEFAULT};

        &:hover,
        &:active {
          background: none;
        }
      `;
    }
  }}

  @media (min-width: 1024px) {
    width: 296px;
    height: 64px;
    font-size: 20px;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;
