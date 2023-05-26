import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ForgotPass = () => {

  const [email,setEmail]= useState("")
  const [result,setResult]= useState("")

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post('http://localhost:5001/api/user/resetpass', {email});
      setResult(res.data)
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

  return (
    <div style={ {height:'100vh', padding:'20px', display:'flex', justifyContent:'space-evenly',flexDirection:'column', alignItems:'center'}}>
    <form style={{}} onSubmit={HandleSubmit}>
        <h1>Enter your email</h1>
        <input type="text" placeholder='johndoe@gmail.com' onChange={e=>setEmail(e.target.value)}/>
        <button>Submit</button>
    </form>
    <h1>{result}</h1>
    </div>
  )
}

export default ForgotPass