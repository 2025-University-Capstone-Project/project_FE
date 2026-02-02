import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import teamThemes from '../theme/teams';

// Real KBO Schedule Data (Starts March 28th)
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

// Real KBO Team Rankings (2025 Final)
const realRanking = [
  { rank: 1, team: "LG", win: 85, lose: 56, draw: 3, rate: "0.603" },
  { rank: 2, team: "한화", win: 83, lose: 57, draw: 4, rate: "0.593" },
  { rank: 3, team: "SSG", win: 75, lose: 65, draw: 4, rate: "0.536" },
  { rank: 4, team: "삼성", win: 74, lose: 68, draw: 2, rate: "0.521" },
  { rank: 5, team: "NC", win: 71, lose: 67, draw: 6, rate: "0.514" },
  { rank: 6, team: "KT", win: 71, lose: 68, draw: 5, rate: "0.511" },
  { rank: 7, team: "롯데", win: 66, lose: 72, draw: 6, rate: "0.478" },
  { rank: 8, team: "KIA", win: 65, lose: 75, draw: 4, rate: "0.464" },
  { rank: 9, team: "두산", win: 61, lose: 77, draw: 6, rate: "0.442" },
  { rank: 10, team: "키움", win: 47, lose: 93, draw: 4, rate: "0.336" },
];

// Helper for dynamic dates
const getDateStr = (diff = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - diff);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
};

// Mock Data for Point History (Dynamic)
const mockPointHistory = [
  { date: getDateStr(0), desc: "출석 체크", points: "+5" },
  { date: getDateStr(0), desc: "직관 승리 (vs LG)", points: "+100" },
  { date: getDateStr(1), desc: "퀴즈 정답", points: "+10" },
  { date: getDateStr(1), desc: "출석 체크", points: "+5" },
  { date: getDateStr(2), desc: "승부 예측 적립", points: "+100" },
  { date: getDateStr(2), desc: "출석 체크", points: "+5" },
  { date: getDateStr(3), desc: "퀴즈 정답", points: "+10" },
  { date: getDateStr(3), desc: "출석 체크", points: "+5" },
];

const totalPointsMock = mockPointHistory.reduce((acc, cur) => acc + parseInt(cur.points), 0);

