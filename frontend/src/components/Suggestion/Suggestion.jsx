import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { UpdateUserInfo } from "../../actions/User";

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    getSuggestions();
  }, [userInfo]);

  const getSuggestions = async () => {
    const response = await fetch(`/user/getall`);
    const data = await response.json();
    const filteredSuggestions = data.users.filter(
      (user) => user._id !== userInfo._id
    );
    setSuggestions(filteredSuggestions);
  };

  const suggestedUsers = suggestions.filter(
    (user) =>
      userInfo &&
      Array.isArray(userInfo.following) && // Make sure userInfo.following is an array
      !userInfo.following.includes(user._id) &&
      !followedUsers.includes(user._id)
  );

  const followUnfollow = (id) => {
    fetch(`/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSuggestions((prevSuggestions) =>
        prevSuggestions.filter((user) => user._id !== id)
      );
      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, id]);
      Swal.fire({
        icon: "success",
        text: "User followed successfully",
      });
      const updatedUserInfo = {
        ...userInfo,
        following: [...userInfo.following, id], // Assuming following is an array of user IDs
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      dispatch(UpdateUserInfo(updatedUserInfo));
    });
  };

  return (
    <div className="right-col-container">
      <div className="right-col" style={{ marginTop: "-690px" }}>
        <p className="suggestion-text">Suggested users to follow</p>
        {suggestedUsers.map((suggestion, index) => (
          <div className="profile-card" key={index}>
            <div className="profile-picz">
              <Link to={`/userprofile/${suggestion._id}`}>
                <img src={suggestion.avtar} alt="" />
              </Link>
            </div>
            <div>
              <Link to={`/userprofile/${suggestion._id}`}>
                <p className="username">{suggestion.name}</p>
              </Link>
            </div>
            <button
              className="action-btn"
              style={{ cursor: "pointer" }}
              onClick={() => followUnfollow(suggestion._id)}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
