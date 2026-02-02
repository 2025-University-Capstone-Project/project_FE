import React from "react";
import styled from "styled-components";
import Calendar from "../components/Calendar";

const DiaryContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.primaryColor || "#333"};
  margin-bottom: 30px;
  font-weight: 800;
`;

const Diary = () => {
  return (
    <DiaryContainer>
      <PageTitle>나의 직관일지</PageTitle>
      <Calendar />
    </DiaryContainer>
  );
};

export default Diary;
