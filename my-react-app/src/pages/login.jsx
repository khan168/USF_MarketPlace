import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("./bulls.png");
  background-size: 10%;
`;

const Left = styled.div`
  padding-top: 20px;
  padding: 20px;
  width: 35%;
  background-color: white;
  border-radius: 5%;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  padding-top: 20px;
  padding: 20px;
  width: 35%;
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 0 10px 10px 0;
`;

const Form = styled.form`
  /* display: flex; */
  padding: 20px;
  /* flex-wrap: wrap; */
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  display: block;
`;

const Loginbutton = styled.button`
  width: 150px;
  padding: 15px 25px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
  /* background-color: ; */
  background-color: ${(props) => props.color};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Login = () => {
  const google = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:4000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:4000/auth/facebook", "_self");
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Left>
          <Form style={{ flex: 2 }}>
            <Title>Sign In</Title>
            <Input placeholder="Email"></Input>
            <Input placeholder="Password"></Input>
            <Button>CREATE</Button>
          </Form>
          <p style={{ flex: 1 }}>OR</p>
          <Right style={{ flex: 2 }}>
            <Loginbutton onClick={"google"} color={"#df4930"}>
              <Icon src="./google.png"></Icon>
              Google
            </Loginbutton>
            <img alt="" className="icon" />
            <Loginbutton onClick={"google"} color={"#507cc0"}>
              <Icon src="./facebook.png"></Icon>
              facebook
            </Loginbutton>
            <img alt="" className="icon" />
            <Loginbutton onClick={"google"} color={"black"}>
              <Icon src="./github.png"></Icon>
              github
            </Loginbutton>
          </Right>
        </Left>
      </Container>
    </>
  );
};

export default Login;