import GitHubIcon from "@mui/icons-material/GitHub";

import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: flex;
  /* flex-direction: column; */
  background-color: rgb(0, 103, 71);
  color: white;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 30px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`

const Center = styled.div`
  height: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    height: 30vh;
    
  }
`;

const GitIcon = styled.h3`
  margin-left: 5px;
  margin-top: 3px;
`;

const List = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  margin-left: 18vw;
`;



const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>USF Bulls Buy</Logo>
        <Desc>
          "Welcome to the University Marketplace, your go-to campus hub. Brought
          to life by three Computer Science students, this site encapsulates our
          passion for enhancing student life through technology. Each feature
          was crafted with love and keen understanding of university life. Our
          goal? To simplify your campus journey. Enjoy browsing!
        </Desc>
      </Left>
      <Center>
        <List>
          <GitHubIcon></GitHubIcon>
          <GitIcon>
            <a href="https://github.com/khan168/USF_MarketPlace" target="blank" style={{textDecoration:"none", color:"white"}}>Github</a>
          </GitIcon>
        </List>
      </Center>
    </Container>
  );
};

export default Footer;
