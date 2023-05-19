import React from 'react'
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';

const  SimpleBadge=()=> {
  return (
    <Badge badgeContent={4} color="primary">
      <FavoriteIcon color="action" />
    </Badge>
  );
}


const Navbar = () => {
  const Container = styled.div`
    height:60px;
    background-color: white;
  `
  const Wrapper=styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    `

   const Left = styled.div`
    display:flex;
    flex: 1;
    align-items: center;
   `;

   const Center = styled.div`
     flex: 1;
   `;

   const Right = styled.div`
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: flex-end;
   `;

   const Language = styled.span`
     font-size: 14px;
     cursor: pointer;
   `;

   const SearchContainer = styled.div`
    display: flex;
    border:1px solid lightgrey;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
   `;

   const Input = styled.input`
    border: none;
   `

   const Logo=styled.h1`
    font-weight: bold;
    text-align: center;
   `

   const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
   `

    return (
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input></Input>
              <SearchIcon></SearchIcon>
            </SearchContainer>
          </Left>
          <Center>
            <Logo>Bulls Buy</Logo>
          </Center>
          <Right>
            <MenuItem>
              <SimpleBadge></SimpleBadge>
            </MenuItem>
            <MenuItem>
              <Link to="/register" style={{ textDecoration: "none" }}>
                REGISTER
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/login" style={{ textDecoration: "none"}} >
                LOGIN
              </Link>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    );
}

export default Navbar