import React, { useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate,Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
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
  width: 90%; // relative to its parent
  max-width: 430px; // won't grow wider than 414px
  background-color: white;
  border-radius: 5%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  box-sizing: border-box; // includes padding and border in the element's total width and height
`;

const Right = styled.div`
  padding-top: 20px;
  padding: 20px;
  width: 90%; // relative to its parent
  max-width: 440px; // won't grow wider than 400px
  box-sizing: border-box; // includes padding and border in the element's total width and height
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 25px;
  margin-bottom: 5px;
`;
const Input = styled.input`
  padding: 10px;
  margin: 12px 20px 10px 0;
  width: 100%; // take the full width of the parent container
  box-sizing: border-box; // includes padding and border in the element's total width and height
`;

const Form = styled.form`
  /* display: flex; */
  padding: 20px;
  padding-top: 5px;
  /* flex-wrap: wrap; */
`;

const Button = styled.button`
  width: 100%; // take the full width of the parent container
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  display: block;
`;
const Loginbutton = styled.button`
  width: 100%; // take the full width of the parent container
  padding: 15px 25px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  box-sizing: border-box; // includes padding and border in the element's total width and height
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;





const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await axios.post('http://localhost:5001/api/user/login', formData);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("_id", response.data._id)

      navigate(`/`);
      
    }catch (error) {
      if (error.response) {
        alert(error.response.data.message)
        console.error(`Error: ${error.response.data.message}`);
      } else {
        alert(error.message)
        console.error(`Error: ${error.message}`);
      }
    }
  };
  


<<<<<<< HEAD
  const google = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  const github = () => {
    window.open("http://localhost:4000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:4000/auth/facebook", "_self");
  };
=======
>>>>>>> 9b59fa4c9e6fabb335d93bef49aa750a1b74d75d

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Left>
          <Form onSubmit={handleSubmit} style={{ flex: 5 }}>
            <Title>Sign In</Title>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" style={{ marginBottom: "15px" }}>
              Sign In
            </Button>
            <Link to="/forgot-password" style={{ textDecoration:"none", color:"dark-green" }}>
              Forgot password?
            </Link>
          </Form>

          <p style={{ flex: 1 }}>OR</p>
          <Right style={{ flex: 2 }}>
<<<<<<< HEAD
            <Loginbutton onClick={google} color={"#df4930"}>
=======
            <Loginbutton color={"#df4930"}>
>>>>>>> 9b59fa4c9e6fabb335d93bef49aa750a1b74d75d
              <Icon src="./google.png"></Icon>
              Google
            </Loginbutton>
            <img alt="" className="icon" />
            <Loginbutton color={"#507cc0"}>
              <Icon src="./facebook.png"></Icon>
              facebook
            </Loginbutton>
            <img alt="" className="icon" />
            <Loginbutton color={"black"}>
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
