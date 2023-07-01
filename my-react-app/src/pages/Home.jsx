import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Products from "../components/Products";
import Footer from "../components/Footer";
import ReactLoading from "react-loading";
import { useState } from "react";
import Leftbar from "../components/Leftbar";

const Wrapper = styled.div`
  position: static;
  font-family: "Playfair", serif;
  justify-content: center;
`;



const Right = styled.div`
  flex-grow: 2; /* Allow the scrollable content to grow and fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: white;
  margin-left: 150px;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    margin-left: 100px;
  }
`;



//for spinner
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;



const Home = () => {
  // const user = localStorage.getItem("token");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);
  // const [sort,setSort] = useState("");
  // const [cat,setCat]=useState("");

  const [searchTerm,setSearchterm] = useState(""); //for search bar



  


  const filteredList = list?.filter((ele) =>
    ele.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );


  return (
    <div>
      
      <Navbar term={searchTerm} setTerm={setSearchterm} />
      <Wrapper>
        <Leftbar setError={setError} setList={setList} setLoading={setLoading}></Leftbar>
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
      </Wrapper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
