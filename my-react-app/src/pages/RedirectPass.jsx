import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from 'styled-components';
 const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 103, 71);
    padding: 20px;
`;
 const Title = styled.h2`
    color: #ffffff;
    margin-bottom: 20px;
`;
 const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;
 const Label = styled.label`
    font-size: 1em;
    color: #066763;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
 const Button = styled.button`
    background-color: #066763;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;

    &:hover {
        background-color: #044c4a;
    }
`;
 const Message = styled.p`
    color: rgb(207, 196, 147);
`;
 const ErrorMessage = styled.p`
    color: #f00;
    font-weight: bold;
    margin-top: 20px;
`;


const RedirectPass = () => {
  const params = useParams();
  const SERVER = "http://localhost:5001/";

  // Access the parameters using the keys defined in your route
  const { id, token } = params;

  const [found,setfound]=useState(false)
  const [loading,setloading]=useState(false)
  const [message,setMessage] = useState("")
  const [password,setpass] = useState("")
  
  // Use the parameters as needed

  useEffect(() => {
    const getUserandVerify = async () => {
        setloading(true);
    try {
        const res = await axios.get(`${SERVER}api/user/getUserById/${id}`);
        if (!res.data.user) {
          setfound(false);
        } else {
          const secret = "abc@123" + res.data.user.password;
          await axios
            .post(`${SERVER}api/verify`, {
              secret,
              token,
            })
            .then((res) => {
              console.log(res.data.result);
              res.data.result === "true" ? setfound(true) : setfound(false);
              setloading(false);
            });
        }
    } catch (error) {
        console.log(error);
    }
    };
    getUserandVerify();
   
  }, [id,token]);

  const HandleSubmit = async (e)=>{
    e.preventDefault()
    await axios.put(`${SERVER}api/user/${id}`,{password}).then(res=>setMessage(res.data?.message))

  }

  return (
    <Container>
        { (found && !loading) ?
        <>
            <Title>Set new password</Title>
            <Form onSubmit={HandleSubmit}>
                <Label>New Password</Label>
                <Input type="password" onChange={(e)=>setpass(e.target.value)}/>
                <Label>Confirm Password</Label>
                <Input type="password" onChange={(e)=>setpass(e.target.value)} />
                <Button>Submit</Button>
            </Form>
            <Message>{message}</Message>
        </>
        :
        loading ? <Message>Loading...</Message> : <ErrorMessage>Invalid token</ErrorMessage>
        }
    </Container>
  );
};

export default RedirectPass;
