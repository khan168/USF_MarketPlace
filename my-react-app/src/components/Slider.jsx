import React, { useEffect } from "react";
import { styled } from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



const Arrow = styled.div`
  background-color: white;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  top: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
`;

const Container = styled.div`
  margin: auto;
  position: relative;
  height: 50vh;
  width: 37vw;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;



const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -37}vw);
`;

const Slide = styled.div`
  /* width: 37vw; */
  height: 100%;
  /* display: flex; */
  align-items: center;
  /* overflow: hidden; */
`;

const ImageContainer = styled.div`
  width: 37vw;
  height: 100%;
  
  /* flex: 1; */
`;



const Image = styled.img`
  width: 100%;
  height: 100%;
  transform: scale(0.9);
  object-fit: cover;
`;

const Slider = ({array}) => {
  

  const [slideIndex, setSlideIndex] = React.useState(0);
  const handleClick = (direction) => {
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
        <Wrapper slideindex={slideIndex}>
          {array?.map((item,index) => (
            <Slide key={index}>
              <ImageContainer>
                <Image src={item} />
              </ImageContainer>
            </Slide>
          ))}
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
