import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Announcement from "../components/Annoucements";
import Products from "../components/Products";
import Footer from "../components/Footer";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import SpeakerIcon from "@mui/icons-material/Speaker";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  /* margin-top: 50px; */
  height: calc(100vh - 50px);
`;

const Left = styled.div`
  padding: 20px;
  width: 30%;
  background-color: lightgrey;
`;

const IconsPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Right = styled.div`
  flex-grow: 2; /* Allow the scrollable content to grow and fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: grey;
`;
const Home = () => {
  const user = localStorage.getItem("token");
  const SERVER = "http://localhost:5001/";
  const Navigate = useNavigate();

  const [list, setList] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get(`${SERVER}api/items/getAllItems`, {
        // headers: {
        //   Authorization: `Bearer ${user}`,
        // },
      })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error));
  };
  const HandleClickClothes = (e) => {
    Navigate(`/products/clothes`);
  };

  const HandleClickFur = (e) => {
    Navigate(`/products/Furniture`);
  };

  const HandleClickE = (e) => {
    Navigate(`/products/Electronics`);
  };

  return (
    <div>
      <Announcement></Announcement>
      <Navbar />
      <Wrapper>
        <Left>
          <IconsPanel>
            <CheckroomIcon
              fontSize="large"
              category="Clothing"
              onClick={HandleClickClothes}
            ></CheckroomIcon>
            <ChairIcon
              fontSize="large"
              category="Furniture"
              onClick={HandleClickFur}
            ></ChairIcon>
            <SpeakerIcon
              fontSize="large"
              category="Electronics"
              onClick={HandleClickE}
            ></SpeakerIcon>
          </IconsPanel>
        </Left>
        <Right>
          <Products list={list}></Products>
        </Right>
      </Wrapper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
