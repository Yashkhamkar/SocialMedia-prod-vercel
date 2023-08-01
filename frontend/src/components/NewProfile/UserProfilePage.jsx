import React, { useEffect, useState } from "react";
import { Like, CommentOne } from "@icon-park/react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateUserInfo } from "../../actions/User";
import Swal from "sweetalert2";
import Posts from "../Posts/Posts";
import { Dialog } from "@mui/material";

const UserProfilePage = () => {
  const [details, setdetails] = useState([]);
  const [followed, setfollowed] = useState(false);
  const [postDialog, setpostDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    getPosts();
  }, []);
  const [selectedPost, setSelectedPost] = useState(null);
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setpostDialog(true);
    console.log(selectedPost);
  };
  const getPosts = async () => {
    const followId = userInfo._id;
    try {
      const response = await fetch(`/user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setdetails(data.user);

        if (data.user.followers.includes(followId)) {
          setfollowed(true);
        }
      } else {
        console.error("Error fetching user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const followUnfollow = (id) => {
    setfollowed(!followed);
    fetch(`/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedUserInfo = {
        ...userInfo,
        following: [...userInfo.following, id], // Assuming following is an array of user IDs
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      dispatch(UpdateUserInfo(updatedUserInfo));
    });
  };
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
          postID={selectedPost?.owner?._id}
        />
      </Dialog>
      <header>
        <div className="header-wrap">
          <div className="profile-pic">
            <img src={details?.avtar} alt="profile-logo" />
          </div>
          <div className="profile-info">
            <div className="title row">
              <h2>{details?.name}</h2>
              <span className="verfied-icon spanx"></span>
              <button
                className="buttons"
                style={{ cursor: "pointer", color: "#c13584" }}
                onClick={() => followUnfollow(details?._id)}
              >
                {followed ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="desktop-only">
              <div className="details row">
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <span className="spanx">{numberOfPosts}</span> posts
                  </li>
                  <li style={{ listStyle: "none" }}>
                    <span className="spanx">{numberOfFollowers}</span> followers
                  </li>
                  <li style={{ listStyle: "none" }}>
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
          <div className="descriptions row">
            <h1>apple</h1>
            <span className="spanx">
              Everyone has a story to tell.
              <br />
              Tag <a>#ShotoniPhone</a> to take part.
            </span>
          </div>
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
          <li>
            <div>{numberOfFollowers}</div>
            followers
          </li>
          <li>
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

export default UserProfilePage;
