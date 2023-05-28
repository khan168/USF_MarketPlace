import React, { useState } from 'react'
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import axios from "axios"
import { Button } from '@mui/material';
import Popup from './Popup';
//const jwt = require('jsonwebtoken');

const Container = styled.div`
  height: 60px;
  background-color: rgb(0, 103, 71);
  color: white;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  order: 1;
  @media (max-width: 768px) {
    order: 2;
    margin-top: 10px;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  order: 2;
  @media (max-width: 768px) {
    order: 1;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  order: 3;
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 10px;
  }
`;



const SearchContainer = styled.div`
  display: flex;
  /* border: 1px solid lightgrey; */
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  padding: 5px;
  margin-right: 5px;
  font-weight: bold;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;





const Navbar = ({term,setTerm}) => {
   const location = useLocation();
   const { pathname } = location;

   const Navigate = useNavigate();
   const HandleClick = ()=>{
    Navigate("/")
   }

   

   const [isTokenValid, setIsTokenValid] = useState(false);
   const [openPopup, setOpenPopup] = useState(false);
   const [curr_user, setcurr_user] = useState("");   //use for display picture
   const SERVER = "http://localhost:5001/";
   const [like, setLikes] = useState(0)

   const _id = localStorage.getItem("_id")

  

   useEffect(()=>{
    const token = localStorage.getItem('token')

    if  (token){
      setIsTokenValid(true);
      const fetchuser = async () => {
        await axios
          .get(`${SERVER}api/user/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => setcurr_user(response.data))
          .catch((error) => console.log(error));
      };

      fetchuser();
      
    }else{
      setIsTokenValid(false)
    }

   },[])



   const  SimpleBadge=()=> {
    const navigate = useNavigate();
    return (
      <Badge badgeContent={like} color="primary" onClick={() => navigate('/favorites')}>
        <FavoriteIcon color="action" />
      </Badge>
    );
  }


  useEffect(() => {
    const fetchLikes = async () => {
        const response = await axios.get(`${SERVER}api/likes/user/${_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setLikes(response.data.length);
    }

    if (isTokenValid) {
        fetchLikes();
    } 
  }, [_id,isTokenValid]);

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

    const handleSearch = (event) => {
      const searchTerm = event.target.value;
      setTerm(searchTerm);

      // Perform search logic here and update searchResults state accordingly
      
    };


  return (
    <Container>
      <Wrapper>
        <Left>
          {pathname === "/" && (
            <SearchContainer>
              <Input value={term} onChange={handleSearch} />
              <SearchIcon />
            </SearchContainer>
          )}
        </Left>
        <Center>
          <Logo onClick={HandleClick}>Bulls Buy</Logo>
        </Center>
        <Right>
          {isTokenValid ? (
            <>
              <MenuItem>
                <SimpleBadge />
              </MenuItem>
              <MenuItem>
                <Button
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                >
                  CREATE POST
                </Button>
                {openPopup && <Popup setOpenPopup={setOpenPopup} />}
              </MenuItem>
              <MenuItem>
                <Link to="/profile" style={{ color: "white" }}>
                  PROFILE
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  onClick={HandleLogout}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  LOGOUT
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={{
                    pathname: "/chats",
                    // search: `?param1=${curr_user.id}`,
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  CHATS
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
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