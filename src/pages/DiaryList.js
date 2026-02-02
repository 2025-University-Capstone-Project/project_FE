import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DiaryList = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [sortedEntries, setSortedEntries] = useState([]);
    const [filter, setFilter] = useState(() => {
        const today = new Date();
        const prev = new Date(today);
        prev.setMonth(today.getMonth() - 1);
        const format = d => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${dd}`;
        };
        return { from: format(prev), to: format(today) };
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('diaryEntries')) || {};
        const entryList = Object.keys(saved).map(date => ({
            date,
            ...saved[date]
        }));
        // Sort by date descending
        entryList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(entryList);
        setSortedEntries(entryList);
    }, []);

    const handleLoad = () => {
        // Simple filter logic
        if (!filter.from || !filter.to) return;
        const filtered = entries.filter(e => e.date >= filter.from && e.date <= filter.to);
        setSortedEntries(filtered);
    };

    return (
        <Wrapper>
            <Container>
                <Title>일지 모아보기</Title>

                <FilterSection>
                    <DateGroup>
                        <Label>From</Label>
                        <DateInput
                            type="date"
                            value={filter.from}
                            onChange={e => setFilter({ ...filter, from: e.target.value })}
                        />
                    </DateGroup>
                    <DateGroup>
                        <Label>to</Label>
                        <DateInput
                            type="date"
                            value={filter.to}
                            onChange={e => setFilter({ ...filter, to: e.target.value })}
                        />
                    </DateGroup>
                </FilterSection>
                <ButtonContainer>
                    <LoadBtn onClick={handleLoad}>불러오기</LoadBtn>
                </ButtonContainer>

                <ListContainer>
                    {sortedEntries.map((entry) => (
                        <ListItem key={entry.date} onClick={() => navigate(`/diary/detail/${entry.date}`)}>
                            <ItemTitle>{entry.title || "제목 없음"}</ItemTitle>
                            <ItemDate>{entry.date}</ItemDate>
                        </ListItem>
                    ))}
                    {sortedEntries.length === 0 && <EmptyMsg>표시할 일지가 없습니다.</EmptyMsg>}
                </ListContainer>

                <Pagination>
                    <span>&lt;</span> <span className="active">1</span> <span>&gt;</span>
                </Pagination>
            </Container>
        </Wrapper>
    );
};

// Styled Components
const Wrapper = styled.div`
    background-color: white;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 50px;
`;

const Container = styled.div`
    padding: 40px 20px;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.5rem;
    color: #333;
`;

const FilterSection = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const DateGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Label = styled.label`
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 5px;
`;

const DateInput = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 0.9rem;
    width: 140px;
    text-align: center;
    outline: none;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

const LoadBtn = styled.button`
    padding: 8px 30px;
    background: white;
    border: 1px solid #333;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover { background: #f5f5f5; }
`;

const ListContainer = styled.div`
    border-top: 1px solid #eee;
    margin-bottom: 40px;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #fafafa; }
`;

const ItemTitle = styled.div`
    font-size: 1rem;
    color: #333;
    padding-left: 10px;
`;

const ItemDate = styled.div`
    font-size: 0.9rem;
    color: #888;
    padding-right: 10px;
`;

const EmptyMsg = styled.div`
    padding: 40px;
    text-align: center;
    color: #999;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    color: #ccc;
    
    .active {
        color: #333;
        font-weight: bold;
    }
    
    span {
        cursor: pointer;
    }
`;

export default DiaryList;
