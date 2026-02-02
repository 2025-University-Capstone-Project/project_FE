import React, { useState } from "react";
import styled from "styled-components";

// --- Mock Data ---
const personData = [
  { type: "image", question: "이 선수의 이름은?", answer: "소이현", img: "/images/quiz/so_yihyun.png" },
  { type: "image", question: "이 선수의 이름은?", answer: "김광현", img: "/images/quiz/ssg_kim.png" },
  { type: "image", question: "이 선수의 이름은?", answer: "이정후", img: "/images/quiz/sf_lee.png" },
  { type: "image", question: "이 선수의 이름은?", answer: "김하성", img: "/images/quiz/kim_haseong.png" },
  { type: "image", question: "이 선수의 이름은?", answer: "류현진", img: "/images/quiz/hanwha_ryu.png" },
  { type: "image", question: "이 선수의 이름은?", answer: "손주영", img: "/images/quiz/lg_son.png" },
];

const ruleData = [
  {
    type: "multiple",
    question: "투수가 타자에게 공을 던질 때, 부정행위로 간주되는 동작은?",
    options: ["보크", "스트라이크", "볼넷", "데드볼"],
    answer: "보크",
    explanation: "보크(Balk)는 주자가 있을 때 투수가 규칙에 어긋나는 투구 동작을 하는 것으로, 주자는 한 루씩 진루합니다."
  },
  {
    type: "multiple",
    question: "주자가 1, 2루(또는 만루)에 있고 노아웃이나 1아웃일 때, 내야 높게 뜬 공을 심판이 아웃으로 선언하는 것은?",
    options: ["인필드플라이", "낫아웃", "태그업", "포스아웃"],
    answer: "인필드플라이",
    explanation: "수비수가 고의로 공을 떨어뜨려 병살을 잡는 것을 방지하기 위해 심판이 미리 아웃을 선언하는 규칙입니다."
  },
  {
    type: "multiple",
    question: "타자가 친 공이 담장을 넘어가는 가장 짜릿한 득점 방식은?",
    options: ["홈런", "안타", "희생플라이", "도루"],
    answer: "홈런",
    explanation: "홈런은 타자가 베이스를 모두 돌아 본루까지 들어와 득점하는 것입니다."
  },
  {
    type: "multiple",
    question: "투수가 경기 시작부터 끝까지 혼자 던져, 상대 팀에게 1점도 주지 않고 승리하는 것은?",
    options: ["완봉승", "완투승", "구원승", "노히트노런"],
    answer: "완봉승",
    explanation: "완투승은 끝까지 던져 이기는 것이고, 완봉승(Shutout)은 점수까지 주지 않는 것입니다."
  },
  {
    type: "multiple",
    question: "3명의 주자가 모두 베이스(1루, 2루, 3루)에 있는 상황을 부르는 말은?",
    options: ["만루", "사이클링히트", "병살", "초구"],
    answer: "만루",
    explanation: "모든 베이스가 꽉 찬 상태, 즉 '풀 베이스(Full Bases)'를 만루라고 합니다."
  },
  {
    type: "multiple",
    question: "타자가 투구 수 3개(스트라이크 3개)로 아웃되는 것은?",
    options: ["삼진", "볼넷", "사구", "땅볼"],
    answer: "삼진",
    explanation: "스트라이크 3개를 당하면 삼진(Strikeout) 아웃 처리됩니다."
  },
  {
    type: "multiple",
    question: "경기가 5회 이전에 비 등으로 인해 중단되어 무효가 되는 게임은?",
    options: ["노게임", "콜드게임", "서스펜디드", "더블헤더"],
    answer: "노게임",
    explanation: "정식 경기 성립 요건(보통 5회)을 채우지 못하면 노게임 선언됩니다."
  },
  {
    type: "multiple",
    question: "구원 투수가 팀의 승리를 지키기 위해 등판하여 경기를 마무리하는 기록은?",
    options: ["세이브", "홀드", "승리", "방어율"],
    answer: "세이브",
    explanation: "세이브는 승리하고 있는 경기를 지켜낸 마무리 투수에게 주어지는 기록입니다."
  },
  {
    type: "multiple",
    question: "타자가 한 경기에서 단타, 2루타, 3루타, 홈런을 모두 치는 기록은?",
    options: ["사이클링 히트", "그랜드슬램", "트리플플레이", "퍼펙트게임"],
    answer: "사이클링 히트",
    explanation: "사이클링 히트(Hit for the cycle)는 매우 드물고 대단한 기록입니다."
  },
  {
    type: "multiple",
    question: "공격 팀이 3아웃이 되기 전에 한 이닝에 득점을 많이 하는 것을 보통 뭐라고 부르나?",
    options: ["빅이닝", "스몰볼", "클러치", "끝내기"],
    answer: "빅이닝",
    explanation: "한 이닝에 대량 득점을 올리는 경우를 '빅이닝'이라고 부릅니다."
  }
];

