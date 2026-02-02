import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getHolidayName } from "../utils/holidays";

// --- Styled Components ---

const CalendarWrapper = styled.div`
  display: flex;
  width: 98%; /* Almost full width */
  max-width: 1800px; /* Very wide max-width */
  min-height: 500px; /* Reduced min-height */
  margin: 0 auto;
  background: white;
  border-radius: 30px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.3); /* Stronger shadow */
  border: 4px solid rgba(255, 255, 255, 0.2); /* Glassy border */
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 10;
`;

// ... imports

// ... Styled Components (Sidebar updated)
const Sidebar = styled.div`
  width: 280px; /* Reduced width to give grid more space */
  flex-shrink: 0; /* Don't shrink */
  background: ${({ theme }) => theme.primaryColor || "#6b48ff"};
  color: white;
  padding: 30px; /* Reduced padding */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

// ...

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem; /* Smaller font */
  font-weight: bold;
  
  span {
    cursor: pointer;
    opacity: 0.8;
    &:hover { opacity: 1; }
  }
`;

const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 40px;
  margin-bottom: 20px;
  flex: 1; /* Take remaining space */
  overflow-y: auto;
  min-height: 0; /* Crucial for flex scrolling */
  
  /* Hide scrollbar */
  &::-webkit-scrollbar { display: none; }
`;

const MonthItem = styled.div`
  font-size: 1rem; /* Smaller font */
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s;
  background: ${({ $active }) => $active ? "rgba(255,255,255,0.2)" : "transparent"};
  font-weight: ${({ $active }) => $active ? "bold" : "normal"};
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const ListLinkBtn = styled.button`
  flex-shrink: 0;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px; /* Spacious padding */
  background: white;
  display: flex;
  flex-direction: column;
  color: #333;
`;

const CurrentMonthTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem; /* Large title */
  color: #333;
  margin-bottom: 40px;
  letter-spacing: 5px;
  font-weight: 300;
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px; /* Grid gap */
  text-align: center;
`;

const DayLabel = styled.div`
  font-weight: bold;
  color: #999;
  margin-bottom: 10px;
`;

const HolidayText = styled.span`
  font-size: 0.6rem;
  margin-top: 2px;
  color: #E30113;
  white-space: nowrap;
`;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ...

const DayCell = styled.div`
  width: 85%; /* Don't fill the grid cell */
  max-width: 120px; /* Cap the size */
  aspect-ratio: 1 / 1;
  margin: 0 auto; /* Center in grid cell */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: ${({ $isToday }) => $isToday ? "bold" : "normal"};
  cursor: ${({ $isPlaceholder }) => $isPlaceholder ? "default" : "pointer"};
  position: relative;
  transition: all 0.2s;
  
  /* Background Logic */
  background: ${({ $hasEntry, theme, $bgImage }) => {
    if ($bgImage) return `url("${$bgImage}") center/cover no-repeat`; // Added quotes
    if ($hasEntry) return (theme.secondaryColor || "#FFC600");
    return "#f9f9f9"; /* Default background for empty days */
  }};
  
  /* Text Color Logic */
  color: ${({ $hasEntry, $isHoliday, $isPlaceholder, $bgImage }) => {
    if ($bgImage) return "white"; // White text on image
    if ($hasEntry) return "white";
    if ($isPlaceholder) return "transparent";
    if ($isHoliday) return "#E30113";
    return "#333";
  }};

  /* Text Shadow for readability on image */
  text-shadow: ${({ $bgImage }) => $bgImage ? "0 2px 4px rgba(0,0,0,0.8)" : "none"};

  /* Today Marker */
  border: ${({ $isToday, theme }) => $isToday ? `2px solid ${theme.primaryColor || "#333"}` : "2px solid transparent"};
  
  /* Hide placeholders visually but keep layout */
  opacity: ${({ $isPlaceholder }) => $isPlaceholder ? "0" : "1"};
  pointer-events: ${({ $isPlaceholder }) => $isPlaceholder ? "none" : "auto"};

  &:hover {
    opacity: 0.7;
    border: ${({ $isPlaceholder, theme }) => $isPlaceholder ? "none" : `2px solid ${theme.primaryColor || "#333"}`};
  }
`;

// ...

const Calendar = () => {
  // ... (state setup)
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [diaryEntries, setDiaryEntries] = useState({});

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
    setDiaryEntries(savedEntries);
  }, []);

  // ... (navigate, getDaysInMonth, etc.)
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();
  const navigate = useNavigate();

  const handleDateClick = (day) => {
    if (!day) return;
    const dateKey = `${year}-${month}-${day}`;
    navigate(`/diary/write/${dateKey}`);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<DayCell key={`empty-${i}`} $isPlaceholder />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month}-${day}`;
      const currentDate = new Date(year, month - 1, day);
      const isSunday = currentDate.getDay() === 0;
      const isToday = today.getDate() === day && today.getMonth() + 1 === month && today.getFullYear() === year;
      const holidayName = getHolidayName(year, month, day);

      const entry = diaryEntries[dateKey];
      const hasEntry = !!entry;

      // Image Logic
      let bgImage = null;
      if (hasEntry) {
        let images = [];
        if (entry.images && Array.isArray(entry.images)) {
          images = entry.images;
        } else if (entry.image) {
          images = [entry.image];
        }

        if (images.length > 0) {
          // Randomly select one image
          const randomIndex = Math.floor(Math.random() * images.length);
          bgImage = images[randomIndex];
        }
      }

      days.push(
        <DayCell
          key={day}
          onClick={() => handleDateClick(day)}
          $hasEntry={hasEntry}
          $isHoliday={isSunday || !!holidayName}
          $isToday={isToday}
          $bgImage={bgImage}
        >
          {day}
          {holidayName && <HolidayText>{holidayName}</HolidayText>}
        </DayCell>
      );
    }
    return days;
  };

  return (
    <CalendarWrapper>
      <Sidebar>
        <HeaderNav>
          <span onClick={() => setYear(year - 1)}>‹</span>
          <span>{year}</span>
          <span onClick={() => setYear(year + 1)}>›</span>
        </HeaderNav>
        <MonthList>
          {months.map((m, index) => (
            <MonthItem
              key={m}
              $active={month === index + 1}
              onClick={() => setMonth(index + 1)}
            >
              {m}
            </MonthItem>
          ))}
        </MonthList>
        <ListLinkBtn onClick={() => navigate('/diary/list')}>
          일지 모아보기
        </ListLinkBtn>
      </Sidebar>
      <MainContent>
        <CurrentMonthTitle>{months[month - 1]}</CurrentMonthTitle>
        <DaysGrid>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <DayLabel key={d}>{d}</DayLabel>
          ))}
          {renderDays()}
        </DaysGrid>
      </MainContent>
    </CalendarWrapper>
  );
};

export default Calendar;