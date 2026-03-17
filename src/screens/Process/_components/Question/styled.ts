import styled from "styled-components";

export const GameContent = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 136px 16px 60px;

  @media (min-width: 1024px) {
    flex: 1;
    padding: 130px 80px;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: 16px;
  text-align: center;
  margin-bottom: 60%;

  @media (min-width: 1024px) {
    font-size: 32px;
    text-align: start;
    white-space: break-spaces;
    margin-bottom: 0;
  }
`;

export const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 8px;

  @media (min-width: 1024px) {
    display: grid;
    gap: 24px 0;
    grid-template-columns: repeat(2, 407px);
  }
`;
