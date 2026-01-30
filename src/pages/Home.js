import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TeamSelector from "./TeamSelector";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: white;
`;

const HeroSection = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primaryColor || "#000"} 0%,
    #000000 90%
  );
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: -2px;
  z-index: 2;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);

  span {
    color: ${({ theme }) => theme.secondaryColor || "#fff"};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
  opacity: 0.8;
  z-index: 2;
  max-width: 600px;
`;

const TeamBadge = styled.div`
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 50px 10%;
  background-color: #0a0a0a;
`;

const FeatureCard = styled(Link)`
  background: #1a1a1a;
  padding: 40px;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-color: ${({ theme }) => theme.primaryColor};
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    color: #888;
    font-size: 1.1rem;
  }
`;

const Home = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [myTeam, setMyTeam] = useState(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("myTeam");
    if (savedTeam) {
      setMyTeam(JSON.parse(savedTeam));
    }
  }, []);

  const handleTeamSelect = (team) => {
    setMyTeam(team);
    localStorage.setItem("myTeam", JSON.stringify(team));
    window.location.reload();
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>
          Y.P.T <span>WORLD</span>
        </HeroTitle>
        <HeroSubtitle>
          당신의 야구 직관 라이프를 더 완벽하게.
          <br />
          {myTeam ? `${myTeam.name}의 승리를 위하여!` : "응원하는 팀을 선택하고 시작하세요."}
        </HeroSubtitle>

        <TeamBadge onClick={() => setSelectorVisible(true)}>
          {myTeam ? (
            <>
              <img src={myTeam.logo} alt={myTeam.name} style={{ width: '30px', height: '30px' }} />
              <span>{myTeam.name} 변경하기</span>
            </>
          ) : (
            <span>⚾️ 응원팀 선택하기</span>
          )}
        </TeamBadge>
      </HeroSection>

      <FeaturesGrid>
        <FeatureCard to="/diary">
          <h3>📅 직관 일지</h3>
          <p>나만의 직관 기록을 남기고 승률을 분석하세요.</p>
        </FeatureCard>
        <FeatureCard to="/excitingzone">
          <h3>⚡️ 익사이팅존</h3>
          <p>야구 퀴즈를 풀고 포인트를 획득하세요.</p>
        </FeatureCard>
        <FeatureCard to="/guidezone">
          <h3>🏟️ 직관 가이드</h3>
          <p>전국 야구장 좌석 정보와 꿀팁을 확인하세요.</p>
        </FeatureCard>
      </FeaturesGrid>

      <TeamSelector
        visible={isSelectorVisible}
        onClose={() => setSelectorVisible(false)}
        onSelect={handleTeamSelect}
      />
    </HomeContainer>
  );
};

export default Home;
