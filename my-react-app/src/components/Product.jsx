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
  flex:1;
  width:100%;
  margin-top:30px;
  margin-bottom:15px;
`;

const Container = styled.div`
  border-radius: 10%;
  padding: 20px;
  /* flex: 1; */
  margin: 5px;
  height: 250px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: rgb(237, 235, 209);
  position: relative;
  /* display: flex; */

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Title = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  text-align: left;
`;

const Cost = styled.h3`
  /* margin-bottom:5px ; */
  padding-top: 10px;
`;

const TitleAndCostWrapper = styled.div`
  /* display: flex; */
  justify-content: space-between; // add this if you want them to be on opposite ends
`;



const Product = ({ item }) => {
  const Navigate = useNavigate();
  const HandleClick = ()=>{
    Navigate(`/product/${item._id}`)
  }
  return (
    <Container>
      <TitleAndCostWrapper>
        <Title>{item.title} </Title>
        <Cost>${item.price}</Cost>  
      </TitleAndCostWrapper>
      <Image src={item.images[0]} />
      <Info className="info">
        <Icon onClick={HandleClick}>
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