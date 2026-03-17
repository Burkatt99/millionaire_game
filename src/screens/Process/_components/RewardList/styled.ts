import styled from "styled-components";

import { COLORS } from "@/styles/styles";

export const RewardBlock = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: ${COLORS.BACKGROUND.NEUTRAL};
  z-index: 1000;

  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;

  @media (min-width: 1024px) {
    position: static;
    transform: none;
    width: auto;
    height: inherit;
    flex: 0 0 auto;
    background: ${COLORS.BACKGROUND.DEFAULT};
  }
`;
