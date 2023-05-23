import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Announcement from "../components/Annoucements";
import Products from "../components/Products";
import Footer from "../components/Footer";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import SpeakerIcon from "@mui/icons-material/Speaker";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
  width: 20%;
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
  // const user = localStorage.getItem("token");
  const SERVER = "http://localhost:5001/";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
      const fetchdata = async () => {
        setLoading(true);
        await axios
          .get(`${SERVER}api/items/getAllItems`, {
            // headers: {
            //   Authorization: `Bearer ${user}`,
            // },
          })
          .then((response) => {
            setLoading(false)
            setList(response.data)})
          .catch((error) => setError(error.message));
      };
    
    fetchdata();
  }, []);


  const HandleClickClothes = async (e) => {
    console.log("clothing");
    
  };

  const HandleClickFur = async (e) => {
    console.log("furniture")
  };

  const HandleClickE = async (e) => {
    console.log("electronics");
  };


  const HandleClickMis = async (e) => {
    console.log("misc");
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
              value="Clothing"
            ></CheckroomIcon>
            <ChairIcon
              fontSize="large"
              category="Furniture"
              onClick={HandleClickFur}
              value="Furniture"
            ></ChairIcon>
            <SpeakerIcon
              fontSize="large"
              category="Electronics"
              onClick={HandleClickE}
            ></SpeakerIcon>
            <MoreHorizIcon
              fontSize="large"
              category="Miscellaneous"
              onClick={HandleClickMis}
            ></MoreHorizIcon>
          </IconsPanel>
        </Left>
        <Right>
          {error ? error : loading ? "Loading..." :<Products list={list}></Products>}
        </Right>
      </Wrapper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
