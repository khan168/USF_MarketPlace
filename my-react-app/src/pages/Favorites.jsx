import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;



const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PostImage = styled.img`
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const PostPrice = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const PostBody = styled.p`
  font-size: 1rem;
  color: #666;
`;




const Favorites = () => {

const navigate = useNavigate();

const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('_id');
        console.log(userId)
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}api/likes/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log(res.data)
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikedPosts();
  }, []);


  return (
    <Container>
        <Navbar></Navbar>

        <PostsContainer>
      {posts.map((post) => (
         post && (
            <PostCard key={post._id} onClick={() => navigate(`/product/${post._id}`)}>
              {post.images && post.images[0] ? (
                <PostImage src={post.images[0]} alt="Post" />
              ) : (
                <PostImage src={'placeholder-image-url'} alt="Post" />
              )}
              <PostTitle>{post.title}</PostTitle>
              <PostPrice>${post.price}</PostPrice>
              <PostBody>{post.description}</PostBody>
            </PostCard>
          )
      ))}
    </PostsContainer>



    
    <Footer></Footer>


    </Container>
  )
}

export default Favorites