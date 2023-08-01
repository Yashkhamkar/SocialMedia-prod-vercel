import React, { useEffect, useState } from "react";
import "./style.css";
// import "./all.min.css";

import { Like, Comment, DislikeTwo } from "@icon-park/react";
import { Dialog } from "@mui/material";
import Posts from "../Posts/Posts";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();

  const getPosts = async () => {
    try {
      const response = await fetch(`/post/getposts`);
      const data = await response.json();
      setPosts(data.posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setpostDialog(true);
  };

  useEffect(() => {
    getPosts();
  }, []);
  const [postDialog, setpostDialog] = useState(false);
  return (
    <main
      className="background"
      style={{ marginLeft: "85px", marginTop: "50px" }}
    >
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
      <div className="web-container">
        <div className="pics-only" style={{ cursor: "pointer" }}>
          {posts.length > 0 &&posts.map((post, index) => (
            <div key={index} className="image-container">
              <img
                className="image"
                src={post.image}
                alt={`Image ${index + 1}`}
                onClick={() => {
                  handlePostClick(post);
                }}
              />
              <div className="image-overlay">
                <DislikeTwo
                  theme="filled"
                  size="28"
                  fill="#fff"
                  className="icon-heart"
                />
                <div
                  className="txt"
                  style={{ color: "white", marginRight: "20px" }}
                >
                  {post.likes.length}{" "}
                  {/* You can replace this with the actual number of likes */}
                </div>
                <Comment
                  theme="filled"
                  size="28"
                  fill="#fff"
                  className="icon-comment"
                />
                <div className="txt" style={{ color: "white" }}>
                  {post.comments.length}{" "}
                  {/* You can replace this with the actual number of comments */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Explore;
