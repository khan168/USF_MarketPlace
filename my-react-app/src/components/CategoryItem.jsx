import React from "react";
import { styled } from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.h1`
    color: gold;
    font-weight: bold;
`;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const Button = styled.button`
  border: 1px solid black;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container key={item.id}>
      <Image src={item.src}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Button>View</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
