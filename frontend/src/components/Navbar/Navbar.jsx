import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import logo from "../../assets/logo.png";
import gallery from "../Create_post/icons/gallery.svg";
import home from "../../assets/41-home.svg";
import { MdOutlineExplore, MdLibraryAdd } from "react-icons/md";
import "../Create_post/style.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { LogoutUser } from "../../actions/User";
function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setresults] = useState([]);
  const [caption, setCaption] = useState("");
  const [search, setsearch] = useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  const handleSearch = async (value) => {
    setsearch(value);
    const response = await fetch(`/user/search?name=${value}`);
    const data = await response.json();
    setresults(data.users);
  };
  const Logout = () => {
    dispatch(LogoutUser());
    navigate("/");
  };
  const handleClickGallery = () => {
    document.getElementById("imageInput").click();
  };
  const createPost = (e) => {
    setOpenDialog(false);
    e.preventDefault();
    Swal.fire({
      icon: "success",
      text: "Post created successfully",
    });
    let Postimage;
    if (!selectedFile) {
      return alert("Please select a file");
    }
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "Food-Delivery");
    data.append("cloud_name", "xash");

    fetch("https://api.cloudinary.com/v1_1/xash/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        Postimage = data.secure_url;

        return fetch(`/post/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: Postimage,
            caption: caption,
          }),
        });
      });
    setCaption("");
    setSelectedFile(null);
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const navigateToUserProfile = (userId) => {
    setsearch("");
    setresults([]);
    navigate(`/userprofile/${userId}`);
    window.location.reload();
  };

  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        // fullWidth
      >
        <div className="post-body">
          <div className="container">
            <div className="wrapper">
              <section className="postx">
                <header className="heads">Create Post</header>
                <form action="#">
                  <div className="content">
                    {userInfo ? (
                      <img
                        src={userInfo.avtar}
                        alt="Avatar"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : null}
                    <div className="details">
                      <p>{userInfo.name}</p>
                    </div>
                  </div>
                  <textarea
                    placeholder={`Write a caption ${userInfo.name} !!!`}
                    spellCheck="false"
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                    required
                  ></textarea>
                  <div className="options">
                    <p>
                      {selectedFile ? selectedFile.name : "Add to Your Post"}
                    </p>
                    <ul className="list">
                      <li>
                        <label htmlFor="imageInput">
                          <img
                            src={gallery}
                            alt="gallery"
                            onClick={handleClickGallery}
                          />
                        </label>
                        <input
                          type="file"
                          id="imageInput"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </li>
                    </ul>
                  </div>
                  <button onClick={createPost}>Post</button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </Dialog>
      <Logo>
        <Link to="/home">
          <img src={logo} alt="" height={45} />
        </Link>
      </Logo>
      {results.length > 0 && search && (
        <UserBox>
          {results.map((user) => (
            <div
              key={user._id}
              onClick={() => navigateToUserProfile(user._id)} // Use custom function for navigation
            >
              <UserItem>
                {user.avtar && <Avatar src={user.avtar} alt={user.name} />}
                <UserName>{user.name}</UserName>
              </UserItem>
            </div>
          ))}
        </UserBox>
      )}
      {results.length === 0 && search && (
        <UserBox>
          <NoUserFound>No user found</NoUserFound>
        </UserBox>
      )}
      <SearchBar>
        <input
          type="text"
          placeholder="Search ..."
          style={{
            marginTop: "15px",
            // textAlign: "center",
          }}
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </SearchBar>
      <Icons>
        <Icon>
          <Link to="/home">
            <img src={home} alt="" />
          </Link>
        </Icon>
        <Icon>
          {/* <img
            src="./40-add-card.svg"
            alt=""
            onClick={() => setOpenDialog(true)}
          /> */}
          <MdLibraryAdd
            style={{ fontSize: "24px" }}
            onClick={() => setOpenDialog(true)}
          />
        </Icon>
        <Icon>
          <Link to="/explore">
            <MdOutlineExplore style={{ fontSize: "24px" }} />
          </Link>
        </Icon>
        <Icon>
          {userInfo ? (
            <Icon>
              <img
                src={userInfo.avtar}
                alt=""
                onClick={() => setOpenMenu(!openMenu)}
              />
              <Menu openMenu={openMenu}>
                <MenuElement onClick={() => navigate("/profile")}>
                  Profile
                </MenuElement>
                <MenuElement onClick={Logout}>Logout</MenuElement>
              </Menu>
            </Icon>
          ) : null}
          <Menu openMenu={openMenu}>
            <MenuElement onClick={() => navigate("/profile")}>
              Profile
            </MenuElement>
            <MenuElement onClick={Logout}>Logout</MenuElement>
          </Menu>
        </Icon>
      </Icons>
    </Container>
  );
}
const UserBox = styled.div`
  position: absolute;
  margin-left: 550px;
  top: 50px;
  left: 0;
  width: 268px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
const NoUserFound = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  text-align: center;
`;

const UserItem = styled.div`
  padding: 8px 16px;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 14px;
`;
const Container = styled.div`
  height: 60px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  border-bottom: 1px solid lightgray;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @media only screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Logo = styled.div`
  cursor: pointer;
`;

const SearchBar = styled.div`
  height: 30px;
  width: 268px;
  padding: 3px 16px 3px 16px;
  min-height: auto;
  min-width: auto;
  background-color: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 18px;
    font-size: 14px;
    width: 90%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  justify-content: space-evenly;
  height: 40px;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }

  &:nth-child(4) {
    img {
      border-radius: 50%;
    }
    position: relative;
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

const CreatePostForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  height: 300px;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 33px;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }
`;

const PostCTAButtons = styled.div`
  button {
    width: 100px;
    height: 33px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
  }

  .cancel-button {
    background-color: red;
  }

  .post-button {
    background-color: #026aab;
  }
`;
export default Navbar;
