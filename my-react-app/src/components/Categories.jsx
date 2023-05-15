import React from "react";
import CategoryItem from "./CategoryItem";
import { styled } from "styled-components";


const data = [
  {
    id: 1,
    title: "School Items",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAXu6FSgSmMcs3-ywYnpsu8B0C6l__dp5RdQ&usqp=CAU",
  },
  {
    id: 2,
    title: "Furniture",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCr43c66hm97u954ZoReFA6xqaeMKlR3XPg&usqp=CAU",
  },
  {
    id: 3,
    title: "Clothing",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqKIiHPsaEoEVBMIUX8H-icF2Eu7aRC6WIWw&usqp=CAU",
  },
];

const Container = styled.div`
    
    justify-content: space-between;
    display: flex;
    padding: 20px;
    border: 1px solid black;
`;

const Categories = () => {
  return (
    <>
      <h1 >Categories</h1>
      <Container>
        {data.map((e) => {
          return <CategoryItem item={e} key={e.id}></CategoryItem>;
        })}
      </Container>
    </>
  );
};

export default Categories;
