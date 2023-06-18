import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';



const Container = styled.div`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  background-color: rgb( 0, 103, 71);
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.h1`
  margin-bottom: 30px;
  color: rgb(207, 196, 147);

`;


//this page verifies user email exits and makes api call to send link to their email if user exists
const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}api/user/resetpass`,    
        { email }
      );
      setResult(res.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        console.error(`Error: ${error.response.data.message}`);
      } else {
        alert(error.message);
        console.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    
    <Container>
       <Result>{result}</Result>
      <Form onSubmit={handleSubmit}>
        <h1>Enter Your Email</h1>
        <Input
          type='email'
          placeholder='johndoe@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type='submit'>Submit</Button>
      </Form>
     
    </Container>
  );
};

export default ForgotPass;
