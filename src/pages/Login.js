import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginTitle,
  Input,
  LoginButton,
  SiteName,
  SignupText
} from "../styles";

import api from "../api/api"; // API 인스턴스 임포트

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });

  // 입력값 변경 처리
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!form.id || !form.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // ✅ 실제 서버로 로그인 요청 전송
      const response = await api.post("/api/auth/login", {
        id: form.id,
        password: form.password,
      });

      if (response && response.data) {
        alert("로그인 성공!");

        // ✅ 로그인 유저 정보 저장 (응답 구조에 맞게 수정 필요)
        // 예: response.data가 User 객체 자체이거나 token을 포함할 수 있음
        // 지금은 응답 데이터를 그대로 저장
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));

        // 홈으로 이동
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // 에러 메시지 처리 (서버에서 보내주는 메시지가 있다면 활용)
      const errorMessage = error.response?.data?.message || "아이디 또는 비밀번호가 틀렸습니다.";
      alert(errorMessage);
    }
  };

  return (
    <LoginContainer>
      <SiteName onClick={() => navigate("/")}>Y.P.T</SiteName>
      <LoginTitle>로그인</LoginTitle>

      {/* 로그인 이미지 */}
      <img
        src="/assets/login-image.png"
        alt="로그인 이미지"
        style={{ width: "200px", marginBottom: "20px" }}
      />

      {/* 입력 폼 */}
      <Input
        name="id"
        type="text"
        placeholder="아이디"
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>

      <SignupText onClick={() => navigate("/signup")}>회원가입</SignupText>
    </LoginContainer>
  );
};

export default Login;