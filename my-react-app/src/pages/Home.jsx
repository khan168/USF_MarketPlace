import React from "react";
import Navbar from "../components/Navbar"
import Slider from "../components/Slider";
import Announcement from "../components/Annoucements";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { styled } from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  /* background-color: #b98c12; */
  margin: auto;
  overflow: hidden;
  background-image: url("ezgif-2-b778203b7e.jpg");
  background-size: contain;
`;

const Home = () => {
  return (
    <div>
    
      <Announcement></Announcement>
      <Navbar/>
      <br />
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Newsletter></Newsletter>
      <Footer></Footer>
  </div>
  )
  
};

export default Home;
