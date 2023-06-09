import styled from "styled-components";
import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
require("./ChatPage.css");

const Container = styled.div``;

const Wrapper = styled.div`
  height: calc(100vh - 130px);
  overflow-y: auto;
  /* height: 70vh; */
  padding: 40px;
  display: flex;
  background-color: beige;
  /* @media screen and (max-width: 850px) {
    width: 100vw;
  } */

`;

const Product = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const param1 = searchParams.get("param1");

  const id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const socket = useRef(); //web socket connection to server
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [currentChat, setCurrentChat] = useState(
    param1 !== null ? { chatid: param1 } : null
    );

  const [conversations, setConversations] = useState([]);   //conversations on the left side
  const [messages, setMessages] = useState([]); //get all messages from
  const [newText, setNewText] = useState(""); //set message from text box
  const [searchTerm, setSearchTerm] = useState(""); //set search from search bar

  const scrollRef = useRef(); //reach chat box on message change

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET}`);   //connects client to socket server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        user: data.senderId,
        desc: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.off("getMessage");
      socket.current.disconnect();
    };
  }, []);



  //updates the message state and conversations state on getting message from socket server which causes arrival message to update

 useEffect(() => {
  
   arrivalMessage &&
     (currentChat?.from._id === arrivalMessage.user ||
       currentChat?.to._id === arrivalMessage.user) &&
     setMessages((prev) => [...prev, arrivalMessage]);

   const chatToUpdate =
     id < arrivalMessage?.sender
       ? id + arrivalMessage?.sender
       : arrivalMessage?.sender + id;

   arrivalMessage &&
     setConversations((prev) => {
       //arrival check helps prevent update when conversation component is unmounted
       return prev.map((item) => {
         if (item?.chatid === chatToUpdate) {
           return { ...item, readby: [], lastMesage: arrivalMessage?.desc };
         }
         return item;
       });
     });

   // Clear the arrivalMessage
   setArrivalMessage(null);
 }, [arrivalMessage, currentChat, id]);





  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.on("getUsers", (users) => console.log(users));
  }, [id]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      user: id,
      desc: newText,
      chatid: currentChat?.chatid,
    };

    const receiverId =
      currentChat?.to._id === id ? currentChat?.from._id : currentChat?.to._id; //logic to get reciever id
    
    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newText,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}api/message/` + currentChat?.chatid,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.put(
        `${process.env.REACT_APP_SERVER}api/chat/` + currentChat?.chatid,
        {text:newText,id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      //update the last sent message in the conversations
      const updatedlist = conversations?.map((item) => {
        if (item?.chatid === currentChat?.chatid) {
          return { ...item, lastMesage: newText };
        }
        return item;
      }); 

      setConversations(updatedlist);  
      
      setMessages([...messages, res.data]); //keep prev messages and add new message to UI and db
      setNewText("");
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}api/chat/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [token]);




  useEffect(() => {
    
    const getMessages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}api/message/` + currentChat?.chatid, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [token, currentChat?.chatid]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const filteredList = conversations?.filter(
    (ele) =>
      ele?.from.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      ele?.to.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for Sellers"
              className="chatMenuInput"
              style={{ padding: "15px", fontSize:"20px" }}
              onChange={(e)=>{setSearchTerm(e.target.value)}}
            />
            <div>
              {filteredList.map((c) => (
                <div onClick={async () => {
                  if(c.readby.map((item) => item === id).includes(true)===false){
                    //update in UI
                    c.readby.push(id);
                    setCurrentChat(c);

                    //update using controller
                    try{
                      await axios.put(
                        `${process.env.REACT_APP_SERVER}api/chat/` +
                          c.chatid,
                          {id:id},
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                    }catch(err){
                      console.log(err);
                    } 
                  }else setCurrentChat(c);
                  } }>
                  <Conversation conversationDetail={c} curr_user={id}  activeUser={currentChat?.chatid === c.chatid} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop" ref={scrollRef}>
                  {messages.map((m) => (
                    <div
                      ref={scrollRef}
                    >
                      <Message
                        message={m}
                        id={id}
                        own={m.user === id ? "true" : "false"}
                        chat={currentChat}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewText(e.target.value)}
                    value={newText}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </Wrapper>
      {/* <Footer /> */}
    </Container>
  );
};

export default Product;
