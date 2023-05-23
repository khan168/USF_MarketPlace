import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("param1");
  const id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(param1!==null ?{chatid:param1} :null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      user: id,
      desc: newMessage,
      chatid: currentChat?.chatid,
    };
    

    try {
      const res = await axios.post(
        "/api/message/" + currentChat?.chatid,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/chat/all", {
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
        const res = await axios.get("/api/message/" + currentChat?.chatid, {
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

  

  return (
    <Container>
      <Navbar />
      <Announcement></Announcement>
      <Wrapper>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for Sellers" className="chatMenuInput" />
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
                <div className="chatBoxTop">
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
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
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
