import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Posts from "./Posts/Posts";
import { useNavigate } from "react-router-dom";
import Suggestion from "./Suggestion/Suggestion";
import { AiFillGithub } from "react-icons/ai";
const Home = () => {
  const [details, setdetails] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
    getPosts();
  }, [details]);
  const getPosts = async () => {
    const response = await fetch(`/post/posts`);
    const data = await response.json();
    setdetails(data.posts);
  };
  return (
    <Container>
      <Inner>
        <Main>
          <PostContainer>
            {details.length > 0 &&
              details.map(
                (post) => (
                  <Posts
                    userName={post.owner.name}
                    photoURL={post.owner.avtar}
                    caption={post.caption}
                    imageURL={post.image}
                    userID={post.owner._id}
                    postID={post._id}
                    likes={post.likes}
                    comments={post.comments}
                  />
                )
                // console.log(post.caption)
              )}
          </PostContainer>
        </Main>
      </Inner>
      <StickySuggestion>
        <Suggestion />
      </StickySuggestion>
      <a
        href="https://github.com/Yashkhamkar"
        target="_blank"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <AiFillGithub size={24} />
        <span style={{ marginLeft: "5px" }}>Made by Yashkhamkar</span>
      </a>
    </Container>
  );
};
const StickySuggestion = styled.div`
  position: sticky;
  top: 60px; /* Adjust this value as needed to fit your layout */
`;
const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 20px;
  text-decoration: none;
  color: #333;
`;
const Container = styled.div``;

const Inner = styled.div`
  width: 100%;

  margin-top: 60px;
`;

const Main = styled.main`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`;

const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`;

export default Home;
