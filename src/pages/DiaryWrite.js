import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- Icons (SVGs) ---
// --- Icons (SVGs) ---
// --- Icons (SVGs) ---
export const WeatherIcons = {
    Sunny: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Sun Body */}
            <circle cx="50" cy="50" r="25" fill="#ff7043" stroke="#d84315" strokeWidth="3" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#ffab91" strokeWidth="2" strokeDasharray="4 4" />
            {/* Rays */}
            <g stroke="#ff5722" strokeWidth="4" strokeLinecap="round">
                <line x1="50" y1="15" x2="50" y2="5" />
                <line x1="50" y1="85" x2="50" y2="95" />
                <line x1="15" y1="50" x2="5" y2="50" />
                <line x1="85" y1="50" x2="95" y2="50" />
                <line x1="25" y1="25" x2="18" y2="18" />
                <line x1="75" y1="75" x2="82" y2="82" />
                <line x1="75" y1="25" x2="82" y2="18" />
                <line x1="25" y1="75" x2="18" y2="82" />
            </g>
        </svg>
    ),
    Cloudy: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Cloud main */}
            <path d="M25 65 Q15 65 15 55 Q15 40 30 40 Q35 20 55 25 Q70 15 80 35 Q90 35 90 50 Q90 65 75 65 Z"
                fill="#81d4fa" stroke="#29b6f6" strokeWidth="3" strokeLinejoin="round" />
            {/* Inner texture lines */}
            <path d="M30 45 Q35 30 45 35" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M60 30 Q70 25 75 40" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
    ),
    Rainy: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Cloud */}
            <path d="M25 60 Q15 60 15 50 Q15 35 30 35 Q35 15 55 20 Q70 10 80 30 Q90 30 90 45 Q90 60 75 60 Z"
                fill="#cfd8dc" stroke="#90a4ae" strokeWidth="3" strokeLinejoin="round" />
            {/* Rain drops */}
            <path d="M35 70 L30 85" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 70 L45 85" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round" />
            <path d="M65 70 L60 85" stroke="#4fc3f7" strokeWidth="4" strokeLinecap="round" />
        </svg>
    ),
    Snowy: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Cloud */}
            <path d="M25 60 Q15 60 15 50 Q15 35 30 35 Q35 15 55 20 Q70 10 80 30 Q90 30 90 45 Q90 60 75 60 Z"
                fill="#eceff1" stroke="#b0bec5" strokeWidth="3" strokeLinejoin="round" />
            {/* Snowflakes */}
            <g transform="translate(30, 75)" stroke="#81d4fa" strokeWidth="2">
                <line x1="0" y1="-5" x2="0" y2="5" />
                <line x1="-5" y1="0" x2="5" y2="0" />
                <line x1="-4" y1="-4" x2="4" y2="4" />
                <line x1="4" y1="-4" x2="-4" y2="4" />
            </g>
            <g transform="translate(55, 80)" stroke="#81d4fa" strokeWidth="2">
                <line x1="0" y1="-5" x2="0" y2="5" />
                <line x1="-5" y1="0" x2="5" y2="0" />
                <line x1="-4" y1="-4" x2="4" y2="4" />
                <line x1="4" y1="-4" x2="-4" y2="4" />
            </g>
            <g transform="translate(80, 70)" stroke="#81d4fa" strokeWidth="2">
                <line x1="0" y1="-5" x2="0" y2="5" />
                <line x1="-5" y1="0" x2="5" y2="0" />
                <line x1="-4" y1="-4" x2="4" y2="4" />
                <line x1="4" y1="-4" x2="-4" y2="4" />
            </g>
        </svg>
    ),
    PartlyCloudy: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            {/* Sun behind */}
            <circle cx="65" cy="40" r="15" fill="#ff7043" stroke="#d84315" strokeWidth="2" />
            <line x1="65" y1="15" x2="65" y2="10" stroke="#ff5722" strokeWidth="3" />
            <line x1="85" y1="25" x2="90" y2="20" stroke="#ff5722" strokeWidth="3" />
            <line x1="90" y1="40" x2="95" y2="40" stroke="#ff5722" strokeWidth="3" />
            {/* Cloud */}
            <path d="M20 70 Q10 70 10 60 Q10 45 25 45 Q30 30 50 35 Q60 25 70 40 Q80 40 80 55 Q80 70 65 70 Z"
                fill="#ffffff" stroke="#90a4ae" strokeWidth="3" strokeLinejoin="round" />
        </svg>
    ),
    Lightning: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            <path d="M55 10 L25 50 L45 55 L35 90 L65 50 L45 45 Z"
                fill="#fff176" stroke="#fdd835" strokeWidth="3" strokeLinejoin="round" />
        </svg>
    ),
    Thunderstorm: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            <path d="M25 55 Q15 55 15 45 Q15 30 30 30 Q35 10 55 15 Q70 5 80 25 Q90 25 90 40 Q90 55 75 55 Z"
                fill="#78909c" stroke="#546e7a" strokeWidth="3" strokeLinejoin="round" />
            <path d="M45 60 L35 80 L45 82 L40 95 L60 75 L50 73 Z"
                fill="#fff176" stroke="#fdd835" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    ),
    Windy: () => (
        <svg width="40" height="40" viewBox="0 0 100 100">
            <path d="M20 40 Q40 30 60 40 T90 35" stroke="#bdbdbd" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M10 60 Q30 50 50 60 T80 55" stroke="#bdbdbd" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M30 80 Q50 70 70 80" stroke="#bdbdbd" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
    ),
};

