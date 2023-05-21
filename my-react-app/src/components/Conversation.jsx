import React from 'react'
import styled from "styled-components";

const Conversationdiv=styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  hover {
  background-color: rgb(245, 243, 243);
}
`

const noAvatarsrc ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0OBg8PDw4OEBIQDxAQEA4QDxANDw8QFhYWFxURFRMYHSgiGBolGxMTITEhJSkrLjAuFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAQACAAMFBAkDBAMAAAAAAAABAgMEEQUhMUFREmFxwRMiYoGRobHR4TJScjM0gvFCQ5L/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9rWZnSImZ6RvkHg6sPZ+Nb/jp4zEN8bJvzvX4TII4SM7JvyvX4TDTibNxo4RFvCfuDkHt6TWdJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEJrI5KMOvanfbr07oBy5XZkzvxN3sxx98pTCwq0rpWsR4MwAAAAGOJh1tXS0RMd8ao3NbL54c/4z5SlAFYtWYtMTGkxxiXiezuTriV6WjhbylB4lJreazGkxxgGIAAAAAAAAAAAAAAAAN2TwfSZiteXGfCASGysrpX0lo3z+nujr70k8iNz0AAAAAAAABxbSyvbw+1EetWPjHR2gKuOraOB2MzOnC2+POHKAAAAAAAAAAAAAAAldjYfq2t1mKx9Z+sIpO7Mrpkq9+s/OQdYAAAAAAAAAAAODa+Hrlot+2flO77IZYs5XXKXj2Z+W9XQAAAAAAAAAAAAAAFg2f/AGdP4q+ndl21ycd0zHz/ACDrAAAAAAAAAAABrzH9C38bfRW1hz1tMnefZmPju81eAAAAAAAAAAAAAAASexcXfan+UefkjGzL4s0xq2jlPxjmCyDGlotWJjfExrDIAAAAAAAAACZBHbZxdMKtes6z4QiG/O4/pMxNuXCvhDQAAAAAAAAAAAAAAAACS2Vm9J9HbhP6Z7+iWVdK5DaGsRTEnfyt17pBJgAAAAAAAI3aub0j0deM/qnpHRnn8/FYmtN9uc8q/lDTOs6gAAAAAAAAAAAAAAAAAAM8LBte2lYmfpHjLryezrX331rHTnP2S+FhVpTSsREA05LAvh4elr9rpHKPCXSAAAAADTmsK18LStprPXr3NwCuY+Xvh20tHhPGJ97Us16RaukxExPKd6LzmzJj1sPf7PP3AjQniAAAAAAAAAAAAAA9rWZtERGszuiAK1mbRERrM8IS+R2fFNLX0m3KOMV/LZkcnGHXWd9p4z07odgAAAAAAAAAAAAOPO5GuJGsbrdeU+KFxMO1bzW0aTCzOfN5WuLTfumOFun4BXxni4dqYk1tGkwwAAAAAAAAAAATOzcp2Kdq0etMf+Y6eLk2Vlu1i9uY3V4d9k0AAAAAAAAAAAAAAAADlz+VjEw/ajhPlKBmJidJjSY3THSVoRW1st/2RHdbykEYAAAAAAAARGs6ddw69l4XazcTyr632BMZbBimBFekb++ectoAAAAAAAAAAAAAAAAAMcSkWw5ieExpLIBWcXDmuLNZ5ToxSG2MLTGrb90aT4x+PojwAAAAAAEvsXD0wrW6zp7o/wBohP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/tmJ8vNBrJj07WDavWswrYAAAAAACy4VdMKsdIiPkrdI1vHjCzgAAAAAAAAAAAAAAAAAAAAKzi10xbR0tMfNZldzsaZu/wDKQaQAAAAAZYP9av8AKPqswAAAAAAAAAAAAAAAAAAAAAK9n/7y/j5QANAAAAP/2Q=="

const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ConversationName=styled.span`
font-weight: 500;
`
  
  

const Conversation = ({user}) => {
  return (
    <Conversationdiv>
      <ConversationImg
        src={
          user?.profilePicture
            ? user.profilePicture
            : noAvatarsrc
        }
        alt=""
      />
      {/* <ConversationName>{user?.username}</ConversationName> */}
      <ConversationName>{"John"}</ConversationName>
    </Conversationdiv>
  );
}

export default Conversation