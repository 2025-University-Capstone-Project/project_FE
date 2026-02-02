import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #fdfbf7;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 30px;
  padding: 50px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #6b48ff 0%, #a048ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DateText = styled.p`
  color: #888;
  font-size: 1.1rem;
  font-weight: 500;
`;

const MatchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const TeamBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLogo = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;

const TeamName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const VS = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: #ddd;
  margin: 0 30px;
  font-style: italic;
`;

const PredictionSection = styled.div`
  background: #f9f9fa;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid #eee;
`;

const Question = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
`;

const PredictBtn = styled.button`
  flex: 1;
  max-width: 200px;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid transparent;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  ${({ $type, $selected, theme }) => {
        if ($type === 'win') {
            return `
        color: ${$selected ? 'white' : '#4caf50'};
        border-color: #4caf50;
        background: ${$selected ? '#4caf50' : 'white'};
        &:hover { background: ${$selected ? '#4caf50' : '#e8f5e9'}; }
      `;
        } else {
            return `
        color: ${$selected ? 'white' : '#f44336'};
        border-color: #f44336;
        background: ${$selected ? '#f44336' : 'white'};
        &:hover { background: ${$selected ? '#f44336' : '#ffebee'}; }
      `;
        }
    }}
`;

const SubmitBtn = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 18px;
  background: ${({ theme, disabled }) => disabled ? "#ccc" : (theme.primaryColor || "#6b48ff")};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};
  transition: all 0.2s;
  box-shadow: ${({ disabled }) => disabled ? "none" : "0 10px 20px rgba(107, 72, 255, 0.3)"};

  &:hover {
    transform: ${({ disabled }) => disabled ? "none" : "translateY(-2px)"};
    filter: ${({ disabled }) => disabled ? "none" : "brightness(1.1)"};
  }
`;

const ResultMessage = styled.div`
  margin-top: 30px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #6b48ff;
  padding: 20px;
  background: #f3e5f5;
  border-radius: 12px;
`;

const BackLink = styled.button`
  margin-top: 40px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.2s;
  
  &:hover { color: #666; }
`;

// --- Mock Data ---
const TODAY_MATCH = {
    date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
    opponent: { name: "두산 베어스", logo: "🐻" }, // Placeholder logo logic needed ideally
    myTeamWrapper: null // Will be loaded from localstorage
};

const MatchPrediction = () => {
    const navigate = useNavigate();
    const [myTeam, setMyTeam] = useState(null);
    const [selection, setSelection] = useState(null); // 'win' | 'lose'
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Load my team
        const savedTeam = JSON.parse(localStorage.getItem("myTeam"));
        if (savedTeam) {
            setMyTeam(savedTeam);
        }

        // Load saved prediction for today
        const todayStr = new Date().toDateString();
        const savedPred = JSON.parse(localStorage.getItem("matchPrediction"));

        if (savedPred && savedPred.date === todayStr) {
            setSelection(savedPred.selection);
            setIsSubmitted(true);
        }
    }, []);

    const handleSubmit = () => {
        if (!selection) return;

        // Save
        const prediction = {
            date: new Date().toDateString(),
            selection: selection,
            timestamp: Date.now()
        };
        localStorage.setItem("matchPrediction", JSON.stringify(prediction));
        setIsSubmitted(true);
    };

    if (!myTeam) {
        return (
            <Container>
                <ContentWrapper>
                    <h2>먼저 응원하는 팀을 선택해주세요!</h2>
                    <SubmitBtn onClick={() => navigate('/')}>홈으로 이동</SubmitBtn>
                </ContentWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <ContentWrapper>
                <Header>
                    <DateText>{TODAY_MATCH.date}</DateText>
                    <Title>오늘의 승부 예측</Title>
                </Header>

                <MatchContainer>
                    <TeamBlock>
                        <TeamLogo>
                            {myTeam.logo ? <img src={myTeam.logo} alt={myTeam.name} /> : "🦁"}
                        </TeamLogo>
                        <TeamName>{myTeam.name}</TeamName>
                    </TeamBlock>

                    <VS>VS</VS>

                    <TeamBlock>
                        <TeamLogo>{TODAY_MATCH.opponent.logo}</TeamLogo>
                        <TeamName>{TODAY_MATCH.opponent.name}</TeamName>
                    </TeamBlock>
                </MatchContainer>

                <PredictionSection>
                    {!isSubmitted ? (
                        <>
                            <Question>오늘 우리 팀의 경기 결과는?</Question>
                            <ButtonGroup>
                                <PredictBtn
                                    $type="win"
                                    $selected={selection === 'win'}
                                    onClick={() => setSelection('win')}
                                >
                                    승리 🔥
                                </PredictBtn>
                                <PredictBtn
                                    $type="lose"
                                    $selected={selection === 'lose'}
                                    onClick={() => setSelection('lose')}
                                >
                                    패배 😭
                                </PredictBtn>
                            </ButtonGroup>
                            <SubmitBtn
                                onClick={handleSubmit}
                                disabled={!selection}
                            >
                                예측 제출하기
                            </SubmitBtn>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                                {selection === 'win' ? '🔥' : '😭'}
                            </div>
                            <Question>
                                {selection === 'win' ? '승리를 예측하셨습니다!' : '패배를 예측하셨습니다...'}
                            </Question>
                            <ResultMessage>
                                경기 결과가 나오면 포인트를 드려요!<br />
                                (실제 경기 결과 연동은 준비중입니다)
                            </ResultMessage>
                        </>
                    )}
                </PredictionSection>

                <BackLink onClick={() => navigate(-1)}>뒤로 가기</BackLink>
            </ContentWrapper>
        </Container>
    );
};

export default MatchPrediction;