// SVG Icons
const Icons = {
  Trophy: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Megaphone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  Coin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  )
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myTeam, setMyTeam] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('loggedInUser');
    if (userStr) setUser(JSON.parse(userStr));

    const teamStr = localStorage.getItem('myTeam');
    if (teamStr) setMyTeam(JSON.parse(teamStr));
  }, []);

  if (!user) {
    return (
      <Container>
        <LoginRequestContainer>
          <div className="icon">⚾️</div>
          <h2>로그인이 필요한 서비스입니다.</h2>
          <p>
            나만의 직관 일지를 기록하고<br />
            응원하는 팀의 승리를 함께하세요!
          </p>
          <LoginRequestButton onClick={() => navigate('/login')}>
            로그인 하러 가기
          </LoginRequestButton>
        </LoginRequestContainer>
      </Container>
    );
  }

  const userTeamTheme = myTeam && teamThemes[myTeam.id] ? teamThemes[myTeam.id] : teamThemes.default;
  const dashboardSchedule = fullSchedule.slice(0, 3);
  const dashboardHistory = mockPointHistory.slice(0, 5);

  return (
    <Container>
      <PageHeader>
        <Title style={{ color: 'white' }}>My Dashboard</Title>
      </PageHeader>

      <SketchLayout>

        {/* Left Column: Team Ranking */}
        <ColLeft>
          <DashboardCard>
            <CardHeader>
              <TitleGroup>
                <IconBox color="#FFD700"><Icons.Trophy /></IconBox>
                <h3>팀 순위</h3>
              </TitleGroup>
            </CardHeader>
            <ScrollableContent>
              <RankTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>팀</th>
                    <th>승</th>
                    <th>패</th>
                    <th>무</th>
                  </tr>
                </thead>
                <tbody>
                  {realRanking.map((row) => (
                    <tr key={row.rank} className={myTeam && myTeam.name.includes(row.team) ? "highlight" : ""}>
                      <td>{row.rank}</td>
                      <td>{row.team}</td>
                      <td>{row.win}</td>
                      <td>{row.lose}</td>
                      <td style={{ color: '#999' }}>{row.draw}</td>
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
          <UserProfileCard style={{ background: `linear-gradient(120deg, ${userTeamTheme.primaryColor}, ${userTeamTheme.secondaryColor})` }}>
            <AvatarContainer>
              <Avatar onClick={() => document.getElementById('profile-upload').click()}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" />
                ) : (
                  <img src="/assets/default_profile.png" alt="Default Profile" />
                )}
              </Avatar>
              <CameraBadge onClick={() => document.getElementById('profile-upload').click()}>
                <img src="/assets/camera_icon.png" alt="Camera" />
              </CameraBadge>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const newUser = { ...user, profileImage: reader.result };
                      setUser(newUser);
                      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </AvatarContainer>

            <div className="info">
              <h3>{user.nickname || user.id} 님</h3>
              <p>오늘도 승리요정이 되어보세요!</p>
            </div>
            <PointsTag>{totalPointsMock} P</PointsTag>
          </UserProfileCard>

          {/* 2. Schedule */}
          <DashboardCard>
            <CardHeader>
              <TitleGroup>
                <IconBox color="#4da6ff"><Icons.Calendar /></IconBox>
                <h3>경기 일정</h3>
              </TitleGroup>
              <MoreButton onClick={() => setIsScheduleModalOpen(true)}>더보기</MoreButton>
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

          {/* 3. Attendance */}
          <DashboardCard>
            <CardHeader>
              <TitleGroup>
                <IconBox color="#00cc66"><Icons.Check /></IconBox>
                <h3>출석 체크</h3>
              </TitleGroup>
            </CardHeader>
            <AttendanceBox>
              <div className="status" style={{ color: '#333' }}>매일매일 출석체크</div>
              <p>연속 4일 출석 중! 5일차 도전 🔥</p>
              <button>출석하기</button>
            </AttendanceBox>
          </DashboardCard>

        </ColCenter>

        {/* Right Column: My Team -> Point History */}
        <ColRight>

          {/* 1. My Team */}
          <DashboardCard>
            <CardHeader>
              <TitleGroup>
                <IconBox color={userTeamTheme.primaryColor}><Icons.Megaphone /></IconBox>
                <h3>나의 팀</h3>
              </TitleGroup>
            </CardHeader>
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
          <DashboardCard className="fill-height">
            <CardHeader>
              <TitleGroup>
                <IconBox color="#ff9933"><Icons.Coin /></IconBox>
                <h3>적립 내역</h3>
              </TitleGroup>
              <MoreButton onClick={() => setIsHistoryModalOpen(true)}>더보기</MoreButton>
            </CardHeader>
            <ScrollableContent>
              <MiniList>
                {dashboardHistory.map((h, i) => (
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

      {/* Modal: Schedule */}
      {isScheduleModalOpen && (
        <ModalOverlay onClick={() => setIsScheduleModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IconBox color="#4da6ff" size="30px"><Icons.Calendar /></IconBox>
                <h2>전체 경기 일정</h2>
              </div>
              <CloseButton onClick={() => setIsScheduleModalOpen(false)}>&times;</CloseButton>
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

      {/* Modal: Points History */}
      {isHistoryModalOpen && (
        <ModalOverlay onClick={() => setIsHistoryModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IconBox color="#ff9933" size="30px"><Icons.Coin /></IconBox>
                <h2>전체 적립 내역</h2>
              </div>
              <CloseButton onClick={() => setIsHistoryModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <HistoryTable>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPointHistory.map((h, i) => (
                    <tr key={i}>
                      <td>{h.date}</td>
                      <td style={{ textAlign: 'left' }}>{h.desc}</td>
                      <td style={{ color: 'green', fontWeight: 'bold' }}>{h.points}</td>
                    </tr>
                  ))}
                </tbody>
              </HistoryTable>
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
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #333;
`;

const SketchLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 280px; 
  gap: 25px; /* Increased gap for better separation */
  
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
  gap: 25px;
`;

const ColRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// Updated DashboardCard style for "Premium" look
const DashboardCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 24px; /* More rounded corners */
  box-shadow: 0 10px 30px rgba(0,0,0,0.06); /* Softer, deeper shadow */
  border: none; /* Removed border */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  }

  &.fill-height {
    flex: 1; 
    min-height: 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 { font-size: 1.1rem; font-weight: 700; color: #222; margin: 0; }
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  width: ${props => props.size || '36px'};
  height: ${props => props.size || '36px'};
  border-radius: 12px;
  background-color: ${props => props.color}20; /* 20% opacity background */
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MoreButton = styled.span`
  font-size: 0.85rem;
  color: #aaa;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: #666; }
`;

const UserProfileCard = styled.div`
  padding: 30px;
  border-radius: 24px;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  position: relative;
  
  .info {
    flex: 1;
    h3 { margin: 0 0 5px 0; font-size: 1.6rem; font-weight: 800; color: white; }
    p { margin: 0; font-size: 0.95rem; opacity: 0.9; color: rgba(255,255,255,0.9); }
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px; /* Squircle */
  background: rgba(255,255,255,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  backdrop-filter: blur(5px);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CameraBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
  
  img {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
  
  &:hover img {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

const PointsTag = styled.div`
  background: rgba(255,255,255,0.25);
  padding: 10px 20px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1.2rem;
  color: white;
  backdrop-filter: blur(5px);
`;

const RankTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th { text-align: center; color: #aaa; font-size: 0.8rem; padding-bottom: 12px; font-weight: 600; }
  td { padding: 14px 0; border-bottom: 1px solid #f5f5f5; color: #444; font-weight: 600; font-size: 0.9rem; text-align: center; }
  .highlight td { color: #e91e63; font-weight: 800; }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #eee; border-radius: 4px; }
`;

const MiniScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    color: #555;
    transition: background 0.2s;
    &:hover { background: #f0f2f5; }
    .date { font-weight: 700; color: #333; }
    .match-info { 
       display: flex; 
       gap: 6px; 
       font-weight: 600;
       .vs { color: #999; font-weight: normal; font-size: 0.85rem; }
    }
  }
`;

const AttendanceBox = styled.div`
  text-align: center;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  .status { font-size: 1.2rem; font-weight: 800; color: #00cc66; }
  p { color: #888; font-size: 0.95rem; margin: 0; }
  button {
    background: #333;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: transform 0.1s;
    &:active { transform: scale(0.98); }
  }
`;

const MyTeamContent = styled.div`
  text-align: center;
  padding: 10px 0;
  img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 15px; drop-shadow: 0 4px 10px rgba(0,0,0,0.1); }
  h4 { margin: 0 0 8px; font-size: 1.2rem; color: #333; font-weight: 800; }
  p { margin: 0; color: #888; font-size: 0.9rem; }
`;

const MiniList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    font-size: 0.9rem;
    border-bottom: 1px dashed #eee;
    .date { color: #aaa; font-size: 0.85rem; display:block; margin-bottom: 3px; font-weight: 500;}
    .desc { flex: 1; color: #444; font-weight: 600; }
    .point { font-weight: 800; color: #ff9933; font-size: 1rem;}
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from { transform: translateY(40px) scale(0.95); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }
`;

const ModalHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 { margin: 0; font-size: 1.4rem; color: #333; font-weight: 800; }
`;

const CloseButton = styled.button`
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
  &:hover { background: #eee; color: #333; }
`;

const ModalBody = styled.div`
  padding: 30px;
  overflow-y: auto;
`;

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th { 
    text-align: center; 
    padding: 15px; 
    background: #f8f9fa; 
    color: #888; 
    font-size: 0.9rem; 
    font-weight: 600;
  }
  th:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
  th:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }

  td { 
    padding: 18px 10px; 
    border-bottom: 1px solid #f0f0f0; 
    color: #333; 
    text-align: center;
    font-size: 0.95rem;
    font-weight: 500;
  }
  tr:last-child td { border-bottom: none; }
`;

const HistoryTable = styled(ScheduleTable)`
  td { text-align: center; }
`;

// Login Request UI Styles
const LoginRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  text-align: center;
  margin-top: 50px;
  min-height: 400px;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    animation: bounce 2s infinite;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const LoginRequestButton = styled.button`
  background: linear-gradient(90deg, #6b48ff 0%, #8e24aa 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(107, 72, 255, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(107, 72, 255, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export default Profile;
