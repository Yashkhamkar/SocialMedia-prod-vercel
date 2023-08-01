import React, { useEffect, useState } from "react";
import { Like, CommentOne } from "@icon-park/react";

import "./style.css";
import Posts from "../Posts/Posts";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetloggedinUserPosts } from "../../actions/User";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Swal from "sweetalert2";
import { set } from "mongoose";

const ProfilePage = () => {
  const [details, setdetails] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [threedots, setthreedots] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const handlePostClick = (post) => {
    setSelectedPost(post);
    if (threedots == true) {
      setpostDialog(false);
    }
    setpostDialog(true);
    console.log(selectedPost);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
    getPosts();
  }, []);
  const followingList = details.following ?? [];
  const followersList = details.followers ?? [];

  const getPosts = async () => {
    const response = await fetch(`/user/myprofile`);
    const data = await response.json();
    setdetails(data.user);
    dispatch(GetloggedinUserPosts(data.user));
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openFollowersDialog, setOpenFollowersDialog] = useState(false);
  const [postDialog, setpostDialog] = useState(false);
  const numberOfPosts = details.posts ? details.posts.length : 0;
  const numberOfFollowers = details.followers ? details.followers.length : 0;
  const numberOfFollowing = details.following ? details.following.length : 0;

  return (
    <main style={{ marginTop: "80px" }}>
      <Dialog
        open={postDialog}
        onClose={() => setpostDialog(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Posts
          userName={selectedPost?.owner?.name}
          photoURL={selectedPost?.owner?.avtar}
          caption={selectedPost?.caption}
          imageURL={selectedPost?.image}
          postID={selectedPost?._id}
          likes={selectedPost?.likes}
          comments={selectedPost?.comments}
        />
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Followings</DialogTitle>
        <DialogContent>
          <AllCommentContainer>
            {followingList.map((follows) => (
              <div className="post-comment" key={follows._id}>
                <div className="user-image">
                  <img src={follows.avtar} alt="" />
                </div>
                <div className="user-comment">
                  <strong>{follows.name}</strong>
                </div>
                <button
                  button
                  className="primary buttons"
                  style={{ cursor: "pointer", marginLeft: "100px" }}
                >
                  Unfollow
                </button>
              </div>
            ))}
          </AllCommentContainer>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openFollowersDialog}
        onClose={() => setOpenFollowersDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Followers</DialogTitle>
        <DialogContent>
          <AllCommentContainer>
            {followersList.map((follower) => (
              <div className="post-comment" key={follower._id}>
                <div className="user-image">
                  <img src={follower?.avtar} alt="" />
                </div>
                <div className="user-comment">
                  <strong>{follower?.name}</strong>
                </div>
              </div>
            ))}
          </AllCommentContainer>
        </DialogContent>
      </Dialog>
      <header>
        <div className="header-wrap">
          <div className="profile-pic">
            <img src={userInfo.avtar} alt="profile-logo" />
          </div>
          <div className="profile-info">
            <div className="title row">
              <h2>{userInfo.name}</h2>
              <span className="verfied-icon spanx"></span>
              <button className="primary buttons" style={{ cursor: "pointer" }}>
                <Link to="/editprofile" style={{ color: "" }}>
                  Edit Profile
                </Link>
              </button>
            </div>
            <div className="desktop-only">
              <div className="details row">
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <span className="spanx">{numberOfPosts}</span> posts
                  </li>
                  <li
                    style={{ listStyle: "none", cursor: "pointer" }}
                    onClick={() => setOpenFollowersDialog(true)}
                  >
                    <span className="spanx">{numberOfFollowers}</span> followers
                  </li>
                  <li
                    style={{ listStyle: "none", cursor: "pointer" }}
                    onClick={() => setOpenDialog(true)}
                  >
                    <span className="spanx">{numberOfFollowing}</span> following
                  </li>
                </ul>
              </div>
              <div
                className="descriptions row last"
                style={{ fontSize: "15px", marginTop: "40px" }}
              >
                {/* BEST PHONES IN THE WORLD */}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info mobile-only">
          <div className="descriptions row"></div>
        </div>
      </header>
      <div className="desktop-only">
        <div className="tabs">
          <div className="tab-item active" style={{ marginRight: "60px" }}>
            <svg
              aria-label="Posts"
              className="_8-yf5"
              fill="#262626"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clip-rule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span className="spanx">POSTS</span>
          </div>
          <div
            className="tab-item"
            style={{ marginRight: "60px", cursor: "pointer" }}
            onClick={() => {
              Swal.fire({
                title: "Sorry this feature is not available yet.",
                text: "We are working on it.",
              });
            }}
          >
            <svg
              aria-label="Posts"
              className="_8-yf5"
              fill="#8e8e8e"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
            </svg>
            <span className="spanx">FLIXIES</span>
          </div>
        </div>
      </div>
      <div className="mobile-tabs mobile-only">
        <ul>
          <li>
            <div>{numberOfPosts}</div>
            posts
          </li>
          <li onClick={() => setOpenFollowersDialog(true)}>
            <div>{numberOfFollowers}</div>
            followers
          </li>
          <li
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <div>{numberOfFollowing}</div>
            following
          </li>
        </ul>
        <div className="actions">
          <svg
            aria-label="Posts"
            className="_8-yf5"
            fill="rgb(0, 149, 246)"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path
              clip-rule="evenodd"
              d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <svg
            aria-label="Posts"
            className="_8-yf5"
            fill="#8e8e8e"
            height="24"
            viewBox="0 0 48 48"
            width="24"
            onClick={() => {
              Swal.fire({
                title: "Sorry this feature is not available yet.",
                text: "We are working on it.",
              });
            }}
          >
            <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
          </svg>
        </div>
      </div>
      <div className="gallery">
        {details && details.posts && Array.isArray(details.posts) ? (
          details.posts.map((post) => (
            <div
              className="gallery-item"
              key={post._id}
              onClick={() => {
                handlePostClick(post);
              }}
            >
              <img alt="gallery-post" src={post.image} />
              <div className="overlay">
                <div className="iconss">
                  <div className="three-dots-icon">
                    <i
                      class="fa-solid fa-ellipsis-vertical fa-xl"
                      style={{ color: "white" }}
                      fontSize="24px"
                      onClick={() => {
                        setthreedots(true);
                        Swal.fire({
                          showDenyButton: true,
                          confirmButtonText: "Edit post",
                          denyButtonText: `Delete post`,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate(`/editpost/${post._id}`);
                          } else if (result.isDenied) {
                            fetch(`post/${post._id}`, {
                              method: "DELETE",
                            }).then((res) => {
                              Swal.fire(
                                "Post deleted successfully",
                                "",
                                "success"
                              );
                              window.location.reload();
                            });
                          }
                        });
                      }}
                    ></i>
                  </div>
                  <Like
                    theme="filled"
                    size="24"
                    fill="#fff"
                    style={{ marginRight: "10px" }}
                  />
                  {post.likes.length}
                  <CommentOne
                    theme="filled"
                    size="24"
                    fill="#fff"
                    style={{ marginLeft: "10px" }}
                  />
                  {post.comments.length}
                </div>
              </div>
              <span className="media-icon"></span>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </main>
  );
};
const AllCommentContainer = styled.div`
  padding: 15px;

  .post-comment {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .user-image {
      margin-right: 20px;
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }

    .user-comment {
      display: flex;

      font-size: 13px;

      strong {
        margin-right: 10px;
      }
    }
  }
`;
const Menu = styled.div`
  position: relative;
  bottom: -8px;
  display: ${(props) => (props.openMenu ? "block" : "none")};
  background: #fff;
  width: 100px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const MenuElement = styled.div`
  height: 40px;
  color: gray;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  &:hover {
    background-color: #e4e4e4;
  }
`;

export default ProfilePage;
