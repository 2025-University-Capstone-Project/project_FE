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
