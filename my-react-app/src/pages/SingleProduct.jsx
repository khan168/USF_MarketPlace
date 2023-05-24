import EmailIcon from "@mui/icons-material/Email";
import styled from "styled-components";
import Announcement from "../components/Annoucements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/NewsLetter";
import Slider from "../components/Slider";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const SellerNumber = styled.span`
  font-weight: 400;
  color: gray;
`;

const Product = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("_id");
  const SERVER = "http://localhost:5001/";
  const [item, setItem] = useState("");
  const { id } = useParams();
  const [loading,setloading] = useState(false)
  
  //product user
  const [user, setUser] = useState({});



  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(`${SERVER}api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setItem(response.data);
    
          // Fetch user data after getting the item data
          const userResponse = await axios.post(`${SERVER}api/user/getUserById`, {
            _id: response.data.user,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          // Set the user state with the user data
          console.log(userResponse.data)
          setUser(userResponse.data);
        })
        .catch((error) => console.log(error));
    };

    fetchdata();
  }, [id,token]);
  




  const HandleClick = async ()=>{
    setloading(true)
     //create or find user
    try {
      await axios.post("/api/chat/", {to:item?.user},{
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

  console.log(item.user)
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Slider sliderItem={item}></Slider>
        </ImgContainer>
        <InfoContainer>
          <Title>{item.title}</Title>
          <Desc>{item.description}</Desc>
          <Price>$ {item.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
  {token && loading ? (
    <>Loading...</>
  ) : (
    token && userid!==item.user ? (
      <>
        <SellerInfo>
          <SellerImage src={user.profileImage} alt={user.name} />
          <SellerName>{user.name}</SellerName>
          <SellerNumber>{user.number}</SellerNumber>
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
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
