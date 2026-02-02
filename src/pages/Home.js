import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TeamSelector from "./TeamSelector";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  color: #333333;
`;

const HeroSection = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.gradient || `linear-gradient(135deg, ${theme.primaryColor || "#000"} 0%, ${theme.secondaryColor || "#000"} 90%)`};
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
  text-shadow: 0 10px 30px rgba(0,0,0,0.1);
  color: ${({ theme }) => theme.textColor || "#fff"};

  span {
    color: ${({ theme }) => theme.secondaryColor === "#FFFFFF" ? theme.primaryColor : theme.secondaryColor || "#fff"};
    /* If secondary is white (same as text), use primary for contrast, otherwise secondary */
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
  opacity: 0.9;
  z-index: 2;
  max-width: 600px;
  color: ${({ theme }) => theme.textColor || "#fff"};
`;

const TeamBadge = styled.div`
  margin-top: 40px;
  background: ${({ theme }) => theme.textColor === "#333333" ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.textColor === "#333333" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)"};
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.textColor || "#fff"};

  &:hover {
    background: ${({ theme }) => theme.textColor === "#333333" ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 50px 10%;
  background-color: #f9f9f9;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-color: ${({ theme }) => theme.primaryColor};
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const PredictionBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #6b48ff 0%, #8e24aa 100%);
  width: 80%;
  margin: 50px auto 20px auto;
  padding: 30px 50px;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  box-shadow: 0 10px 30px rgba(107, 72, 255, 0.3);
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(107, 72, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 30px;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
`;

const BannerText = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
`;

const BannerButton = styled.div`
  background: white;
  color: #6b48ff;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  z-index: 2;
`;

const Home = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const navigate = useNavigate();

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

  const handleNavigation = (path) => {
    const isLoggedIn = !!localStorage.getItem("loggedInUser");
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    } else {
      navigate(path);
    }
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

      <PredictionBanner onClick={() => handleNavigation('/prediction')}>
        <BannerContent>
          <BannerTitle>🏆 오늘의 승부 예측</BannerTitle>
          <BannerText>오늘 경기의 승패를 예측하고 포인트를 획득하세요!</BannerText>
        </BannerContent>
        <BannerButton>참여하기 &gt;</BannerButton>
      </PredictionBanner>

      <FeaturesGrid>
        <FeatureCard onClick={() => handleNavigation('/diary')}>
          <h3>📅 직관 일지</h3>
          <p>나만의 직관 기록을 남기고 승률을 분석하세요.</p>
        </FeatureCard>
        <FeatureCard onClick={() => handleNavigation('/excitingzone')}>
          <h3>⚡️ 익사이팅존</h3>
          <p>야구 퀴즈를 풀고 포인트를 획득하세요.</p>
        </FeatureCard>
        <FeatureCard onClick={() => handleNavigation('/guidezone')}>
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
