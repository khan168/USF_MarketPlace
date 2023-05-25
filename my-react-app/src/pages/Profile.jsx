import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  background: #f2f2f2;

  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const PostPrice = styled.p`
  color: #333;
  font-weight: bold;
  margin-top: 10px;
`;


const Card = styled.div`
  width: 350px;
  background: white;

  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s ease-out;
  text-align: center;
  margin-bottom: 2em;

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px 30px 25px 30px;
  }
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const UserName = styled.h3`
  margin: 20px 0 0 0;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin: 15px 0 0 0;
  }
`;

const UserInfo = styled.p`
  color: #777;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 2em;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 10px;
`;

const PostTitle = styled.h4`
  color: #333;
  margin-top: 10px;
`;

const PostBody = styled.p`
  color: #777;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const DeleteButton = styled.button`
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: red;
  border-radius: 12px;
  
  &:hover {
    background-color: darkred;
    color: white;
  }
`;

const noAvatarsrc =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0OBg8PDw4OEBIQDxAQEA4QDxANDw8QFhYWFxURFRMYHSgiGBolGxMTITEhJSkrLjAuFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAQACAAMFBAkDBAMAAAAAAAABAgMEEQUhMUFREmFxwRMiYoGRobHR4TJScjM0gvFCQ5L/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9rWZnSImZ6RvkHg6sPZ+Nb/jp4zEN8bJvzvX4TII4SM7JvyvX4TDTibNxo4RFvCfuDkHt6TWdJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEJrI5KMOvanfbr07oBy5XZkzvxN3sxx98pTCwq0rpWsR4MwAAAAGOJh1tXS0RMd8ao3NbL54c/4z5SlAFYtWYtMTGkxxiXiezuTriV6WjhbylB4lJreazGkxxgGIAAAAAAAAAAAAAAAAN2TwfSZiteXGfCASGysrpX0lo3z+nujr70k8iNz0AAAAAAAABxbSyvbw+1EetWPjHR2gKuOraOB2MzOnC2+POHKAAAAAAAAAAAAAAAldjYfq2t1mKx9Z+sIpO7Mrpkq9+s/OQdYAAAAAAAAAAAODa+Hrlot+2flO77IZYs5XXKXj2Z+W9XQAAAAAAAAAAAAAAFg2f/AGdP4q+ndl21ycd0zHz/ACDrAAAAAAAAAAABrzH9C38bfRW1hz1tMnefZmPju81eAAAAAAAAAAAAAAASexcXfan+UefkjGzL4s0xq2jlPxjmCyDGlotWJjfExrDIAAAAAAAAACZBHbZxdMKtes6z4QiG/O4/pMxNuXCvhDQAAAAAAAAAAAAAAAACS2Vm9J9HbhP6Z7+iWVdK5DaGsRTEnfyt17pBJgAAAAAAAI3aub0j0deM/qnpHRnn8/FYmtN9uc8q/lDTOs6gAAAAAAAAAAAAAAAAAAM8LBte2lYmfpHjLryezrX331rHTnP2S+FhVpTSsREA05LAvh4elr9rpHKPCXSAAAAADTmsK18LStprPXr3NwCuY+Xvh20tHhPGJ97Us16RaukxExPKd6LzmzJj1sPf7PP3AjQniAAAAAAAAAAAAAA9rWZtERGszuiAK1mbRERrM8IS+R2fFNLX0m3KOMV/LZkcnGHXWd9p4z07odgAAAAAAAAAAAAOPO5GuJGsbrdeU+KFxMO1bzW0aTCzOfN5WuLTfumOFun4BXxni4dqYk1tGkwwAAAAAAAAAAATOzcp2Kdq0etMf+Y6eLk2Vlu1i9uY3V4d9k0AAAAAAAAAAAAAAAADlz+VjEw/ajhPlKBmJidJjSY3THSVoRW1st/2RHdbykEYAAAAAAAARGs6ddw69l4XazcTyr632BMZbBimBFekb++ectoAAAAAAAAAAAAAAAAAMcSkWw5ieExpLIBWcXDmuLNZ5ToxSG2MLTGrb90aT4x+PojwAAAAAAEvsXD0wrW6zp7o/wBohP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/tmJ8vNBrJj07WDavWswrYAAAAAACy4VdMKsdIiPkrdI1vHjCzgAAAAAAAAAAAAAAAAAAAAKzi10xbR0tMfNZldzsaZu/wDKQaQAAAAAZYP9av8AKPqswAAAAAAAAAAAAAAAAAAAAAK9n/7y/j5QANAAAAP/2Q==";


const Profile = () => {

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      
      const response = await axios.delete(`http://localhost:5001/api/items/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(response.status === 200) {
        setPosts(posts.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5001/api/user/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const postResponse = await axios.post(
          `http://localhost:5001/api/items/getAllByUser`,
          { _id: id } )  
        setPosts(postResponse.data)
        setUserData(response.data);
        
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <ProfileContainer>
        {userData ? (
          <>
            <Card>
              <Avatar
                src={userData.profileImage || noAvatarsrc}
                alt="Profile"
              />
              <UserName>{userData.username}</UserName>
              <UserInfo>{userData.number}</UserInfo>
              <UserInfo>{userData.name}</UserInfo>
              <UserInfo>{userData.email}</UserInfo>
            </Card>
            <PostsContainer>
              {posts.map((post) => (
                <PostCard key={post._id}>
                  {post.images[0] && (
                    <PostImage src={post.images[0]} alt="Post" />
                  )}
                  <PostTitle>{post.title}</PostTitle>
                  <PostPrice>${post.price}</PostPrice>
                  <PostBody>{post.description}</PostBody>
                  <DeleteButton onClick={() => handleDelete(post._id)}>
                    Delete
                  </DeleteButton>
                </PostCard>
              ))}
            </PostsContainer>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </ProfileContainer>
      <Footer></Footer>
    </>
  );
};

export default Profile;