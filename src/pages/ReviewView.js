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
        rating: 5.0,
        text: '오늘 경기 분위기 미쳤습니다! 끝내기 승리 짜릿해요 ㅠㅠ',
        imageUrl: '/assets/mock/photo_1.jpg',
        date: '2026-01-10'
      },
      {
        id: 2,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 4.5,
        text: '잠실 삼겹살 정식은 필수입니다. 야구 보면서 먹으니까 꿀맛!',
        imageUrl: '/assets/mock/photo_2.jpg',
        date: '2026-01-11'
      },
      {
        id: 3,
        stadiumId: 'changwon',
        stadiumName: '창원NC파크',
        rating: 5.0,
        text: '엔팍 시야는 진짜 국내 최고인 듯... 어디서 봐도 잘 보여요.',
        imageUrl: '/assets/mock/photo_3.jpg',
        date: '2026-01-12'
      },
      {
        id: 4,
        stadiumId: 'changwon',
        stadiumName: '창원NC파크',
        rating: 4.0,
        text: '주차장이 좀 붐비긴 했지만 경기장은 최고였습니다.',
        imageUrl: '/assets/mock/photo_4.jpg',
        date: '2026-01-13'
      },
      {
        id: 5,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 5.0,
        text: '오랜만에 직관왔는데 이겨서 너무 좋아요! 선수들 퇴근길도 봤습니다.',
        imageUrl: '/assets/mock/photo_5.jpg',
        date: '2026-01-14'
      },
      {
        id: 6,
        stadiumId: 'changwon',
        stadiumName: '창원NC파크',
        rating: 5.0,
        text: '공룡좌석 너무 귀여워요 ㅋㅋ 아이들이랑 오기 딱 좋습니다.',
        imageUrl: '/assets/mock/photo_6.jpg',
        date: '2026-01-15'
      },
      {
        id: 7,
        stadiumId: 'incheon',
        stadiumName: '인천SSG랜더스필드',
        rating: 4.5,
        text: '스타벅스 딜리버리 편하고 좋아요. 불꽃놀이도 멋짐!',
        imageUrl: '/assets/mock/photo_7.jpg',
        date: '2026-01-16'
      },
      {
        id: 8,
        stadiumId: 'jamsil',
        stadiumName: '잠실야구장',
        rating: 5.0,
        text: '잠실의 주인은 우리! 가을야구 가자~~',
        imageUrl: '/assets/mock/photo_8.jpg',
        date: '2026-01-17'
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
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
