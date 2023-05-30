import React, { useEffect } from "react";
import { styled } from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



const Arrow = styled.div`
  /* background-color: white; */
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;

  /* top: 0;
  bottom: 0; */
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  /* position: absolute; */
`;

const Container = styled.div`
  margin: auto;
  position: relative;
  height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 767px) {
    height: 50vh;
    display: flex;
  }
`;



const Wrapper = styled.div`
  @media (max-width: 767px) {
    width: 70vw;
    height: 470px;
    flex: 14;
  }
  /* display: flex; */
  width: 800px;
  height: 700px;
  overflow: hidden;
  /* gap: 50px; */
  /* transition: all 1.5s ease; */
  /* transform: translateX(${(props) => props.slideindex * -800}px); */
`;

const Slide = styled.div`
  /* width: 37vw; */
  display: flex;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -800}px);
  @media (max-width: 767px) {
    width: 145vw;
    height: 400px;
    transform: translateX(${(props) => props.slideindex * -80}vw);
  }
  /* overflow: hidden; */
`;

const ImageContainer = styled.div`
  @media (max-width: 767px) {
    /* width: 70vw;
    height: 50vh; */
  }
  /* width: 40vw; */
  height: 100%;
  flex: 1;
`;



const Image = styled.img`
  width: 800px;
  height: 100%;
  /* transform: scale(0.9); */
  object-fit: cover;
  @media (max-width: 767px) {
    /* width: 145vw; */

  }
`;

const Slider = ({array}) => {
  

  const [slideIndex, setSlideIndex] = React.useState(0);
  const handleClick = (direction) => {
    // console.log(direction);
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 0);
    } else {
      setSlideIndex(slideIndex <array.length-1 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
      </Arrow>
      <Wrapper>
        <Slide slideindex={slideIndex}>
          {array?.map((item, index) => (
            <ImageContainer key={index}>
              <Image src={item} />
            </ImageContainer>
          ))}
        </Slide>
      </Wrapper>
      <Arrow
        direction="right"
        onClick={() => {
          handleClick("right");
        }}
      >
        <ArrowForwardIosIcon fontSize="large"></ArrowForwardIosIcon>
      </Arrow>
    </Container>
  );
};

export default Slider;
