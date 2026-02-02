import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Diary from "./pages/Diary";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryList from "./pages/DiaryList";
import DiaryDetail from "./pages/DiaryDetail";
import SignUp from "./pages/SignUp";
import ExcitingZone from './pages/ExcitingZone';
import GuideZone from './pages/GuideZone';
import StadiumDetail from "./components/StadiumDetail";
import ReviewWrite from './pages/ReviewWrite';
import ReviewView from './pages/ReviewView';
import MatchPrediction from "./pages/MatchPrediction";
import Profile from './pages/Profile';
import teamThemes from "./theme/teams"; // 테마 정의 임포트

function App() {
  const [currentTheme, setCurrentTheme] = useState(teamThemes.default);

  // 로컬스토리지에서 저장된 팀 정보 확인하여 테마 적용
  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem("myTeam"));
    if (savedTeam && teamThemes[savedTeam.id]) {
      setCurrentTheme(teamThemes[savedTeam.id]);
    }
  }, []);

  // Mock Data Injection
  useEffect(() => {
    // Check for v2 to force update for January data
    const hasInjected = localStorage.getItem('mockDataInjected_v2');
    if (!hasInjected) {
      const mockEntries = {
        '2026-01-10': {
          weather: 'Sunny',
          mood: 'happy_pink',
          title: '2026 시즌 첫 직관! (잠실)',
          content: '드디어 시즌 시작! \n개막전 승리해서 너무 기분 좋다. \n올해는 우승 가자!',
          images: ['/assets/mock/photo_1.jpg', '/assets/mock/photo_2.jpg'],
          image: '/assets/mock/photo_1.jpg'
        },
        '2026-01-12': {
          weather: 'Cloudy',
          mood: 'excited_green',
          title: '잠실 먹방 투어',
          content: '경기보다 먹으러 온 듯... \n삼겹살 정식 진짜 맛있다. 강추!',
          images: ['/assets/mock/photo_2.jpg'],
          image: '/assets/mock/photo_2.jpg'
        },
        '2026-01-15': {
          weather: 'Rainy',
          mood: 'determined_red',
          title: '창원 원정 경기',
          content: '엔팍 시설 진짜 좋다. \n비록 경기는 졌지만 구경 잘 하고 옴.',
          images: ['/assets/mock/photo_3.jpg', '/assets/mock/photo_4.jpg'],
          image: '/assets/mock/photo_3.jpg'
        },
        '2026-01-20': {
          weather: 'Sunny',
          mood: 'happy_pink',
          title: '인천 원정 승리!',
          content: '인천 불꽃놀이 명당 자리 잡음. \n경기 이기고 불꽃놀이 보니까 환상적이다.',
          images: ['/assets/mock/photo_7.jpg'],
          image: '/assets/mock/photo_7.jpg'
        },
        '2026-01-25': {
          weather: 'Sunny',
          mood: 'happy_pink',
          title: '수원 위즈파크 나들이',
          content: '수원 통닭거리 들렀다가 직관. \n오늘 홈런 3방 터짐!!!',
          images: ['/assets/mock/photo_6.jpg', '/assets/mock/photo_8.jpg'],
          image: '/assets/mock/photo_6.jpg'
        }
      };

      localStorage.setItem('diaryEntries', JSON.stringify(mockEntries));
      localStorage.setItem('mockDataInjected_v2', 'true');
      console.log("Mock Data Injected (v2 - January)!");
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="diary" element={<Diary />} />
            <Route path="diary/write/:date" element={<DiaryWrite />} />
            <Route path="diary/list" element={<DiaryList />} />
            <Route path="diary/detail/:date" element={<DiaryDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="excitingzone" element={<ExcitingZone />} />
            <Route path="/guidezone" element={<GuideZone />} />
            <Route path="/stadium/:id" element={<StadiumDetail />} />
            <Route path="review/write" element={<ReviewWrite />} />
            <Route path="review/view" element={<ReviewView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/prediction" element={<MatchPrediction />} /> {/* Added route */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
