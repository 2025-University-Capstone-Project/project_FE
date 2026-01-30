import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
`;

// 헤더 스타일
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ddd;
`;

// 사이트 이름 (파란색, 좌측 상단)
export const SiteName = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor || "#007bff"};
  margin: 0;
`;

// 로그인 버튼 (초록색, 우측 상단)
export const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.secondaryColor || "#28a745"};
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor || "#218838"};
  }
`;

// 메뉴바 스타일
export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

// 메뉴 아이템 스타일
export const NavItem = styled.a`
  margin: 0 20px;
  text-decoration: none;
  font-size: 18px;
  color: #333;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme.primaryColor || "#007bff"};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// 메인 콘텐츠 레이아웃
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// 순위표 스타일 (좌측)
export const Sidebar = styled.aside`
  width: 30%;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Rankings = styled.div`
  h3 {
    text-align: center;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 8px;
    text-align: center;
    background-color: #e9ecef;
    margin: 5px 0;
    border-radius: 5px;
  }
`;

// MY 팀 & MY 선수 (우측)
export const MyTeam = styled.div`
  background-color: #e9f7ef;
  padding: 15px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
`;

export const MyPlayer = styled.div`
  background-color: #f8d7da;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
`;

// 경기 일정 (가로 배치)
export const ScheduleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
`;

export const Match = styled.div`
  background-color: #dee2e6;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  min-width: 100px;
`;

// 입력 필드 스타일
export const Input = styled.input`
  width: 250px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  width: 270px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

// 로그인 컨테이너 스타일
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// 사이트 이름 스타일 (로그인 버튼 위에 배치)
export const SiteName2 = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`;

// 로그인 제목 스타일
export const LoginTitle = styled.h2`
  margin-bottom: 15px;
`;


export const LoginButton2 = styled(Button)`
  width: 250px;
  padding: 10px;
  background-color: ${({ theme }) => theme.primaryColor || "blue"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor || "darkblue"};
  }
`;

export const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: black;
`;

export const SignupButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  margin-top: 10px;
`;

// 🔹 회원가입 페이지 스타일
export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SignupTitle = styled.h2`
  margin-bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  background-color: green;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

// 회원가입 버튼 스타일
export const SignupText = styled.p`
  margin-top: 10px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: darkblue;
  }
`;