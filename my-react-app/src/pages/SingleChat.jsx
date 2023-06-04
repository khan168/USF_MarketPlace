import styled from "styled-components";
import Footer from "../components/Footer";
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
  height: calc(100vh - 410px);
  padding: 50px;
  display: flex;
  background-color: beige;
`;

const Product = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("param1");
  const id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const socket = useRef(); //web socket connection to server
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(
    param1 !== null ? { chatid: param1 } : null
  );
  const [messages, setMessages] = useState([]); //get all messages from
  const [newText, setNewText] = useState(""); //set message from text box
  const scrollRef = useRef(); //reach chat box on message change

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET}`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        desc: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && (currentChat?.from._id === arrivalMessage.sender || currentChat?.to._id === arrivalMessage.sender) &&setMessages((prev) => [...prev, arrivalMessage]);
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
      currentChat?.to._id === id ? currentChat?.from._id : currentChat?.to._id; //logic to get reciever
    
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
    // console.log(currentChat.chatid);
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

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for Sellers"
              className="chatMenuInput"
              style={{ padding: "15px" }}
            />
            <div>
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversationDetail={c} curr_user={id} />
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
                      onClick={() => {
                        console.log(m);
                      }}
                    >
                      <Message
                        message={m}
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
      <Footer />
    </Container>
  );
};

export default Product;