// Custom SVG Mood Icons based on user's image
export const MoodIcons = [
    {
        id: 'sad_blue', label: '우울',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#4A90E2" />
                <circle cx="35" cy="40" r="4" fill="black" />
                <circle cx="65" cy="40" r="4" fill="black" />
                <path d="M35 70 Q50 60 65 70" stroke="black" strokeWidth="3" fill="none" />
                <path d="M25 55 Q30 55 30 65" stroke="#81D4FA" strokeWidth="3" fill="none" />
            </svg>
        )
    },
    {
        id: 'happy_pink', label: '행복',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#FFCDD2" />
                <circle cx="35" cy="45" r="4" fill="black" />
                <circle cx="65" cy="45" r="4" fill="black" />
                <path d="M35 60 Q50 75 65 60" stroke="black" strokeWidth="3" fill="none" />
                <circle cx="30" cy="55" r="5" fill="#EF9A9A" opacity="0.6" />
                <circle cx="70" cy="55" r="5" fill="#EF9A9A" opacity="0.6" />
            </svg>
        )
    },
    {
        id: 'anxious_purple', label: '불안',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#CE93D8" />
                <circle cx="35" cy="40" r="4" fill="black" />
                <circle cx="65" cy="40" r="4" fill="black" />
                <path d="M35 70 L40 65 L45 70 L50 65 L55 70 L60 65" stroke="black" strokeWidth="3" fill="none" />
            </svg>
        )
    },
    {
        id: 'smile_yellow', label: '좋음',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#FFF59D" />
                <circle cx="35" cy="45" r="4" fill="black" />
                <circle cx="65" cy="45" r="4" fill="black" />
                <path d="M40 65 Q50 70 60 65" stroke="black" strokeWidth="3" fill="none" />
                <circle cx="25" cy="50" r="5" fill="#FFCC80" opacity="0.6" />
                <circle cx="75" cy="50" r="5" fill="#FFCC80" opacity="0.6" />
            </svg>
        )
    },
    {
        id: 'angry_red', label: '화남',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#EF5350" />
                <path d="M30 35 L45 45" stroke="black" strokeWidth="3" />
                <path d="M70 35 L55 45" stroke="black" strokeWidth="3" />
                <circle cx="40" cy="50" r="4" fill="black" />
                <circle cx="60" cy="50" r="4" fill="black" />
                <path d="M35 70 Q50 60 65 70" stroke="black" strokeWidth="3" fill="none" />
            </svg>
        )
    },
    {
        id: 'surprised_teal', label: '놀람',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#4DB6AC" />
                <path d="M30 40 Q35 30 40 40" stroke="black" strokeWidth="2" fill="none" />
                <path d="M60 40 Q65 30 70 40" stroke="black" strokeWidth="2" fill="none" />
                <circle cx="35" cy="50" r="3" fill="black" />
                <circle cx="65" cy="50" r="3" fill="black" />
                <ellipse cx="50" cy="70" rx="10" ry="15" stroke="black" strokeWidth="3" fill="none" />
            </svg>
        )
    },
    {
        id: 'sobbing_blue', label: '오열',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#5C6BC0" />
                <path d="M30 50 Q35 45 40 50" stroke="black" strokeWidth="3" fill="none" />
                <path d="M60 50 Q65 45 70 50" stroke="black" strokeWidth="3" fill="none" />
                <path d="M35 70 Q50 60 65 70" stroke="black" strokeWidth="3" fill="none" />
                <path d="M40 70 Q50 85 60 70" stroke="none" fill="#4A90E2" />
                <rect x="30" y="55" width="10" height="30" fill="#90CAF9" rx="5" />
                <rect x="60" y="55" width="10" height="30" fill="#90CAF9" rx="5" />
            </svg>
        )
    },
    {
        id: 'determined_red', label: '열정',
        component: () => (
            <svg width="40" height="40" viewBox="0 10 100 100">
                <circle cx="50" cy="50" r="45" fill="#FF5252" />
                <path d="M10 40 Q50 20 90 40" stroke="white" strokeWidth="10" fill="none" />
                <circle cx="35" cy="55" r="4" fill="black" />
                <circle cx="65" cy="55" r="4" fill="black" />
                <path d="M25 45 L40 50" stroke="black" strokeWidth="3" />
                <path d="M75 45 L60 50" stroke="black" strokeWidth="3" />
                <path d="M45 70 H55" stroke="black" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'gloomy_grey', label: '시무룩',
        component: () => (
            <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#E0E0E0" />
                <path d="M30 45 Q35 40 40 45" stroke="black" strokeWidth="2" fill="none" />
                <path d="M60 45 Q65 40 70 45" stroke="black" strokeWidth="2" fill="none" />
                <path d="M40 70 Q50 65 60 70" stroke="black" strokeWidth="2" fill="none" />
                <circle cx="75" cy="50" r="3" fill="#B0BEC5" />
            </svg>
        )
    },
];

