import React from "react";
import CategoryItem from "./CategoryItem";
import { styled } from "styled-components";


const data = [
  {
    id: 1,
    title: "School Items",
    src: "./bbook.jpg",
  },
  {
    id: 2,
    title: "Furniture",
    src: "./dorm.jpg",
  },
  {
    id: 3,
    title: "Clothing",
    src: "tee.jpg",
  },
];

const Container = styled.div`
    
    justify-content: space-between;
    display: flex;
    padding: 20px;
`;

const Categories = () => {
  return (
    <>
      <Container>
        {data.map((e) => {
          return <CategoryItem item={e} key={e.id}></CategoryItem>;
        })}
      </Container>
    </>
  );
};

export default Categories;
