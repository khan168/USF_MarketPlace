import styled from 'styled-components'
import React from 'react'
import Product from "./Product";

const pop_data = [
  {
    id: 1,
    title: "Scooter",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAXu6FSgSmMcs3-ywYnpsu8B0C6l__dp5RdQ&usqp=CAU",
  },
  {
    id: 2,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 3,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 4,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 5,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 6,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 7,
    title: "Room Fan",
    src: "./images.jpeg",
  },
  {
    id: 8,
    title: "Room Fan",
    src: "./images.jpeg",
  },
  {
    id: 9,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 10,
    title: "Room Fan",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsG_MjOoougsnONH9fAkgpVcMmP3Uc31uEA&usqp=CAU",
  },
  {
    id: 11,
    title: "Room Fan",
    src: "./images.jpeg",
  },
  {
    id: 12,
    title: "Room Fan",
    src: "./images.jpeg",
  },
];




const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  return (
    <Container>
      {pop_data.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;