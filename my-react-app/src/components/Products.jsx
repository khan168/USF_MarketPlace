import styled from 'styled-components'
import React from 'react'
import Product from "./Product";





const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 60px;
  min-height: 100vh;
  @media (max-width: 767px) {
    justify-content: center;
    margin-top: 143px;
    margin-right: 3px;
  }
`;

const Products = ({list}) => {
  return (
    <Container>
      {list?.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;