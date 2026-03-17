import Image from "next/image";
import styled from "styled-components";

import { COLORS } from "@/styles/styles";

export const ResultPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 80px 0 20px;
  background: ${COLORS.BACKGROUND.DEFAULT};

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 1024px) {
    max-width: 600px;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.TEXT.SECONDARY};

  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

export const Score = styled.h1`
  font-size: 32px;
  color: ${COLORS.TEXT.PRIMARY};

  @media (min-width: 1024px) {
    font-size: 56px;
    margin-bottom: 40px;
  }
`;

export const CustomImage = styled(Image)`
  margin-bottom: 24px;

  @media (min-width: 1024px) {
    width: 624px;
    height: 367px;
    margin-bottom: 0;
  }
`;
