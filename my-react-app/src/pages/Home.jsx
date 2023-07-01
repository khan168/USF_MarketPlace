import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Products from "../components/Products";
import Footer from "../components/Footer";
import ReactLoading from "react-loading";
import { useState } from "react";
import Leftbar from "../components/Leftbar";

const Wrapper = styled.div`
  display: flex;
  /* margin-top: 50px; */
  height: calc(100vh - 50px);
  font-family: "Playfair", serif;
  justify-content: center;
`;

const Right = styled.div`
  flex-grow: 2; /* Allow the scrollable content to grow and fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: white;
`;

//for spinner
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Footerpusher = styled.div`
  width: 10vw;
  @media (max-width: 767px) {
    width: 12vw;
  }
`;

const Home = () => {
  // const user = localStorage.getItem("token");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchterm] = useState(""); //for search bar

  const filteredList = list?.filter((ele) =>
    ele.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div>
      <Navbar term={searchTerm} setTerm={setSearchterm} />
      <div style={{display:"flex"}}>
        <Leftbar
          setError={setError}
          setList={setList}
          setLoading={setLoading}
        ></Leftbar>
        <Right>
          {error ? (
            error
          ) : loading ? (
            <LoadingWrapper>
              <ReactLoading
                type={"spin"}
                color={"blue"}
                height={100}
                width={100}
              />
            </LoadingWrapper>
          ) : (
            <Products list={filteredList}></Products>
          )}
        </Right>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
