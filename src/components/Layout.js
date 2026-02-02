import { Link, Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Container,
  Header,
  LoginButton,
  Navbar,
  NavItem,
  ContentWrapper,
} from "../styles";

// --- Animations ---
const swing = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-15deg); } /* Gentle gentle ready stance */
  100% { transform: rotate(0deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

// --- Styled Components for Logo ---
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  
  /* Continuous Animation */
  .bat {
    animation: ${swing} 2s ease-in-out infinite;
  }
  
  .ball {
    animation: ${bounce} 1.5s ease-in-out infinite;
  }
`;

const SiteTitle = styled.h1`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.primaryColor || "#333"};
  margin: 0;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`;

// --- SVG Icons ---
const BaseballBat = () => (
  <svg className="bat" width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ transformOrigin: "20% 80%" }}>
    {/* Knob */}
    <circle cx="20" cy="80" r="6" fill="#D35400" stroke="black" strokeWidth="3" />

    {/* Main Bat Body (Diagonal) */}
    <path d="M22 78 L75 25 C83 17 92 26 84 34 L31 87"
      fill="#D35400" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

    {/* Highlight (Top Edge) */}
    <path d="M25 75 L75 25" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

    {/* Grip Tape (White Stripes) */}
    <line x1="28" y1="72" x2="38" y2="62" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="33" y1="77" x2="43" y2="67" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="38" y1="82" x2="48" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const Baseball = () => (
  <svg className="ball" width="35" height="35" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Ball Base */}
    <circle cx="50" cy="50" r="45" fill="white" stroke="#bdc3c7" strokeWidth="2" />

    {/* Stitches Left */}
    <path d="M25,10 Q40,50 25,90" fill="none" stroke="#E74C3C" strokeWidth="4" strokeDasharray="5,5" />
    <path d="M25,10 Q40,50 25,90" fill="none" stroke="#E74C3C" strokeWidth="12" strokeOpacity="0.1" /> {/* Shadow */}

    {/* Stitches Right */}
    <path d="M75,10 Q60,50 75,90" fill="none" stroke="#E74C3C" strokeWidth="4" strokeDasharray="5,5" />
    <path d="M75,10 Q60,50 75,90" fill="none" stroke="#E74C3C" strokeWidth="12" strokeOpacity="0.1" /> {/* Shadow */}
  </svg>
);

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <LogoContainer onClick={() => navigate("/")}>
          <IconWrapper>
            <Baseball />
          </IconWrapper>
          <SiteTitle>Y.P.T</SiteTitle>
        </LogoContainer>

        <Link to="/login">
          <LoginButton>로그인</LoginButton>
        </Link>
      </Header>

      {/* 메뉴바 */}
      <Navbar>
        <NavItem as={Link} to="/profile">내 정보</NavItem>
        <NavItem as={Link} to="/">홈</NavItem>
        <NavItem as={Link} to="/diary">나의 직관일지</NavItem>
        <NavItem as={Link} to="/excitingzone">익사이팅존</NavItem>
        <NavItem as={Link} to="/guidezone">직관 가이드</NavItem>
      </Navbar>

      {/* 페이지별 콘텐츠 */}
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Layout;
