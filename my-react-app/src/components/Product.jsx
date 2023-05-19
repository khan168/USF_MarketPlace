import React from 'react'
import styled  from 'styled-components';
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from 'react-router-dom';


const Info = styled.div`
  border-radius: 10%;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Image = styled.img`
  height: 65%;
  z-index: 2;
  width:100%;
  margin-top:30px
`;

const Container = styled.div`
  border-radius: 10%;
  padding: 20px;
  flex: 1;
  margin: 5px;
  height: 300px;
  min-width: 200px;
  /* display: flex; */
  background-color: #f5fbfd;
  position: relative;
  /* display: flex; */

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Title = styled.h3`
/* margin-bottom:5px ; */
  padding:10px;
`

const Cost = styled.h3`
  /* margin-bottom:5px ; */
  padding: 10px;
`;





const Product = ({ item }) => {
  const Navigate = useNavigate();
  const HandleClick = ()=>{
    Navigate(`/product/${item.id}`)
  }
  return (
    <Container>
      <Title>{item.title}</Title>
      <Image src={item.src} />
      <Info className="info">
        <Icon onClick={HandleClick}>
          <SearchIcon />
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
      <Cost>$30</Cost>
    </Container>
  );
};

export default Product;