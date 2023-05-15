import React from 'react'
import { styled } from 'styled-components'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



const sliderItems = [
  {
    id: 2,
    img: "https://cdn.thewirecutter.com/wp-content/media/2022/09/backpacks-2048px-2x1-0006.jpg?auto=webp&quality=75&crop=2:1&width=1024",
    price: "10$",
  },
  {
    id: 1,
    img: "https://cdn4.vectorstock.com/i/1000x1000/12/03/back-to-school-pencil-college-vector-8311203.jpg",
    price: "10$",
  },

  { id: 3, img: "images.jpeg", price: "10$" },
  { id: 4, img: "images.jpeg", price: "10$" },
];

const Arrow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background-color: white;
    left: ${props=>props.direction==="left" && "10px"};
    right: ${props=>props.direction==="right" && "10px"};
    margin: auto;
    top: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 2;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;
    display: flex;
    /* background-color: #b98c12; */
    margin:auto;
    overflow: hidden;
    background-image: url("ezgif-2-b778203b7e.jpg");
    background-size:contain;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  /* justify-content:space-between; */
  /* overflow: hidden; */
`;


const Slide = styled.div`
  width: 100vw;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;


// const InfoContainer = styled.div`
//   /* height: 100%; */
//   padding: 0;
// `;

const Image = styled.img`
  width: 100%;
  height: 100%;
  transform: scale(0.8);
  /* object-fit: cover; */
`;


const Slider = () => {
    const [slideIndex, setSlideIndex] = React.useState(0);
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 1 ? slideIndex + 1 : 0);
      }
      console.log(slideIndex);
    };
  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <ImageContainer>
                <Image src={item.img} />
              </ImageContainer>
              {/* <InfoContainer>
                {item.price}
              </InfoContainer> */}
            </Slide>
          ))}
        </Wrapper>
        <Arrow
          direction="right"
          onClick={() => {
            handleClick("right");
          }}
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Arrow>
      </Container>
    </div>
  );
}

export default Slider