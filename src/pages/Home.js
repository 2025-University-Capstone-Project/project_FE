import React, { useState, useEffect } from "react";
import {
  MainContent,
  Sidebar,
  Rankings,
  MyTeam,
  MyPlayer,
  ScheduleContainer,
  Match
} from "../styles";

import TeamSelector from "./TeamSelector"; // 경로는 TeamSelector가 위치한 실제 경로로 조정
const Home = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const [myTeam, setMyTeam] = useState(null);

  // localStorage에서 초기 팀 정보 로드
  useEffect(() => {
    const savedTeam = localStorage.getItem("myTeam");
    if (savedTeam) {
      setMyTeam(JSON.parse(savedTeam));
    }
  }, []);

  const handleTeamSelect = (team) => {
    setMyTeam(team);
    localStorage.setItem("myTeam", JSON.stringify(team));
    window.location.reload(); // 테마 적용을 위해 페이지 새로고침 (간단한 구현)
  };

  return (
    <MainContent>
      {/* 순위표 */}
      <Sidebar>
        <Rankings>
          <h3>순위표</h3>
          <ul>
            {[...Array(10)].map((_, i) => (
              <li key={i}>{i + 1}위 팀</li>
            ))}
          </ul>
        </Rankings>
      </Sidebar>

      {/* MY 팀 & MY 선수 */}
      <div>
        <MyTeam onClick={() => setSelectorVisible(true)} style={{ cursor: "pointer" }}>
          MY 팀: {myTeam ? myTeam.name : "선택한 팀이 없습니다."}
        </MyTeam>
        <MyPlayer>MY 선수: 선택한 선수가 없습니다.</MyPlayer>
      </div>

      {/* 경기 일정 */}
      <ScheduleContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <Match key={i}>1 vs 2 (지역) - {i + 1}</Match>
          ))}
        </div>
      </ScheduleContainer>

      {/* 응원팀 선택 모달 */}
      <TeamSelector
        visible={isSelectorVisible}
        onClose={() => setSelectorVisible(false)}
        onSelect={handleTeamSelect}
      />
    </MainContent>
  );
};

export default Home;
