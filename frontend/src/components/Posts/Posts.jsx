import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import heart from "../../assets/heart.png";
import heart_1 from "../../assets/heart_1.png";
import comment from "../../assets/comment.png";
import { MdOutlineExplore, MdLibraryAdd } from "react-icons/md";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function Posts({
  userName,
  photoURL,
  caption,
  imageURL,
  userID,
  postID,
  likes,
  comments,
}) {
  const [likeActive, setLikeActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [likeState, setLikeState] = useState({ likeActive: false });
  const [moreButton, setMoreButton] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [likesOnPost, setLikesOnPost] = useState();

  const commentsOnPost = [
    {
      id: 1,
      userName: "John",
      photoURL: "https://example.com/user1.jpg",
      commentInput: "Great post!",
    },
    {
      id: 2,
      userName: "Jane",
      photoURL: "https://example.com/user2.jpg",
      commentInput: "Nice picture!",
    },
    {
      id: 3,
      userName: "Bob",
      photoURL: "https://example.com/user3.jpg",
      commentInput: "I love it!",
    },
  ];
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleLike = () => {
    fetch(`/post/${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const idToCheck = userInfo._id;
  const isLiked = likes?.some((like) => like._id === idToCheck);
  const handleComment = () => {
    fetch(`/post/${postID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentInput }),
    }).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Comment Added",
      });
    });
    setCommentInput("");
  };
  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <AllCommentContainer>
            {comments.map((comment) => (
              <div className="post-comment" key={comment._id}>
                <div className="user-image">
                  <img src={comment.user.avtar} alt={comment.user.name} />
                </div>
                <div className="user-comment">
                  <strong>{comment.user.name}</strong>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </AllCommentContainer>
        </DialogContent>
      </Dialog>
      <Link to={`/userprofile/${userID}`}>
        <UserInfo>
          <img src={photoURL} alt="" />
          <p>{userName}</p>
        </UserInfo>
      </Link>
      <Content>
        <img src={imageURL} alt="" />
      </Content>
      <PostCTA>
        <CTAButtons>
          {isLiked ? (
            <img src={heart} alt="" onClick={handleLike} />
          ) : (
            <img src={heart_1} alt="" onClick={handleLike} />
          )}
          <img src={comment} alt="" onClick={() => setOpenDialog(true)} />
        </CTAButtons>
        <LikeCount>{<p>{likes?.length} likes</p>}</LikeCount>
        <PostDescription moreButton={moreButton}>
          <h5>{caption}</h5>

          <div className="recent-comment">
            <strong>{comments[comments.length - 1]?.user.name}</strong>
            <p>{comments[comments.length - 1]?.comment}</p>
          </div>

          <div className="description-buttons">
            <p onClick={() => setOpenDialog(true)}>view all comments</p>
            <p onClick={() => setMoreButton(!moreButton)}>
              {moreButton ? "less" : "more"}
            </p>
          </div>
        </PostDescription>
        <CommentInput>
          <input
            type="text"
            placeholder="Add Comment"
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
          <button onClick={handleComment} style={{ cursor: "pointer" }}>
            Post
          </button>
        </CommentInput>
      </PostCTA>
    </Container>
  );
}

const Container = styled.div`
  height: fit-content;
  width: 100%;
  border: 1px solid lightgray;
  background-color: #fff;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  height: 60px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  border-bottom: 1px solid lightgray;

  img {
    width: 38px;
    height: 38px;
    border-radius: 100%;
    margin-left: 10px;

    border: 1px solid lightgray;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    margin-left: 10px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid lightgrey;

  img {
    width: 100%;
  }
`;

const PostCTA = styled.div`
  width: 90%;
  margin: auto;
`;

const CTAButtons = styled.div`
  height: 54px;
  display: flex;
  align-items: center;

  img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const LikeCount = styled.div`
  p {
    font-size: 15px;

    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const PostDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h5 {
    font-size: 14px;
    line-height: 20px;
    border: none;
    width: 100%;
    height: ${(props) => (props.moreButton ? "fit-content" : "40px")};
    overflow-y: hidden;
    word-break: break-all;
    min-height: 40px;
    font-weight: 500;
  }

  .description-buttons {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    color: gray;
    p {
      cursor: pointer;
    }
  }

  .recent-comment {
    font-size: 12px;
    display: flex;
    align-items: center;
    strong {
      margin-right: 10px;
    }
  }
`;

const CommentInput = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid lightgray;

  input {
    flex: 0.9;
    height: 30px;
    border: none;
    margin-right: 10px;
    outline: none;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: #18a4f8;
  }
`;

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
export default Posts;
