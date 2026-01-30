import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  background-color: #ffffff;
  color: #333333;
  min-height: 100vh;
  padding: 0;
`;

// 헤더 스타일
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

// 사이트 이름 (파란색, 좌측 상단)
export const SiteName = styled.h1`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.primaryColor || "#333"};
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
`;

// 로그인 버튼 (초록색, 우측 상단)
export const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor || "#28a745"};
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

// 메뉴바 스타일
export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding: 20px;
  margin-top: 80px; /* Header height offset */
`;

// 메뉴 아이템 스타일
export const NavItem = styled.a`
  margin: 0 25px;
  text-decoration: none;
  font-size: 16px;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primaryColor || "#007bff"};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
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