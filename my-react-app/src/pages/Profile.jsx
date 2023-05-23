import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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

const Card = styled.div`
  width: 350px;
  background: white;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s ease-out;
  text-align: center;
  margin-bottom: 2em;

  &:hover {
    transform: translateY(-20px);
  }

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
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const PostCard = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 2em;

  @media (max-width: 600px) {
    padding: 20px 30px 25px 30px;
  }
`;

const PostTitle = styled.h4`
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const PostBody = styled.p`
  color: #777;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;  



const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("_id");
      const token = localStorage.getItem("token");
      console.log(id)
      console.log(token)
      try {
        const response = await axios.get(`http://localhost:5001/api/user/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

              

        setUserData(response.data);
        
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <ProfileContainer>
      {userData ? (
        <>
          <Card>
            <Avatar src={userData.profileImage} alt="Profile" />
            <UserName>{userData.username}</UserName>
            <UserInfo>{userData.number}</UserInfo>
            <UserInfo>{userData.name}</UserInfo>
            <UserInfo>{userData.email}</UserInfo>
            {/* // Your code here to display the user's posts... */}
          </Card>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ProfileContainer>
  );
};


export default Profile;