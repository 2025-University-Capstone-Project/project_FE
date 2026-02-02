import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import teamThemes from '../theme/teams';

// Real KBO Schedule Data (Extracted from koreabaseball.com)
const fullSchedule = [
  { date: "03.28(토)", time: "14:00", match: "vs. LG (잠실)", home: "LG", away: "KT" },
  { date: "03.28(토)", time: "14:00", match: "vs. SSG (문학)", home: "SSG", away: "KIA" },
  { date: "03.28(토)", time: "14:00", match: "vs. 삼성 (대구)", home: "삼성", away: "롯데" },
  { date: "03.28(토)", time: "14:00", match: "vs. NC (창원)", home: "NC", away: "두산" },
  { date: "03.28(토)", time: "14:00", match: "vs. 한화 (대전)", home: "한화", away: "키움" },
  { date: "03.29(일)", time: "14:00", match: "vs. LG (잠실)", home: "LG", away: "KT" },
  { date: "03.29(일)", time: "14:00", match: "vs. SSG (문학)", home: "SSG", away: "KIA" },
  { date: "03.29(일)", time: "14:00", match: "vs. 삼성 (대구)", home: "삼성", away: "롯데" },
  { date: "03.29(일)", time: "14:00", match: "vs. NC (창원)", home: "NC", away: "두산" },
  { date: "03.29(일)", time: "14:00", match: "vs. 한화 (대전)", home: "한화", away: "키움" },
  { date: "03.31(화)", time: "18:30", match: "vs. LG (잠실)", home: "LG", away: "KIA" },
  { date: "03.31(화)", time: "18:30", match: "vs. SSG (문학)", home: "SSG", away: "키움" },
  { date: "03.31(화)", time: "18:30", match: "vs. 삼성 (대구)", home: "삼성", away: "두산" },
  { date: "03.31(화)", time: "18:30", match: "vs. NC (창원)", home: "NC", away: "롯데" },
  { date: "03.31(화)", time: "18:30", match: "vs. 한화 (대전)", home: "한화", away: "KT" }
];

// Mock Data for Ranking
const mockRanking = [
  { rank: 1, team: "KIA", win: 25, lose: 10, draw: 0 },
  { rank: 2, team: "NC", win: 23, lose: 12, draw: 1 },
  { rank: 3, team: "LG", win: 22, lose: 14, draw: 0 },
  { rank: 4, team: "두산", win: 20, lose: 16, draw: 1 },
  { rank: 5, team: "SSG", win: 19, lose: 17, draw: 0 },
  { rank: 6, team: "KT", win: 18, lose: 18, draw: 1 },
  { rank: 7, team: "한화", win: 16, lose: 20, draw: 0 },
  { rank: 8, team: "삼성", win: 15, lose: 21, draw: 0 },
  { rank: 9, team: "키움", win: 14, lose: 22, draw: 0 },
  { rank: 10, team: "롯데", win: 12, lose: 24, draw: 0 },
];

