import React, { useRef, useState } from "react";
import "./editprofile.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Login, UpdateUserInfo } from "../../actions/User";
import { set } from "mongoose";
//@TODO
//like unlike
//comment
//Single post in profile page
//explore page
//search
const EditProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const imageUploadRef = useRef(null);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [image, setimage] = useState();
  const handleImageChange = (e) => {
    const imagePreview = document.getElementById("imagePreview");
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      setimage(e.target.files[0]);
      reader.onload = function (event) {
        imagePreview.style.backgroundImage = `url(${event.target.result})`;
        imagePreview.style.display = "none";
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSave = async () => {
    let avtar;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Food-Delivery");
    data.append("cloud_name", "xash");
    if (image) {
      await fetch("https://api.cloudinary.com/v1_1/xash/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          avtar = data.secure_url;
        });
    }
    fetch(`/user/updateprofile`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avtar,
        name,
        email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const { other } = data;
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(UpdateUserInfo(other));
        });
        Swal.fire({
          icon: "success",
          text: "Profile updated successfully",
        });
      } else if (res.status === 409) {
        Swal.fire({
          icon: "error",
          text: "Email already exists",
        });
      } else if (res.status === 408) {
        Swal.fire({
          icon: "error",
          text: "Username already taken",
        });
      }
    });
  };
  const reset = (e) => {
    e.preventDefault();
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.style.backgroundImage = `url('${userInfo.avtar}')`;
    imagePreview.style.display = "none";
    imagePreview.style.display = "block";
    imageUploadRef.current.value = null;
    setname("");
    setemail("");
  };

  return (
    <div className="containerx">
      <h1 style={{ marginTop: "50px" }}>Edit your profile</h1>
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            ref={imageUploadRef}
          />
          <label htmlFor="imageUpload"></label>
        </div>
        <div className="avatar-preview">
          <div
            id="imagePreview"
            style={{ backgroundImage: `url('${userInfo.avtar}')` }}
          ></div>
        </div>
      </div>
      <div
        className="mains"
        // style={{ marginLeft: "280px", marginTop: "-100px" }}
      >
        <div className="sections">
          <div className="lx-container-70">
            <div className="lx-row align-stretch">
              <div className="lx-column">
                <form>
                  <div className="fieldset">
                    <label htmlFor="user-name">Username</label>
                    <div className="input-wrapper">
                      <span className="icon">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        id="user-name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
                  </div>
                  <div className="fieldset">
                    <label htmlFor="email">E-mail</label>
                    <div className="input-wrapper">
                      <span className="icon">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        autoComplete="username"
                      />
                    </div>
                    <div id="email-helper" className="helper"></div>
                  </div>
                  <div className="actions">
                    <a
                      id="cancel"
                      className="lx-btn"
                      style={{ cursor: "pointer" }}
                      onClick={reset}
                    >
                      <i class="fa-solid fa-rotate-left"></i>&nbsp;&nbsp;Reset
                    </a>
                    <a
                      id="save"
                      className="lx-btn"
                      style={{ cursor: "pointer" }}
                      onClick={handleSave}
                    >
                      <i className="fas fa-save"></i>&nbsp;&nbsp;Save
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
