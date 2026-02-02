# ⚾️ Y.P.T (Your Pitch Ticket) - FE
> **당신의 야구 직관 라이프를 더 완벽하게, 야구 팬들을 위한 올인원 플랫폼**

Y.P.T는 KBO 리그 팬들을 위해 경기 일정 확인, 직관 기록 관리(다이어리), 승부 예측 및 퀴즈(게이미피케이션) 기능을 제공하는 웹 서비스입니다. 사용자 맞춤형 테마와 인터랙티브한 UI를 통해 몰입감 있는 사용자 경험을 제공합니다.

🔗 **배포 주소**: [https://yptfe-js-projects-773e3136.vercel.app/](https://yptfe-js-projects-773e3136.vercel.app/)

---

## 🚀 Key Features (FE Focus)

### 1. Dynamic Team Theming (다이내믹 테마 시스템)
- 사용자가 응원하는 팀을 선택하면 서비스 전체의 **Primary/Secondary Color, Gradient, 텍스트 가독성**이 해당 팀의 정체성에 맞춰 실시간으로 변경됩니다.
- `Styled-components`의 `ThemeProvider`와 `localStorage`를 결합하여 페이지 새로고침 시에도 테마가 유지되도록 설계했습니다.

### 2. Interactive Gamification (게이미피케이션 요소)
- **승부 예측 & 퀴즈**: 오늘의 경기 결과를 예측하고 포인트를 획득하는 인터랙티브 기능을 구현했습니다.
- **출석 체크 시스템**: 사용자의 활동성을 높이기 위한 포인트 적립 UX를 제공합니다.

### 3. Personal Dashboard & Diary
- **내 정보 대시보드**: 개인 포인트 내역, 연속 출석일, 최근 경기 일정 및 팀 순위를 한눈에 확인하는 프리미엄 카드 디자인을 적용했습니다.
- **직관 일지**: 멀티미디어 업로드 및 감상평 기록이 가능한 에디터 기능을 포함합니다.

### 4. Custom Visual Elements
- **SVG Animation**: 헤더 로고에 CSS Keyframes를 활용한 통통 튀는 애니메이션을 적용하여 생동감을 부여했습니다.
- **Hand-coded SVG Icon**: 외부 이미지를 사용하는 대신, 레트로 감성의 카메라 아이콘을 직접 SVG 코드로 구현하여 해상도 최적화 및 스타일링 자유도를 높였습니다.

---

## 🛠 Tech Stack

- **Framework**: React (v18+)
- **Styling**: Styled-components (CSS-in-JS)
- **Routing**: React Router DOM (v6)
- **State Management**: React Hooks (State, Effect, Ref)
- **Infrastructure**: Vercel (CI/CD 자동화)

---

## 📁 Project Architecture (FE)

```text
src/
├── api/             # API 통신 로직 및 Mock 데이터 관리
├── components/      # 고도화된 공통 UI 컴포넌트 (Layout, Calendar 등)
├── theme/           # 팀별 디자인 시스템 정량화 (colors, gradients)
├── pages/           # 페이지 단위 대형 컴포넌트
│   ├── Home.js      # 전용 랜딩 페이지 및 기능 제한 로직 포함
│   ├── Profile.js   # 유저 데이터 시각화 대시보드
│   ├── ...          # 각 기능별 페이지
├── App.js           # 전역 라우팅 및 테마 컨텍스트 설정
└── styles.js        # 글로벌 스타일 및 공통 테마 유틸리티
```

---

## 💡 Implementation Highlights (Technical Challenges)

### ✔️ 비로그인 사용자 접근 제어 (UX Optimization)
사용자 경험을 위해 아예 특정 기능을 막기보다, **비로그인 시에도 서비스의 분위기를 볼 수 있도록** 홈 화면은 공개하되, 실제 기능 진입 시에는 '로그인 유도 팝업'과 함께 애니메이션 효과가 들어간 매력적인 안내 화면을 제공하여 전환율을 높이도록 설계했습니다.

### ✔️ 기기별 최적화 (Responsive Design)
PC 대시보드 레이아웃과 모바일 환경에서의 편의성을 모두 고려하여, `Grid`와 `Flexbox`를 활용한 반응형 레이아웃을 전 페이지에 적용했습니다.

### ✔️ 가독성 보정 알고리즘
배경색이 너무 밝거나 어두운 팀 컬러를 선택했을 때, 텍스트가 묻히지 않도록 테마 데이터 내에 `textColor` 보정값을 포함시켜 가독성을 자동으로 확보하는 로직을 적용했습니다.
