import EmailIcon from "@mui/icons-material/Email";
import styled from "styled-components";
import Announcement from "../components/Annoucements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/NewsLetter";
import Slider from "../components/Slider";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

const Product = () => {
  const [curr_user, setcurr_user] = useState("");
  const token = localStorage.getItem("token");
  const SERVER = "http://localhost:5001/";
  const [item, setItem] = useState("");
  const { id } = useParams();

  useEffect(() => {
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
  }, [token]);


  useEffect(() => {
  const fetchdata = async () => {
    await axios
      .get(`${SERVER}api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setItem(response.data))
      .catch((error) => console.log(error));
  };

    fetchdata();
  }, [id,token]);
  



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
            {token && (
              <Button>
                <Link
                  to={{
                    pathname: "/chats",
                    search: `?param1=${curr_user.id}`,
                  }}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Message Seller <EmailIcon></EmailIcon>
                </Link>
              </Button>
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
