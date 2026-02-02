import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ReviewWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stadiumId, stadiumName } = location.state || {}; // e.g. '잠실야구장'

  const [rating, setRating] = useState(5.0);
  const [text, setText] = useState('');
  const [images, setImages] = useState([]); // Changed to array

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (images.length >= 5) {
        alert('사진은 최대 5장까지 등록 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // Reset input
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const reviewData = {
      stadiumId,
      stadiumName,
      rating,
      text,
      images,
    };
    console.log('작성된 리뷰:', reviewData);
    // API call logic here...
    alert('리뷰가 등록되었습니다!');
    navigate(-1);
  };

  return (
    <Wrapper>
      <Container>
        {/* Header Section */}
        <TopNav onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </TopNav>

        <Header>
          <h1>{stadiumName || "야구장"} 리뷰 작성</h1>
          <SubHeader>직관 경험을 공유해주세요!</SubHeader>
        </Header>

        {/* Rating Section */}
        <Section>
          <Label>평점</Label>
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                active={star <= rating}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </Star>
            ))}
            <RatingValue>{rating}점</RatingValue>
          </StarRating>
        </Section>

        {/* Content Section */}
        <ContentBox>
          <StyledTextArea
            placeholder="이 구장의 분위기, 먹거리, 시야 등 생생한 후기를 남겨주세요."
            value={text}
            onChange={handleTextChange}
          />
        </ContentBox>

        {/* Photo Section */}
        <PhotoSection>
          <PhotoHeader>
            <span>사진 첨부 ({images.length}/5)</span>
            {images.length < 5 && (
              <UploadBtn onClick={() => document.getElementById('file-upload').click()}>
                + 사진 추가
              </UploadBtn>
            )}
          </PhotoHeader>

          <PhotoGrid>
            {images.map((img, idx) => (
              <ThumbWrapper key={idx}>
                <img src={img} alt={`preview-${idx}`} />
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
          <SaveBtn onClick={handleSubmit}>등록하기</SaveBtn>
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
    font-family: 'Inter', sans-serif; /* Changed Font */
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
    font-size: 1rem;
    color: #888;
    &:hover { color: #333; }
`;

const Header = styled.div`
    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 10px 0;
    }
`;

const SubHeader = styled.p`
    font-size: 1rem;
    color: #888;
    margin: 0;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: #555;
`;

const StarRating = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 2rem;
`;

const Star = styled.span`
    color: ${props => props.active ? "#FFC107" : "#E0E0E0"};
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
        transform: scale(1.1);
    }
`;

const RatingValue = styled.span`
    font-size: 1.2rem;
    color: #666;
    margin-left: 10px;
    font-weight: bold;
`;

const ContentBox = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    min-height: 300px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 260px;
    border: none;
    resize: none;
    outline: none;
    font-size: 1rem;
    line-height: 1.6;
    font-family: 'Inter', sans-serif; /* Changed Font */
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
    font-size: 1rem;
    color: #555;
`;

const UploadBtn = styled.button`
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    color: #666;
    font-family: 'Inter', sans-serif; /* Changed Font */
    font-size: 0.9rem;
    &:hover { background: #f5f5f5; }
`;

const PhotoGrid = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 5px;
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
    background: #ff5252;
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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
    border-radius: 8px; /* Less rounded for non-cute look */
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif; /* Changed Font */
    &:hover { background: #555; }
`;

export default ReviewWrite;
