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
  const user = false;
  return (
    <>
      <Navbar props={user}></Navbar>
      <Container>
        <Wrapper>
          <Form>
            <Title>Create your account</Title>
            <Input placeholder="Name"></Input>
            <Input placeholder="Email"></Input>
            <Input placeholder="Username"></Input>
            <Input placeholder="Password"></Input>
            <Input placeholder="Confirm Password"></Input>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
