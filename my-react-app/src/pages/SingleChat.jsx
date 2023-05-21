import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import Newsletter from "../components/NewsLetter";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Announcement from "../components/Annoucements";
require("./ChatPage.css");

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: beige;
`;




const Product = () => {
  const [curr_user, setcurr_user] = useState("");
  const token = localStorage.getItem("token");
  const SERVER = "http://localhost:5001/";

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      // sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <Container>
      <Navbar />
      <Announcement></Announcement>
      <Wrapper>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for Sellers" className="chatMenuInput" />
            <div >
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              <>
                <div className="chatBoxTop">
                  <div ref={scrollRef}>
                    <Message />
                  </div>
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
