import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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

const Wrapper = styled.div`
  padding-top: 20px;
  padding: 20px;
  width: 25%;
  background-color: white;
  border-radius: 5%;
  border: 1px solid black;
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
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 14px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const Navigate = useNavigate();
  const user = false;
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/user/register', formData);
      console.log(response.data);
      localStorage.setItem("token",response.data.token);
      Navigate(`/`);
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
        console.error(`Error: ${error.response.data.message}`);
      } else {
        alert(error.message)
        console.error(`Error: ${error.message}`);
      }
    }
  };


  return (
    <>
    
      <Navbar props={user}></Navbar>
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Title>Create your account</Title>
            <Input name="name" placeholder="Name" onChange={handleInputChange}></Input>
            <Input name="email" placeholder="Email" onChange={handleInputChange}></Input>
            <Input name="username" placeholder="Username" onChange={handleInputChange}></Input>
            <Input name="password" type="password" placeholder="Password" onChange={handleInputChange}></Input>
            <Input type="password" placeholder="Confirm Password"></Input>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button type="submit">CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