export const weatherTranslations = {
    Sunny: '맑음',
    Cloudy: '흐림',
    Rainy: '비',
    Snowy: '눈',
    PartlyCloudy: '흐림뒤 갬',
    Lightning: '번개',
    Thunderstorm: '뇌우',
    Windy: '바람',
};

const DiaryWrite = () => {
    const { date } = useParams();
    const navigate = useNavigate();

    // State for form data
    const [entry, setEntry] = useState({
        weather: 'Sunny',
        mood: 'happy_pink',
        title: '',
        content: '',
        images: []
    });

    // State for Dropdowns
    const [isWeatherOpen, setIsWeatherOpen] = useState(false);
    const [isMoodOpen, setIsMoodOpen] = useState(false);

    const weatherRef = React.useRef(null);
    const moodRef = React.useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (weatherRef.current && !weatherRef.current.contains(event.target)) {
                setIsWeatherOpen(false);
            }
            if (moodRef.current && !moodRef.current.contains(event.target)) {
                setIsMoodOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
        if (savedEntries[date]) {
            let loaded = savedEntries[date];
            // Backward compatibility: convert single image to array
            if (loaded.image && !loaded.images) {
                loaded.images = [loaded.image];
            }
            if (!loaded.images) loaded.images = [];

            setEntry(loaded);
        }
    }, [date]);

    // Toggling logic with mutual exclusion
    const toggleWeather = () => {
        if (!isWeatherOpen) setIsMoodOpen(false); // Close mood if opening weather
        setIsWeatherOpen(!isWeatherOpen);
    };

    const toggleMood = () => {
        if (!isMoodOpen) setIsWeatherOpen(false); // Close weather if opening mood
        setIsMoodOpen(!isMoodOpen);
    };

    const handleSave = () => {
        const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
        const safeEntry = { ...entry };
        // Ensure legacy image field is synced if needed, or just rely on images
        if (safeEntry.images.length > 0) {
            safeEntry.image = safeEntry.images[0]; // fallback
        } else {
            safeEntry.image = null;
        }

        savedEntries[date] = safeEntry;
        localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
        alert('저장되었습니다.');
        navigate('/diary/list');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (entry.images.length >= 5) {
                alert('사진은 최대 5장까지 등록 가능합니다.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setEntry({ ...entry, images: [...entry.images, reader.result] });
            };
            reader.readAsDataURL(file);
        }
        e.target.value = ''; // Reset input
    };

    const handleDeleteImage = (index) => {
        const newImages = entry.images.filter((_, i) => i !== index);
        setEntry({ ...entry, images: newImages });
    };

    // Helper to get current selected icon component
    const SelectedWeatherIcon = WeatherIcons[entry.weather];
    const selectedMoodObj = MoodIcons.find(m => m.id === entry.mood) || MoodIcons[0];

    const [year, month, day] = date ? date.split('-') : ['0000', '00', '00'];

    return (
        <Wrapper>
            <Container>
                {/* Header Section */}
                <TopNav onClick={() => navigate('/diary')}>
                    &lt; 홈으로
                </TopNav>

                <DateHeader>
                    <span className="date-str">{year} / {month} / {day}</span>
                    <h1>오늘의 직관일지</h1>
                </DateHeader>

                {/* Title Input */}
                <Section>
                    <StyledInput
                        placeholder="제목을 입력하세요"
                        value={entry.title}
                        onChange={(e) => setEntry({ ...entry, title: e.target.value })}
                    />
                </Section>

                {/* Dropdowns Row */}
                <DropdownRow>
                    {/* Weather Dropdown */}
                    <DropdownContainer ref={weatherRef}>
                        <DropdownHeader onClick={toggleWeather}>
                            <div className="value">
                                <span style={{ marginRight: '8px', color: '#555' }}>{weatherTranslations[entry.weather] || entry.weather}</span>
                                <div style={{ width: '24px', height: '24px' }}><SelectedWeatherIcon /></div>
                            </div>
                        </DropdownHeader>
                        {isWeatherOpen && (
                            <DropdownList>
                                {Object.keys(WeatherIcons).map(key => {
                                    const Icon = WeatherIcons[key];
                                    return (
                                        <DropdownItem key={key} onClick={() => {
                                            setEntry({ ...entry, weather: key });
                                            setIsWeatherOpen(false);
                                        }}>
                                            <div style={{ width: '32px', height: '32px' }}><Icon /></div>
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownList>
                        )}
                    </DropdownContainer>

                    {/* Mood Dropdown */}
                    <DropdownContainer ref={moodRef}>
                        <DropdownHeader onClick={toggleMood}>
                            <div className="value">
                                <span style={{ marginRight: '8px', color: '#555' }}>{selectedMoodObj.label}</span>
                                <div style={{ width: '24px', height: '24px' }}>{selectedMoodObj.component()}</div>
                            </div>
                        </DropdownHeader>
                        {isMoodOpen && (
                            <DropdownList>
                                {MoodIcons.map(m => (
                                    <DropdownItem key={m.id} onClick={() => {
                                        setEntry({ ...entry, mood: m.id });
                                        setIsMoodOpen(false);
                                    }}>
                                        <div style={{ width: '32px', height: '32px' }}>{m.component()}</div>
                                        <span>{m.label}</span>
                                    </DropdownItem>
                                ))}
                            </DropdownList>
                        )}
                    </DropdownContainer>
                </DropdownRow>

                {/* Main Content Box */}
                <ContentBox>
                    <StyledTextArea
                        placeholder="오늘 하루는 어땠나요?"
                        value={entry.content}
                        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
                    />
                </ContentBox>

                {/* Photo Section */}
                <PhotoSection>
                    <PhotoHeader>
                        <span>오늘의 사진 ({entry.images.length}/5)</span>
                        {entry.images.length < 5 && (
                            <UploadBtn onClick={() => document.getElementById('file-upload').click()}>
                                + 사진 추가
                            </UploadBtn>
                        )}
                    </PhotoHeader>

                    <PhotoGrid>
                        {entry.images.map((img, idx) => (
                            <ThumbWrapper key={idx}>
                                <img src={img} alt={`uploaded-${idx}`} />
                                <DeleteOverlay onClick={() => handleDeleteImage(idx)}>
                                    ✖
                                </DeleteOverlay>
                            </ThumbWrapper>
                        ))}
                    </PhotoGrid>

                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </PhotoSection>

                <SaveBtnWrapper>
                    <SaveBtn onClick={handleSave}>저장하기</SaveBtn>
                </SaveBtnWrapper>
            </Container>
        </Wrapper>
    );
};

// --- Styled Components ---

const Wrapper = styled.div`
    background-color: white;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    font-family: 'Gaegu', cursive;
`;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const TopNav = styled.div`
    cursor: pointer;
    font-size: 1.1rem;
    color: #888;
    &:hover { color: #333; }
`;

const DateHeader = styled.div`
    .date-str {
        font-size: 1.2rem; 
        color: #999;
        font-weight: 500;
        display: block; 
        margin-bottom: 5px; 
    }
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        margin: 0;
    }
`;

const Section = styled.div``;

const StyledInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    font-size: 1.5rem;
    font-family: 'Gaegu', cursive;
    outline: none;
    transition: border-color 0.2s;
    &:focus { border-bottom: 1px solid #333; }
`;

const DropdownRow = styled.div`
    display: flex;
    gap: 40px;
    width: 100%;
`;

const DropdownContainer = styled.div`
    position: relative;
    flex: 1;
`;

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid #ccc; removed */
    padding: 10px 0;
    cursor: pointer;
    
    .label { color: #888; font-size: 1rem; }
    .value { display: flex; align-items: center; font-weight: 500; font-size: 1.2rem; }
`;

const DropdownList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 320px; /* Wider to fit 4 items comfortably */
    background: white;
    border: 1px solid #eee;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-radius: 12px;
    z-index: 100;
    padding: 15px;
    margin-top: 10px;
    
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const DropdownItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
    
    &:hover { background: #f5f5f5; }
    
    span {
        margin-top: 8px;
        font-size: 1rem;
        color: #555;
        text-align: center;
    }
`;

const ContentBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    min-height: 400px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 360px;
    border: none;
    resize: none;
    outline: none;
    font-size: 1.3rem;
    line-height: 1.6;
    font-family: 'Gaegu', cursive;
`;

const PhotoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const PhotoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    color: #555;
`;

const PhotoGrid = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
`;

const ThumbWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #eee;
    }
`;

const DeleteOverlay = styled.button`
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UploadBtn = styled.button`
    padding: 6px 12px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    color: #666;
    font-family: 'Gaegu', cursive;
    font-size: 1rem;
    &:hover { background: #f5f5f5; }
`;

const DeleteBtn = styled.button`
    display: none; /* Deprecated in favor of DeleteOverlay */
`;

const SaveBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 50px;
`;

const SaveBtn = styled.button`
    background: #333;
    color: white;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-family: 'Gaegu', cursive;
    &:hover { background: #555; }
`;

export default DiaryWrite;