const songData = [
  { type: "text", question: "🎵 부산 갈매기~ 부산 갈매기~ (어디 응원가?)", answer: "롯데" },
  { type: "text", question: "🎵 아파트 아파트 아파트 아파트~ (누구 응원가?)", answer: "윤수일" },
];

const categories = ["인물 퀴즈", "응원가 퀴즈", "등번호 퀴즈"];

// --- Styled Components (Card Style Theme) ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #fdfbf7; /* Soft Cream Background */
  font-family: 'Inter', sans-serif;
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primaryColor || "#1a237e"};
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.secondaryColor || "#5c6bc0"};
    margin-top: 5px;
    border-radius: 2px;
  }
`;

// --- Hero Card (Wide Banner) ---
const HeroCard = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 300px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryColor || "#9575cd"} 0%, ${({ theme }) => theme.secondaryColor || "#7e57c2"} 100%);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HeroContent = styled.div`
  z-index: 2;
  flex: 1;
`;

const HeroTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const HeroDesc = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 400px;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const PlayPill = styled.div`
  background: rgba(255,255,255,0.2);
  padding: 10px 25px;
  border-radius: 50px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(5px);
  transition: background 0.2s;

  ${HeroCard}:hover & {
    background: white;
    color: ${({ theme }) => theme.primaryColor || "#7e57c2"};
  }
`;

// 3D Decor Elements for Hero
const DecorBlock = styled.div`
  position: absolute;
  font-size: 8rem;
  right: 50px;
  top: 50%;
  transform: translateY(-50%) rotate(15deg);
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
  z-index: 1;
  transition: transform 0.3s;
  
  ${HeroCard}:hover & {
    transform: translateY(-50%) rotate(0deg) scale(1.1);
  }
`;

// --- Grid Section (Small Cards) ---
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  margin-top: 30px;
`;

const GameCard = styled.div`
  background: ${props => props.color || "#4db6ac"};
  height: 250px;
  border-radius: 24px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    filter: brightness(1.05);
  }
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 10px;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 5px;
`;

const MiniPlayBtn = styled.div`
  background: rgba(255,255,255,0.2);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: bold;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 6px;
    ${GameCard}:hover & {
    background: white;
    color: ${props => props.color || "#333"};
  }
`;

const QuizImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 4px solid #eee;
`;

const QuestionText = styled.div`
  background: ${({ theme }) => theme.primaryColor || "#333"};
  color: white;
  padding: 40px;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  word-break: keep-all;
  line-height: 1.4;
`;

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
`;

const ChoiceBtn = styled.button`
  padding: 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background: white;
  border: 2px solid #eee;
  border-radius: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primaryColor || "#333"};
  }
`;

// Result Screen Styles
const ResultContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  text-align: center;
`;

const ResultTitle = styled(HeroTitle)`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const ReviewList = styled.div`
  text-align: left;
  max-height: 500px;
  overflow-y: auto;
  border-top: 2px solid #eee;
  padding-top: 20px;
`;

const ReviewItem = styled.div`
  background: ${({ correct }) => correct ? "#e8f5e9" : "#ffebee"};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 5px solid ${({ correct }) => correct ? "#4caf50" : "#f44336"};

  h4 { margin: 0 0 5px 0; font-size: 1.1rem; color: #333; }
  p { margin: 5px 0; font-size: 0.95rem; color: #555; }
  .explanation { font-weight: bold; color: #333; margin-top: 8px; }
`;

