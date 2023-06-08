import EmailIcon from "@mui/icons-material/Email";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';




const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 767px) { 
    padding: 10px;
  }

  @media (min-width: 768px) { 
    flex-direction: row;
  }
`

const ImgContainer = styled.div`
  flex: 1;
  width: 100%;

  @media (min-width: 768px) { 
    width: auto;
  }
`;


const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center; // align items vertically in the center
  justify-content: space-between; // provide space between the title and the favorite icon
  margin-bottom: 20px; // add some margin below the title
  @media (min-width: 768px) { 
    margin-top: 20px;

  }
`;

// Modify the Title styled-component
const Title = styled.h1`
  font-weight: 1000000;
  margin: 0; // remove the default margin
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0px;
`;

const Button = styled.button`
  /* padding: 15px; */
  border: 2px solid teal;
  background-color: lightblue;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f8f4f4;
  }
`;


const SellerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SellerImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SellerName = styled.span`
  font-weight: 500;
  margin-right: 10px;
`;



const DateLabel = styled.span`
font-weight: 400;
color: gray;
margin-bottom: 30px;
display: inline-block;

`;

const Product = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("_id");
  const [item, setItem] = useState("");
  const { id } = useParams();
  const [loading,setloading] = useState(false)
  
  //product user
  const [user, setUser] = useState({});



  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER}}api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setItem(response.data);
         
    
          // Fetch user data after getting the item data
          const userResponse = await axios.get(`${process.env.REACT_APP_SERVER}api/user/getUserbyID/${response.data.user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });;
    
          // Set the user state with the user data
          console.log(userResponse.data.user)
          setUser(userResponse.data.user);
        })
        .catch((error) => console.log(error));
    };

    fetchdata();
  }, [id,token]);
  




  const HandleClick = async ()=>{
    setloading(true)
     //create or find user
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}api/chat/`, {to:item?.user},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      setloading(false)
      navigate(
        `/chats?param1=${
          userid < item?.user ? userid + item?.user : item?.user + userid
        }`
      );
    } catch (err) {
      console.log(err);
    }
    
  }
  // states for the like button 
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likeCheckCompleted, setLikeCheckCompleted] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER}api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setItem(response.data);
          // Fetch user data after getting the item data
          const userResponse = await axios.get(`${process.env.REACT_APP_SERVER}api/user/getUserbyID/${response.data.user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });

          // Set the user state with the user data
          setUser(userResponse.data.user);
          


          // After fetching the item and user data, check for existing likes
          const likesResponse = await axios.get(`${process.env.REACT_APP_SERVER}api/likes/post/${response.data._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userLike = likesResponse.data.find(like => like.user === userid);
          if (userLike) {
            setLiked(true);
            setLikeId(userLike._id);
          }
          setLikeCheckCompleted(true); // Set like check completed to true
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, [id, token, userid]);



  const handleLike = async () => {
    if (!liked) {
      // Create a like
      const response = await axios.post(`${process.env.REACT_APP_SERVER}api/likes`, {
        user: userid,
        post: item._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeId(response.data._id);  // Save the like id for later
    } else {
      // Delete the like
      await axios.delete(`${process.env.REACT_APP_SERVER}api/likes/${likeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeId(null);
    }
    // Toggle the like status
    setLiked(!liked);
  };

  
  return (
    <Container>
      <Navbar />
      
      <Wrapper>
        <ImgContainer>
          <Slider array={item?.images}></Slider>
        </ImgContainer>
        <InfoContainer>
        <TitleContainer>
          <Title>{item.title}</Title>
          {likeCheckCompleted & token ? (
            liked ? (
              <FavoriteIcon onClick={handleLike} style={{ color: "red" ,fontSize: '40px' }} />
            ) : (
              <FavoriteBorderIcon onClick={handleLike} />
            )
          ) : (
            <p></p>
          )}
        </TitleContainer>
          <Price>$ {item.price}</Price>
          <Desc>{item.description}</Desc>
         
          
          <AddContainer>
  {token && loading ? (
    <>Loading...</>
  ) : (
    token && userid!==item.user ? (
      <>
        <SellerInfo>
          <SellerImage src={user.profileImage} alt={user.name} />
          <SellerName>{user.name}</SellerName>

        </SellerInfo>
        <Button
          onClick={HandleClick}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Message Seller <EmailIcon></EmailIcon>
        </Button>
      </>
    ) : token ? "You own this product" : " "
  )}
      
      </AddContainer>
      <DateLabel>Date: {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</DateLabel>
        </InfoContainer>
      </Wrapper>
      
      <Footer />
    </Container>
  );
};

export default Product;