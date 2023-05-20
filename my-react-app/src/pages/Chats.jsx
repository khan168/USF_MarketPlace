import React from "react";
import Announcement from "../components/Annoucements";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;




const Chats = () => {

  


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Chats</Title>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Chats;