// --- Game UI (kept clean) ---
const GameUIContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const GameInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1.2rem;
  margin: 20px 0;
  text-align: center;
  &:focus { outline: none; border-color: #7e57c2; }
`;

const GameSubmit = styled.button`
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.primaryColor || "#7e57c2"};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover { filter: brightness(0.9); }
`;

const HeroButton = styled.button`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primaryColor || "#43a047"} 0%, ${({ theme }) => theme.secondaryColor || "#1565c0"} 100%);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const HeroTextMain = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ExcitingZone = () => {
  const [gameMode, setGameMode] = useState(null); // 'person', 'song', 'rule'
  const [activeData, setActiveData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Store history for review

  const startGame = (mode) => {
    let selectedData = [];
    if (mode === 'person') selectedData = personData; // Person is still 'all' or 'random'
    else if (mode === 'rule') {
      // Logic: Randomly Shuffle and Pick 10 for Rules
      const shuffled = [...ruleData].sort(() => Math.random() - 0.5);
      selectedData = shuffled.slice(0, 10);
    }
    else if (mode === 'song') selectedData = songData;
    else if (mode === 'random') selectedData = [...personData, ...ruleData].sort(() => Math.random() - 0.5).slice(0, 10);

    setGameMode(mode);
    setActiveData(selectedData);
    setCurrentIndex(0);
    setScore(0);
    setInput("");
    setUserAnswers([]);
    setGameOver(false);
  };

  const handleAnswer = (answerValue) => {
    // 1. Determine Answer (Input text or Button click)
    const submittedAnswer = answerValue || input.trim();
    const currentItem = activeData[currentIndex];

    // 2. Check correctness
    const isCorrect = submittedAnswer === currentItem.answer;

    // 3. Record History
    const historyItem = {
      question: currentItem.question,
      selected: submittedAnswer,
      correctAnswer: currentItem.answer,
      explanation: currentItem.explanation || "",
      isCorrect: isCorrect
    };
    setUserAnswers(prev => [...prev, historyItem]);

    // 4. Update Score
    if (isCorrect) {
      setScore(prev => prev + 10); // 10 points per question (Total 100)
    }

    // 5. Next Question or End
    if (currentIndex + 1 < activeData.length) {
      setCurrentIndex(prev => prev + 1);
      setInput("");
    } else {
      setGameOver(true);
    }
  };

  return (
    <Container>
      <HeaderSection>
        <PageTitle>Games</PageTitle>
      </HeaderSection>

      {!gameMode ? (
        <>
          {/* Main Hero Card */}
          <HeroCard onClick={() => startGame('random')}>
            <HeroContent>
              <HeroTitle>종합 퀴즈</HeroTitle>
              <HeroDesc>
                야구 상식을 총동원하여<br />
                모든 분야의 퀴즈에 도전하세요!
              </HeroDesc>
              <PlayPill>▶ Play</PlayPill>
            </HeroContent>
            <DecorBlock>🏆</DecorBlock>
          </HeroCard>

          {/* Grid Cards */}
          <GridContainer>
            <GameCard color="#64b5f6" onClick={() => startGame('person')}> {/* Light Blue */}
              <CardIcon>🧢</CardIcon>
              <div>
                <CardTitle>인물 퀴즈</CardTitle>
                <MiniPlayBtn color="#64b5f6">▶ Play</MiniPlayBtn>
              </div>
            </GameCard>

            <GameCard color="#4db6ac" onClick={() => startGame('song')}> {/* Teal */}
              <CardIcon>🎵</CardIcon>
              <div>
                <CardTitle>응원가 퀴즈</CardTitle>
                <MiniPlayBtn color="#4db6ac">▶ Play</MiniPlayBtn>
              </div>
            </GameCard>

            <GameCard color="#ff8a65" onClick={() => startGame('rule')}> {/* Orange */}
              <CardIcon>📖</CardIcon>
              <div>
                <CardTitle>용어/룰</CardTitle>
                <MiniPlayBtn color="#ff8a65">▶ Play</MiniPlayBtn>
              </div>
            </GameCard>
          </GridContainer>
        </>
      ) : gameOver ? (
        /* Result Screen */
        <ResultContainer>
          <ResultTitle>결과 발표: {score}점</ResultTitle>
          <p style={{ marginBottom: '20px', color: '#777' }}>총 {activeData.length}문제 중 {score / 10}문제 정답!</p>

          <ReviewList>
            {userAnswers.map((ans, idx) => (
              <ReviewItem key={idx} correct={ans.isCorrect}>
                <h4>Q{idx + 1}. {ans.question}</h4>
                <p>내가 쓴 답: {ans.selected} {ans.isCorrect ? "⭕️" : "❌"}</p>
                {!ans.isCorrect && <p style={{ color: 'red' }}>정답: {ans.correctAnswer}</p>}
                {ans.explanation && <p className="explanation">💡 해설: {ans.explanation}</p>}
              </ReviewItem>
            ))}
          </ReviewList>

          <HeroButton onClick={() => setGameMode(null)} style={{ marginTop: '30px' }}>
            <HeroTextMain>메인으로 돌아가기</HeroTextMain>
          </HeroButton>
        </ResultContainer>
      ) : (
        /* Quiz Screen */
        <GameUIContainer>
          <h2 style={{ marginBottom: '20px' }}>Q. {currentIndex + 1} / {activeData.length}</h2>

          {/* IMAGE QUESTION */}
          {activeData[currentIndex].type === 'image' && (
            <QuizImage src={activeData[currentIndex].img} alt="Quiz Target" />
          )}

          {/* TEXT QUESTION */}
          {activeData[currentIndex].type !== 'image' && (
            <QuestionText>
              {activeData[currentIndex].question}
            </QuestionText>
          )}

          {/* MULTIPLE CHOICE vs TEXT INPUT */}
          {activeData[currentIndex].type === 'multiple' ? (
            <ChoiceGrid>
              {activeData[currentIndex].options.map((opt, idx) => (
                <ChoiceBtn key={idx} onClick={() => handleAnswer(opt)}>
                  {opt}
                </ChoiceBtn>
              ))}
            </ChoiceGrid>
          ) : (
            <>
              <GameInput
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
                placeholder="정답을 입력하세요"
                autoFocus
              />
              <GameSubmit onClick={() => handleAnswer()}>제출</GameSubmit>
            </>
          )}

          <button style={{ marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#999' }} onClick={() => setGameMode(null)}>중단하고 나가기</button>
        </GameUIContainer>
      )}
    </Container>
  );
};

export default ExcitingZone;
