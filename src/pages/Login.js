import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import api from "../api/api"; // API 인스턴스 임포트

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.id || !form.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // ... logic remains same ...
    try {
      const response = await api.post("/api/auth/login", {
        id: form.id,
        password: form.password,
      });

      if (response && response.data) {
        alert("로그인 성공!");
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleKakaoLogin = () => {
    // Kakao Login Logic here
    // Ex: window.location.href = KAKAO_AUTH_URL;
    alert("카카오 로그인은 아직 준비중입니다!");
  };

  return (
    <PageContainer>
      <AuthCard>
        {/* Visual Side (Left) */}
        <VisualSide>
          <VisualContent>
            <LogoText>Y.P.T</LogoText>
            <Slogan>
              The Ultimate<br />
              Baseball Platform
            </Slogan>
          </VisualContent>
          {/* Floating Decorations (Baseball Icon) */}
          <FloatingBall src="/images/baseball_deco.png" size="150px" top="5%" right="10%" delay="0s" />
          <FloatingBall src="/images/baseball_deco.png" size="100px" bottom="20%" right="15%" delay="2s" />
          <FloatingBall src="/images/baseball_deco.png" size="60px" top="15%" left="10%" delay="4s" blur="2px" />
        </VisualSide>

        {/* Form Side (Right) */}
        <FormSide>
          <FormContainer>
            <FormTitle>Welcome Back!</FormTitle>
            <FormSubtitle>Please enter your details</FormSubtitle>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <StyledInput
                name="id"
                type="text"
                placeholder="User Name"
                onChange={handleChange}
              />
              <StyledInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <ForgotPassword>Forgot password?</ForgotPassword>

              <StyledButton type="submit">Log in</StyledButton>

              <OrDivider>OR</OrDivider>

              <KakaoButton type="button" onClick={handleKakaoLogin}>
                <KakaoIcon src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" />
                카카오 로그인
              </KakaoButton>
            </form>

            <DividerText>Don't have any account? <span onClick={() => navigate("/signup")}>Sign Up</span></DividerText>
          </FormContainer>
        </FormSide>
      </AuthCard>
    </PageContainer>
  );
};

// --- Styled Components for Login ---
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px); /* Adjust based on header heights */
  padding: 40px;
  background: white;
  font-family: 'Poppins', sans-serif;
`;

const AuthCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const VisualSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #FF4B6B 0%, #FF8E53 100%); /* Vibrant Red/Orange gradient */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  color: white;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px;
    align-items: center;
    text-align: center;
  }
`;

const VisualContent = styled.div`
  z-index: 2;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const Slogan = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
  opacity: 0.9;
`;

const floatingAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const FloatingBall = styled.img`
  position: absolute;
  width: ${props => props.size};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  filter: blur(${props => props.blur || "0px"});
  opacity: 0.8;
  animation: ${floatingAnimation} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay};
`;

const FormSide = styled.div`
  flex: 1;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;
`;

const FormSubtitle = styled.p`
  color: #888;
  margin-bottom: 40px;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #FF4B6B;
    background: white;
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  color: #FF4B6B;
  font-size: 0.9rem;
  margin-bottom: 30px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #FF4B6B 0%, #FF8E53 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 5px 15px rgba(255, 75, 107, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 75, 107, 0.4);
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #888;
  font-size: 0.9rem;
  
  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  
  &::before { margin-right: 10px; }
  &::after { margin-left: 10px; }
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #FEE500;
  color: #191919;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    background: #FDD835;
  }
`;

const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const DividerText = styled.p`
  text-align: center;
  margin-top: 30px;
  color: #888;
  
  span {
    color: #FF4B6B;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
  }
`;

export default Login;