import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WeatherIcons, MoodIcons, weatherTranslations } from './DiaryWrite';

const DiaryDetail = () => {
    const { date } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
        if (savedEntries[date]) {
            let loaded = savedEntries[date];
            // Backward compatibility
            if (loaded.image && !loaded.images) {
                loaded.images = [loaded.image];
            }
            if (!loaded.images) loaded.images = [];
            setEntry(loaded);
        }
    }, [date]);

    if (!entry) return <Container>Loading...</Container>;

    const WeatherIcon = WeatherIcons[entry.weather];
    const moodObj = MoodIcons.find(m => m.id === entry.mood) || MoodIcons[0];

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
            delete savedEntries[date];
            localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
            navigate('/diary/list');
        }
    };

    const nextSlide = () => {
        if (currentSlide < entry.images.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <Wrapper>
            <Container>
                {/* Top Navigation */}
                <TopNav>
                    <BackBtn onClick={() => navigate('/diary/list')}>&lt; 홈으로</BackBtn>
                    <ActionBtnGroup>
                        <ActionBtn onClick={() => navigate(`/diary/write/${date}`)}>수정</ActionBtn>
                        <ActionBtn onClick={handleDelete}>삭제</ActionBtn>
                    </ActionBtnGroup>
                </TopNav>

                {/* Header Date & Title */}
                <Header>
                    <DateText>{date.replace(/-/g, ' / ')}</DateText>
                    <TitleText>{entry.title}</TitleText>
                </Header>

                {/* Weather & Mood Section */}
                <InfoRow>
                    <InfoGroup>
                        <InfoLabel>오늘의 날씨</InfoLabel>
                        <InfoValue>
                            <span style={{ marginRight: '8px' }}>{weatherTranslations[entry.weather] || entry.weather}</span>
                            <IconWrapper><WeatherIcon /></IconWrapper>
                        </InfoValue>
                        <Underline />
                    </InfoGroup>
                    <InfoGroup>
                        <InfoLabel>오늘의 기분</InfoLabel>
                        <InfoValue>
                            <span style={{ marginRight: '8px' }}>{moodObj.label}</span>
                            <IconWrapper>{moodObj.component()}</IconWrapper>
                        </InfoValue>
                        <Underline />
                    </InfoGroup>
                </InfoRow>

                {/* Content Section */}
                <ContentRow>
                    {/* Photo Slider */}
                    <PhotoArea>
                        <PhotoLabel>오늘의 사진</PhotoLabel>
                        {entry.images && entry.images.length > 0 ? (
                            <SliderContainer>
                                <StyledImage src={entry.images[currentSlide]} alt="diary" />

                                {entry.images.length > 1 && (
                                    <>
                                        <SlideBtn
                                            direction="left"
                                            onClick={prevSlide}
                                            disabled={currentSlide === 0}
                                        >
                                            &lt;
                                        </SlideBtn>
                                        <SlideBtn
                                            direction="right"
                                            onClick={nextSlide}
                                            disabled={currentSlide === entry.images.length - 1}
                                        >
                                            &gt;
                                        </SlideBtn>
                                        <PageIndicator>
                                            {currentSlide + 1} / {entry.images.length}
                                        </PageIndicator>
                                    </>
                                )}
                            </SliderContainer>
                        ) : (
                            <NoPhoto>사진 없음</NoPhoto>
                        )}
                    </PhotoArea>

                    {/* Text Content */}
                    <TextArea>
                        <TextLabel>오늘의 하루</TextLabel>
                        <TextContent>
                            {entry.content}
                        </TextContent>
                    </TextArea>
                </ContentRow>
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
    font-family: 'Gaegu', cursive;
`;

const Container = styled.div`
    width: 800px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
`;

const TopNav = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 1.1rem;
    color: #555;
`;

const BackBtn = styled.div`
    cursor: pointer;
    &:hover { color: #000; }
`;

const ActionBtnGroup = styled.div`
    display: flex;
    gap: 15px;
`;

const ActionBtn = styled.div`
    cursor: pointer;
    &:hover { color: #000; text-decoration: underline; }
`;

const Header = styled.div`
    margin-bottom: 40px;
`;

const DateText = styled.div`
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 5px;
`;

const TitleText = styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
`;

const InfoRow = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
`;

const InfoGroup = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const InfoLabel = styled.div`
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 10px;
`;

const InfoValue = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: #888;
    padding-bottom: 10px;
`;

const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Underline = styled.div`
    height: 1px;
    background-color: #ddd;
    width: 100%;
`;

const ContentRow = styled.div`
    display: flex;
    gap: 40px;
`;

const PhotoArea = styled.div`
    flex: 1;
`;

const PhotoLabel = styled.div`
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 15px;
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px; /* Fixed height for consistency */
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const SlideBtn = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.7);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover:not(:disabled) { background: white; }
    &:disabled { opacity: 0.3; cursor: default; }
    
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
`;

const PageIndicator = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.5);
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
`;

const NoPhoto = styled.div`
    width: 100%;
    height: 250px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border-radius: 4px;
`;

const TextArea = styled.div`
    flex: 1;
`;

const TextLabel = styled.div`
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 15px;
`;

const TextContent = styled.div`
    font-size: 1.2rem;
    color: #444;
    line-height: 1.6;
    white-space: pre-wrap;
    font-family: 'Gaegu', cursive;
`;

export default DiaryDetail;
