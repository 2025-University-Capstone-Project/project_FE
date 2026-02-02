import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 사용자 정보 로컬에 저장
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ id: form.id, password: form.password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  }

  return (
    <PageContainer>
      <AuthCard>
        {/* Visual Side (Left) */}
        <VisualSide>
          <VisualContent>
            <LogoText>Y.P.T</LogoText>
            <Slogan>
              Join the<br />
              Winning Team
            </Slogan>
          </VisualContent>
          {/* Floating Decorations */}
          <FloatingBall src="/images/baseball_deco.png" size="180px" top="10%" left="-5%" delay="0s" />
          <FloatingBall src="/images/baseball_deco.png" size="120px" bottom="15%" right="10%" delay="1.5s" />
          <FloatingBall src="/images/baseball_deco.png" size="80px" top="40%" left="20%" delay="3s" blur="1px" />
        </VisualSide>

        {/* Form Side (Right) */}
        <FormSide>
          <FormContainer>
            <FormTitle>Create Account</FormTitle>
            <FormSubtitle>Start your journey with us</FormSubtitle>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
              <StyledInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />

              <StyledButton type="submit">Sign Up</StyledButton>
            </form>

            <DividerText>Already have an account? <span onClick={() => navigate("/login")}>Log In</span></DividerText>
          </FormContainer>
        </FormSide>
      </AuthCard>
    </PageContainer>
  );
};

// --- Styled Components (Reused Structure) ---
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Deep Purple/Blue for Signup to distinguish */
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
    border-color: #764ba2;
    background: white;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(118, 75, 162, 0.4);
  }
`;

const DividerText = styled.p`
  text-align: center;
  margin-top: 30px;
  color: #888;
  
  span {
    color: #764ba2;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
  }
`;


export default SignUp;