// Mock Data for Point History
const mockPointHistory = [
  { date: "05/13", desc: "퀴즈 정답", points: "+10" },
  { date: "05/13", desc: "퀴즈 정답", points: "+10" },
  { date: "05/12", desc: "출석 체크", points: "+5" },
  { date: "05/11", desc: "예측 성공", points: "+50" },
  { date: "05/10", desc: "퀴즈 정답", points: "+10" },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myTeam, setMyTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('loggedInUser');
    if (userStr) setUser(JSON.parse(userStr));

    const teamStr = localStorage.getItem('myTeam');
    if (teamStr) setMyTeam(JSON.parse(teamStr));
  }, []);

  if (!user) return null;

  const userTeamTheme = myTeam && teamThemes[myTeam.id] ? teamThemes[myTeam.id] : teamThemes.default;

  // Filter schedule for My Team if selected, otherwise show all (or just top 3 for dashboard)
  const dashboardSchedule = fullSchedule.slice(0, 3); // Show top 3

  return (
    <Container>
      <PageHeader>
        <Title>마이 대시보드</Title>
      </PageHeader>

      <SketchLayout>

        {/* Left Column: Team Ranking (Full Height) */}
        <ColLeft>
          <DashboardCard style={{ height: '100%' }}>
            <CardHeader>
              <h3>🏆 팀 순위</h3>
            </CardHeader>
            <ScrollableContent>
              <RankTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>팀</th>
                    <th>승</th>
                    <th>패</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRanking.map((row) => (
                    <tr key={row.rank} className={myTeam && myTeam.name.includes(row.team) ? "highlight" : ""}>
                      <td>{row.rank}</td>
                      <td>{row.team}</td>
                      <td>{row.win}</td>
                      <td>{row.lose}</td>
                    </tr>
                  ))}
                </tbody>
              </RankTable>
            </ScrollableContent>
          </DashboardCard>
        </ColLeft>

        {/* Center Column: User -> Schedule -> Attendance */}
        <ColCenter>

          {/* 1. User Profile */}
          <UserProfileCard style={{ background: `linear-gradient(135deg, ${userTeamTheme.primaryColor} 0%, ${userTeamTheme.secondaryColor} 100%)` }}>
            <Avatar>{user.nickname ? user.nickname[0] : "U"}</Avatar>
            <div className="info">
              <h3>{user.nickname || user.id} 님</h3>
              <p>오늘도 승리요정이 되어보세요!</p>
            </div>
            <PointsTag>{user.points || 0} P</PointsTag>
          </UserProfileCard>

          {/* 2. Schedule */}
          <DashboardCard>
            <CardHeader>
              <h3>📅 경기 일정</h3>
              <span onClick={() => setIsModalOpen(true)}>더보기</span>
            </CardHeader>
            <MiniScheduleList>
              {dashboardSchedule.map((game, i) => (
                <div key={i} className="item">
                  <span className="date">{game.date}</span>
                  <div className="match-info">
                    <span>{game.away}</span>
                    <span className="vs">vs</span>
                    <span>{game.home}</span>
                  </div>
                </div>
              ))}
            </MiniScheduleList>
          </DashboardCard>

          {/* 3. Attendance (New) */}
          <DashboardCard>
            <CardHeader><h3>✅ 출석 체크</h3></CardHeader>
            <AttendanceBox>
              <div className="status">오늘 출석 완료!</div>
              <p>연속 5일 출석 중 🔥</p>
              <button>출석하기</button>
            </AttendanceBox>
          </DashboardCard>

        </ColCenter>

        {/* Right Column: My Team -> Point History */}
        <ColRight>

          {/* 1. My Team */}
          <DashboardCard>
            <CardHeader><h3>📢 나의 팀</h3></CardHeader>
            <MyTeamContent>
              {myTeam ? (
                <>
                  <img src={myTeam.logo} alt="logo" />
                  <h4>{myTeam.name}</h4>
                  <p>{myTeam.description}</p>
                </>
              ) : <p>팀 선택 안함</p>}
            </MyTeamContent>
          </DashboardCard>

          {/* 2. Point History */}
          <DashboardCard style={{ flex: 1 }}>
            <CardHeader><h3>💰 적립 내역</h3></CardHeader>
            <ScrollableContent>
              <MiniList>
                {mockPointHistory.map((h, i) => (
                  <li key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="date">{h.date}</span>
                      <span className="desc">{h.desc}</span>
                    </div>
                    <span className="point">{h.points}</span>
                  </li>
                ))}
              </MiniList>
            </ScrollableContent>
          </DashboardCard>
        </ColRight>

      </SketchLayout>

      {/* Schedule Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>📅 전체 경기 일정</h2>
              <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <ScheduleTable>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>시간</th>
                    <th>경기</th>
                    <th>구장</th>
                  </tr>
                </thead>
                <tbody>
                  {fullSchedule.map((game, i) => (
                    <tr key={i}>
                      <td>{game.date}</td>
                      <td>{game.time}</td>
                      <td>
                        <span style={{ fontWeight: 'bold' }}>{game.away}</span>
                        <span style={{ margin: '0 5px', color: '#999' }}>vs</span>
                        <span style={{ fontWeight: 'bold' }}>{game.home}</span>
                      </td>
                      <td>{game.match.match(/\((.*?)\)/)?.[1] || "구장"}</td>
                    </tr>
                  ))}
                </tbody>
              </ScheduleTable>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

    </Container>
  );
};

// --- Styled Components ---

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: #333;
`;

const SketchLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 280px; 
  gap: 20px;
  min-height: 600px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ColRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DashboardCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #333; 
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  h3 { font-size: 1rem; font-weight: 700; color: #333; margin: 0; }
  span { font-size: 0.8rem; color: #999; cursor: pointer; }
`;

const UserProfileCard = styled.div`
  padding: 25px;
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  position: relative;
  
  .info {
    flex: 1;
    h3 { margin: 0; font-size: 1.4rem; font-weight: 800; color: white; }
    p { margin: 5px 0 0; font-size: 0.9rem; opacity: 0.9; color: rgba(255,255,255,0.9); }
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  border: 2px solid rgba(255,255,255,0.5);
  color: white;
`;

const PointsTag = styled.div`
  background: rgba(255,255,255,0.2);
  padding: 8px 15px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
`;

const RankTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th { text-align: left; color: #999; font-size: 0.8rem; padding-bottom: 8px; }
  td { padding: 8px 0; border-bottom: 1px solid #f9f9f9; color: #333; font-weight: 600; font-size: 0.9rem; }
  .highlight td { color: #d32f2f; }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: #eee; border-radius: 3px; }
`;

const MiniScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .item {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #555;
    .date { font-weight: bold; color: #333; }
    .match-info { 
       display: flex; 
       gap: 5px; 
       font-weight: 600;
       .vs { color: #999; font-weight: normal; }
    }
  }
`;

const AttendanceBox = styled.div`
  text-align: center;
  padding: 10px 0;
  .status { font-size: 1.1rem; font-weight: bold; color: #4CAF50; margin-bottom: 5px; }
  p { color: #888; font-size: 0.9rem; margin-bottom: 10px; }
  button {
    background: #333;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

const MyTeamContent = styled.div`
  text-align: center;
  img { width: 50px; height: 50px; object-fit: contain; margin-bottom: 10px; }
  h4 { margin: 0 0 5px; font-size: 1.1rem; color: #333; }
  p { margin: 0; color: #888; font-size: 0.8rem; }
`;

const MiniList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-size: 0.85rem;
    border-bottom: 1px solid #f5f5f5;
    .date { color: #999; font-size: 0.8rem; display:block; margin-bottom: 2px;}
    .desc { flex: 1; color: #333; font-weight: 500; }
    .point { font-weight: bold; color: #4CAF50; font-size: 0.9rem;}
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 600px; /* Wider for table */
  max-height: 80vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 { margin: 0; font-size: 1.2rem; color: #333; }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  &:hover { color: #333; }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th { 
    text-align: center; 
    padding: 12px; 
    background: #f9f9f9; 
    color: #666; 
    font-size: 0.9rem; 
    border-radius: 8px;
  }
  td { 
    padding: 15px 10px; 
    border-bottom: 1px solid #eee; 
    color: #333; 
    text-align: center;
    font-size: 0.95rem;
  }
  tr:last-child td { border-bottom: none; }
`;

export default Profile;
