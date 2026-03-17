import Image from "next/image";
import styled from "styled-components";

import { COLORS } from "@/styles/styles";

export const StartPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 80px 0 20px;
  background: linear-gradient(
    to top left,
    ${COLORS.BACKGROUND.ACCENT} 0%,
    ${COLORS.BACKGROUND.ACCENT} 50%,
    ${COLORS.BACKGROUND.DEFAULT} 50%,
    ${COLORS.BACKGROUND.DEFAULT} 100%
  );

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 1024px) {
    max-width: 600px;
    justify-content: center;
    align-items: flex-start;
    gap: 32px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 56px;
    text-align: start;
  }
`;

export const CustomImage = styled(Image)`
  @media (min-width: 1024px) {
    width: 624px;
    height: 367px;
  }
`;
