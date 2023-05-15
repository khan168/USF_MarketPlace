import React from 'react'

import styled  from 'styled-components';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const Info = styled.div`
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
  height: 75%;
  z-index: 2;
  width:100%;
  margin-top:30px
`;

const Container = styled.div`
  padding: 20px;
  flex: 1;
  margin: 5px;
  height: 350px;
  min-width: 280px;
  display: flex;
  background-color: #f5fbfd;
  position: relative;
  display: flex;

  &:hover ${Info} {
    opacity: 1;
  }
`;





const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.src} />
      <Info>
        <Icon>
          <ShoppingCartIcon />
        </Icon>
        <Icon>
          <SearchIcon />
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;