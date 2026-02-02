import React, { useState } from "react";
import styled from "styled-components";

// 테스트용 이미지 데이터 (나중에 실제 이미지와 이름을 연결된 배열로 대체)
const quizData = [
  { name: "이정후", img: "/images/lee.jpg" },
  { name: "류현진", img: "/images/ryu.jpg" },
  { name: "김하성", img: "/images/kim.jpg" },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-right: 20px;
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  &:focus {
    border-color: ${({ theme }) => theme.primaryColor || "#333"};
    outline: none;
  }
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  background-color: ${({ theme, disabled }) => disabled ? "#ccc" : (theme.primaryColor || "#333")};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.1s;

  &:hover {
    transform: ${({ disabled }) => disabled ? "none" : "scale(1.05)"};
    opacity: 0.9;
  }
`;

const ScoreText = styled.h3`
  margin-top: 20px;
`;

const QuizImage = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const ExcitingZone = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setInput("");
  };

  const handleAnswer = () => {
    if (input.trim() === quizData[currentIndex].name) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < quizData.length) {
        setCurrentIndex(nextIndex);
        setScore(score + 1);
        setInput("");
      } else {
        // 모든 문제 정답 시 게임 종료
        setScore(score + 1);
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  return (
    <Container>
      <LeftPanel>
        {gameStarted && !gameOver ? (
          <QuizImage src={quizData[currentIndex].img} alt="선수" />
        ) : (
          <h2>{gameOver ? "게임 종료!" : "퀴즈를 시작해보세요!"}</h2>
        )}
      </LeftPanel>
      <RightPanel>
        <div>
          <Button onClick={() => alert("인물 퀴즈 모드 선택됨")}>인물</Button>
          <Button onClick={() => alert("응원가 퀴즈 모드 선택됨")}>응원가</Button>
          <Button onClick={() => alert("등번호 퀴즈 모드 선택됨")}>등번호</Button>
          <Button onClick={() => alert("용어/룰 퀴즈 모드 선택됨")}>용어/룰</Button>
        </div>
        <h2>입력하세요</h2>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!gameStarted || gameOver}
        />
        <Button onClick={handleAnswer} disabled={!gameStarted || gameOver}>
          Enter
        </Button>
        <ScoreText>점수: {score}</ScoreText>
        <Button onClick={startGame}>시작</Button>
      </RightPanel>
    </Container>
  );
};

export default ExcitingZone;
