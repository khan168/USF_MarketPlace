import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import upload from "../utilities/Upload";

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

const Wrapper = styled.div`
  padding-top: 20px;
  padding: 20px;
  width: 90%;  // relative to its parent
  max-width: 400px;  // won't grow wider than 400px
  background-color: white;
  border-radius: 5%;
  border: 1px solid black;
  box-sizing: border-box;  // includes padding and border in the element's total width and height
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
  width: 100%;  // take the full width of the parent container
  box-sizing: border-box;  // includes padding and border in the element's total width and height
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
  width: 100%;  // take the full width of the parent container
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
    password: '',
    number: ''
  });
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(null)
 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const dataToSubmit = {
      ...formData,
      profileImage: link
    };
    console.log(dataToSubmit)
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}api/user/register`, dataToSubmit);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("_id", response.data._id)
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Use file directly from event target
    // setFile(file); // Set the state
    setLoading(true); // begin loading
  
    const url = await upload(file); // Use the local file variable here
    if (url) {
      setLink(url); // add the new link to the array
    }
  
    setLoading(false); // finish loading
    console.log(url)
  }
  return (
    <>
      <Navbar props={user}></Navbar>
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Title>Create your account</Title>
            <Input
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            ></Input>
            <Input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            ></Input>
            <Input
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            ></Input>
            <Input
              name="number"
              placeholder="Number"
              onChange={handleInputChange}
            ></Input>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            ></Input>
            <Input type="password" placeholder="Confirm Password"></Input>
            <div style={{marginTop:"10px"}}>
              <div style={{ width: "110px", flex: 1 , marginTop:"10px", marginBottom:"5px"}}>
              <label >Profile Picture:</label>
              </div>
              <input
                name="Profile pic upload"
                type="file"
                onChange={handleFileChange}
                style={{ flex: "1" ,marginLeft:"0px"}}
              ></input>
            </div>
            {loading ? <div>Loading...</div> : null}
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
