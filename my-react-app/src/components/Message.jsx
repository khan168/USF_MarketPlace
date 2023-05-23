// import { format } from "timeago.js";
import styled from "styled-components";


  


const MessageTop = styled.div`
  display: flex;
  
`
const Messagediv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  ${({ own }) =>
    own==="true" &&
    `
    align-items: flex-end;
  `}
`;

const MessageImg =styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`


const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
  
`

const MessageBottom=styled.div`
font-size: 12px;
margin-top: 10px;
`





export default function Message({ message, own,chat }) {
  return (
    <Messagediv own={own}>
        <MessageTop>
          <MessageImg
            src={chat?.from?.profileImage ? own==="true" ? chat.from?.profileImage : chat.to?.profileImage : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt=""
          />
          <MessageText>{message?.desc}</MessageText>
        </MessageTop>
        <MessageBottom>{"right now"}</MessageBottom>
    </Messagediv>
  );
}
