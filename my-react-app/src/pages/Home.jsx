import React from "react";
import Navbar from "../components/Navbar"
import Slider from "../components/Slider";
import Announcement from "../components/Annoucements";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div>
    
      <Announcement></Announcement>
      <Navbar/>
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Newsletter></Newsletter>
      <Footer></Footer>
  </div>
  )
  
};

export default Home;
