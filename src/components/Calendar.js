import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { getHolidayName } from "../utils/holidays";

// --- Styled Components ---

const CalendarWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: 700px;
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

const Sidebar = styled.div`
  width: 30%;
  background: ${({ theme }) => theme.primaryColor || "#6b48ff"}; /* Theme Color */
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
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
  overflow-y: auto;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar { display: none; }
`;

const MonthItem = styled.div`
  font-size: 1.2rem;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s;
  background: ${({ $active }) => $active ? "rgba(255,255,255,0.2)" : "transparent"};
  font-weight: ${({ $active }) => $active ? "bold" : "normal"};
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 50px;
  background: white;
  display: flex;
  flex-direction: column;
  color: #333; /* Force dark text since background is white */
`;

const CurrentMonthTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
  letter-spacing: 5px;
  font-weight: 300;
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
  text-align: center;
`;

const DayLabel = styled.div`
  font-weight: bold;
  color: #999;
  margin-bottom: 20px;
`;

const DayCell = styled.div`
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; /* Allow text below number */
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: ${({ $isToday }) => $isToday ? "bold" : "normal"};
  cursor: ${({ $isPlaceholder }) => $isPlaceholder ? "default" : "pointer"};
  position: relative;
  transition: all 0.2s;
  
  /* Background Logic */
  background: ${({ $hasEntry, theme }) => $hasEntry ? (theme.secondaryColor || "#FFC600") : "transparent"};
  
  /* Text Color Logic */
  color: ${({ $hasEntry, $isHoliday, $isPlaceholder }) => {
    if ($hasEntry) return "white";
    if ($isPlaceholder) return "#eee";
    if ($isHoliday) return "#E30113"; /* Holiday Red */
    return "#333";
  }};

  /* Today Marker (Border) */
  border: ${({ $isToday, theme }) => $isToday ? `2px solid ${theme.primaryColor || "#333"}` : "2px solid transparent"};

  &:hover {
    background: ${({ $isPlaceholder, theme }) => $isPlaceholder ? "transparent" : (theme.primaryColor || "#eee")};
    color: ${({ $isPlaceholder }) => $isPlaceholder ? "#eee" : "white"};
    opacity: 0.8;
  }
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

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [diaryEntries, setDiaryEntries] = useState({});

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || {};
    setDiaryEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

  const handleDateClick = (day) => {
    if (!day) return;
    const dateKey = `${year}-${month}-${day}`;
    const text = prompt("일기 내용을 입력하세요:", diaryEntries[dateKey] || "");
    if (text !== null) {
      setDiaryEntries((prev) => ({
        ...prev,
        [dateKey]: text.trim() ? text : undefined,
      }));
    }
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const renderDays = () => {
    const days = [];
    // Empty placeholders
    for (let i = 0; i < firstDay; i++) {
      days.push(<DayCell key={`empty-${i}`} $isPlaceholder />);
    }
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month}-${day}`;
      const currentDate = new Date(year, month - 1, day);
      const isSunday = currentDate.getDay() === 0;
      const isToday = today.getDate() === day && today.getMonth() + 1 === month && today.getFullYear() === year;

      // 공휴일 확인
      const holidayName = getHolidayName(year, month, day);

      days.push(
        <DayCell
          key={day}
          onClick={() => handleDateClick(day)}
          $hasEntry={!!diaryEntries[dateKey]}
          $isHoliday={isSunday || !!holidayName}
          $isToday={isToday}
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