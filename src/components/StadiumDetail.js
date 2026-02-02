import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import stadiums from "../assets/stadiums";
import styled from "styled-components";

const StadiumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const stadium = stadiums.find((s) => s.id === id);

  const goToReviewWrite = () => {
    navigate("/review/write", {
      state: {
        stadiumId: stadium.id,
        stadiumName: stadium.name,
      },
    });
  };

  const goToReviewView = () => {
    navigate("/review/view", {
      state: {
        stadiumId: stadium.id,
        stadiumName: stadium.name,
      },
    });
  };

  return (
    <Wrapper>
      <TopNav onClick={() => navigate(-1)}>
        &lt; 뒤로가기
      </TopNav>

      <Header>
        <Title>{stadium.name}</Title>
        <Subtitle>{stadium.team}</Subtitle>
      </Header>

      <ContentContainer>
        <Section>
          <SectionTitle>ℹ️ 좌석배치도</SectionTitle>
          <ImageWrapper>
            <img src={`/assets/stadiums/${stadium.id}_seat.png`} alt="좌석배치도" />
          </ImageWrapper>
        </Section>

        <Section>
          <SectionTitle>요금표</SectionTitle>
          <ImageWrapper>
            <img src={`/assets/stadiums/${stadium.id}_price.png`} alt="요금표" />
          </ImageWrapper>
        </Section>
      </ContentContainer>

      <ActionButtons>
        <ActionButton onClick={goToReviewWrite} primary>
          <Icon>✎</Icon> 리뷰 작성하기
        </ActionButton>
        <ActionButton onClick={goToReviewView}>
          리뷰 모아보기
        </ActionButton>
      </ActionButtons>
    </Wrapper>
  );
};

// --- Styled Components ---

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background-color: #fdfdfd;
`;

const TopNav = styled.div`
  cursor: pointer;
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 30px;
  display: inline-block;
  transition: color 0.2s;
  
  &:hover { 
    color: #333; 
    transform: translateX(-5px);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #333;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #666;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #444;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  
  background: ${props => props.primary ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: ${props => props.primary ? 'none' : '2px solid #eee'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    background: ${props => props.primary ? 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)' : '#f9f9f9'};
  }
`;

const Icon = styled.span`
  font-size: 1.4rem;
`;

export default StadiumDetail;
