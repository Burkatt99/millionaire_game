import styled from "styled-components";

import Button from "@/components/Button";
import { COLORS } from "@/styles/styles";

export const ProcessPage = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${COLORS.BACKGROUND.NEUTRAL};
`;

export const MobileButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1100;

  @media (min-width: 1024px) {
    display: none;
  }
`;
