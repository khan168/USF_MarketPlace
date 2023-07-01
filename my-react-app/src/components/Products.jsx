import styled from 'styled-components'
import React from 'react'
import Product from "./Product";





const Container = styled.div`
  width: 90vw;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 767px) {
    justify-content: center;
    width: 67vw;
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