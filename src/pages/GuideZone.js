import React from "react";
import StadiumCard from "../components/StadiumCard";
import styled from "styled-components";
import stadiums from "../assets/stadiums"; // stadium 정보 배열 (JSON)

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primaryColor || "#333"};
  margin-bottom: 40px;
  margin-top: 20px;
`;

const GuideZone = () => {
  return (
    <div>
      <Title>가이드존</Title>
      <Grid>
        {stadiums.map((s) => (
          <StadiumCard key={s.id} stadium={s} />
        ))}
      </Grid>
    </div>
  );
};

export default GuideZone;
