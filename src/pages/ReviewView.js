import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ReviewView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stadiumId, stadiumName } = location.state || {};

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Mock Data
    const dummyReviews = [
      {
        id: 1,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 4.5,
        text: '야구장 분위기가 정말 좋았어요! 특히 응원석 열기가 대단합니다.',
        imageUrl: null,
        date: '2024-03-23'
      },
      {
        id: 2,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 5.0,
        text: '화장실도 깔끔하고 접근성도 좋아요! 경기장 뷰도 훌륭합니다.',
        imageUrl: 'https://via.placeholder.com/300',
        date: '2024-03-24'
      },
    ];

    // Filter by stadiumId
    if (stadiumId) {
      const filtered = dummyReviews.filter((r) => r.stadiumId === stadiumId);
      setReviews(filtered);
    } else {
      setReviews(dummyReviews);
    }
  }, [stadiumId]);

  return (
    <Wrapper>
      <Container>
        {/* Header Section */}
        <TopNav onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </TopNav>

        <Header>
          <h1>{stadiumName || stadiumId} 리뷰</h1>
          <SubHeader>다른 팬들의 직관 후기를 확인하세요.</SubHeader>
        </Header>

        <ReviewList>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <CardHeader>
                <Rating>
                  <span className="star">★</span> {review.rating.toFixed(1)}
                </Rating>
                <DateStr>{review.date}</DateStr>
              </CardHeader>

              <Content>
                {review.text}
              </Content>

              {review.imageUrl && (
                <ReviewImage>
                  <img src={review.imageUrl} alt="Review" />
                </ReviewImage>
              )}
            </ReviewCard>
          ))}

          {reviews.length === 0 && (
            <EmptyMsg>아직 등록된 리뷰가 없습니다.</EmptyMsg>
          )}
        </ReviewList>

        <WriteFloatBtn onClick={() => navigate('/review/write', { state: { stadiumId, stadiumName } })}>
          ✎ 리뷰 쓰기
        </WriteFloatBtn>
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
    padding-bottom: 100px;
    position: relative;
`;

const TopNav = styled.div`
    cursor: pointer;
    font-size: 1.1rem;
    color: #888;
    &:hover { color: #333; }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 20px;
    
    h1 {
        font-size: 2.2rem;
        font-weight: 700;
        color: #333;
        margin: 0;
    }
`;

const SubHeader = styled.p`
    font-size: 1.1rem;
    color: #888;
    margin-top: 5px;
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ReviewCard = styled.div`
    background: white;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.08);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const Rating = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    gap: 5px;

    .star {
        color: #FFC107;
        font-size: 1.5rem;
    }
`;

const DateStr = styled.div`
    font-size: 0.9rem;
    color: #999;
`;

const Content = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #444;
    white-space: pre-wrap;
    margin-bottom: 15px;
`;

const ReviewImage = styled.div`
    width: 100%;
    max-height: 400px;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 15px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const EmptyMsg = styled.div`
    text-align: center;
    padding: 50px;
    color: #999;
    font-size: 1.2rem;
`;

const WriteFloatBtn = styled.button`
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: #333;
    color: white;
    width: auto;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    font-family: 'Inter', sans-serif; /* Changed Font */
    z-index: 100;
    transition: all 0.3s;

    &:hover {
        background: #555;
        transform: scale(1.05);
    }

    @media (max-width: 800px) {
        right: 20px;
        bottom: 20px;
    }
`;

export default ReviewView;
