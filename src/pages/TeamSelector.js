// TeamSelector.js
import React, { useState } from "react";
import styled from "styled-components";

// 10개 팀 정보
const teams = [
  { id: "kia", name: "KIA 타이거즈", logo: "/assets/teams/kia.png" },
  { id: "lotte", name: "롯데 자이언츠", logo: "/assets/teams/lotte.png" },
  { id: "doosan", name: "두산 베어스", logo: "/assets/teams/doosan.png" },
  { id: "ssg", name: "SSG 랜더스", logo: "/assets/teams/ssg.png" },
  { id: "samsung", name: "삼성 라이온즈", logo: "/assets/teams/samsung.png" },
  { id: "kt", name: "KT 위즈", logo: "/assets/teams/kt.png" },
  { id: "hanwha", name: "한화 이글스", logo: "/assets/teams/hanwha.png" },
  { id: "lg", name: "LG 트윈스", logo: "/assets/teams/lg.png" },
  { id: "kiwoom", name: "키움 히어로즈", logo: "/assets/teams/kiwoom.png" },
  { id: "nc", name: "NC 다이노스", logo: "/assets/teams/nc.png" },
];

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 600px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin: 20px 0;
`;

const TeamLogo = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "3px solid #007bff" : "none")};
  border-radius: 8px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const TeamSelector = ({ visible, onClose, onSelect }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleConfirm = () => {
    if (selectedTeam) {
      onSelect(selectedTeam);
      onClose();
    } else {
      alert("응원팀을 선택해주세요.");
    }
  };

  return (
    <ModalOverlay $visible={visible}>
      <ModalContent>
        <h2>응원팀 선택</h2>
        <p>응원 팀을 선택하세요</p>
        <TeamGrid>
          {teams.map((team) => (
            <TeamLogo
              key={team.id}
              src={team.logo}
              alt={team.name}
              selected={selectedTeam?.id === team.id}
              onClick={() => setSelectedTeam(team)}
            />
          ))}
        </TeamGrid>
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TeamSelector;
