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
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  /* margin-top: 50px; */
  height: calc(100vh - 50px);
`;

const Left = styled.div`
  padding: 20px;
  width: 10%;
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

const Filter = styled.div`
display: flex;
flex-direction:column;
justify-content: space-evenly;
`

const Home = () => {
  // const user = localStorage.getItem("token");
  const SERVER = "http://localhost:5001/";

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [cat,setCat]=useState("");

  const [searchTerm,setSearchterm] = useState(""); //for search bar

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);

      await axios
        .get(
          `${SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}`
        )
        .then((response) => {
          setList(response.data);
          setLoading(false);
        })
        .catch((error) => setError(error.message));
    };

    fetchdata();
  }, [cat]);

  const HandleClickClothes = () => {
    minRef.current.value=null;
    maxRef.current.value=null;
    setCat("Clothing")
  };

  const HandleClickFur = () => {
    setCat("Furniture");
  };

  const HandleClickE = () => {
    setCat("Electronics");
  };

  const HandleClickMis = () => {
    setCat("Miscellaneous"); //could be spelt wrong

  };


  const HandleFilter = async()=>{
     setLoading(true);
     setCat("")
     await axios
       .get(
         `${SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}`
       )
       .then((response) => {
         setList(response.data);
         setLoading(false);
       });
  }

  const filteredList = list.filter((ele) =>
    ele.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Announcement></Announcement>
      <Navbar term={searchTerm} setTerm={setSearchterm} />
      <Wrapper>
        <Left>
          <Filter>
            <span>Amount</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={HandleFilter}>Apply</button>
          </Filter>
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
          {error ? (
            error
          ) : loading ? (
            "Loading..."
          ) : (
            <Products list={filteredList}></Products>
          )}
        </Right>
      </Wrapper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
