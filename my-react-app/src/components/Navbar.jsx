import React, { useState } from 'react'
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 
import axios from "axios"
import { Button } from '@mui/material';

//const jwt = require('jsonwebtoken');


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

   const Logo = styled.h1`
     font-weight: bold;
     text-align: center;
     cursor: pointer;
   `;

   const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
   `
   const Navigate = useNavigate();
   const HandleClick = ()=>{
    Navigate("/")
   }

   const [isTokenValid, setIsTokenValid] = useState(false);

   useEffect(()=>{
    const token = localStorage.getItem('token')

    if  (token){
      setIsTokenValid(true)
    }else{
      setIsTokenValid(false)
    }

    console.log(
      isTokenValid
    );

   },[])
   /*

   THIS CODE SHOULD BE IN THE CLIENT SIDE

   */

  

  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // get the token from local storage

  //   try {
  //     const payload = jwt.decode(token); // decode the token to get the payload
  //     const currentTime = Date.now() / 1000; // get the current time in seconds

  //     if (payload.exp < currentTime) {
  //       // token is expired
  //       setIsTokenValid(false);
  //     } else {
  //       // token is not expired
  //       setIsTokenValid(true);
  //     }
  //   } catch (e) {
  //     setIsTokenValid(false);
  //   }
  // }, []);

   const HandleLogout= async (e) => {
     localStorage.removeItem("token");
     Navigate(`/login`);
   };


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={HandleClick}>Bulls Buy</Logo>
        </Center>
        <Right>
          <MenuItem>
            <SimpleBadge />
          </MenuItem>
          {isTokenValid ? (
            <>
              <MenuItem>
                <Button style={{ textDecoration: "none", color: "black" }}>
                  CREATE POST
                </Button>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  PROFILE
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  onClick={HandleLogout}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  LOGOUT
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/chats/123"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  CHATS
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  LOGIN
                </Link>
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};
export default Navbar