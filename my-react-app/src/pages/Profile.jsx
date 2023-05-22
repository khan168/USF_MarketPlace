import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  background: #f2f2f2;
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
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
`;

const UserName = styled.h3`
  margin: 20px 0 0 0;
  color: #333;
`;

const UserInfo = styled.p`
  color: #777;
  margin-bottom: 20px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PostCard = styled.div`
  width: 100%;
  background: white;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 2em;
`;

const PostTitle = styled.h4`
  color: #333;
`;

const PostBody = styled.p`
  color: #777;
`;


const Profile = () => {
  const [userData, setUserData] = useState(null);

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
    <div>
      {userData ? (
        <>
          <img src={userData.profileImage} alt="Profile" />
          <h2>{userData.username}</h2>
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
          {/* // Your code here to display the user's posts... */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;