import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";




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
      (found && !loading) ?
      <>
        <div>Set new password</div>
        <form onSubmit={HandleSubmit}>
          <label>New Password</label>
          <input type="text" onChange={(e)=>setpass(e.target.value)}/>
          <label>Confirm Password</label>
          <input type="text" onChange={(e)=>setpass(e.target.value)} />
          <button>submit</button>
        </form>
        {message}
      </>
      : loading ? "" : "Invalid token"
  );
};

export default RedirectPass;
