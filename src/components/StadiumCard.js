import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 250px;
  background-color: white;
  padding: 15px;
  margin: 15px;
  cursor: pointer;
  text-align: center;
  color: #333; /* Force dark text on white background */
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const StadiumCard = ({ stadium }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stadium/${stadium.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={stadium.image} alt={stadium.name} />
      <h3 style={{ margin: "10px 0 5px", fontSize: "1.2rem" }}>{stadium.name}</h3>
      <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>{stadium.team}</p>
    </Card>
  );
};

export default StadiumCard;
