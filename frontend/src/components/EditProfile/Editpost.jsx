import React, { useRef, useState } from "react";
import "./editprofile.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Login, UpdateUserInfo } from "../../actions/User";
const Editpost = (postImage) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const imageUploadRef = useRef(null);
  const navigate = useNavigate();
  const [image, setimage] = useState();
  const [caption, setcaption] = useState();
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
    fetch(`/post/editpost/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caption,
      }),
    }).then(
      Swal.fire({
        icon: "success",
        text: "post updated successfully",
      }),
      navigate("/profile"),
      window.location.reload()
    );
  };
  const reset = (e) => {
    e.preventDefault();
    setcaption("");
  };

  return (
    <div className="containerx">
      <h1 style={{ marginTop: "50px", marginBottom: "40px" }}>
        Edit your caption
      </h1>
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
                    <div className="input-wrapper">
                      <span className="icon">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        id="user-name"
                        onChange={(e) => setcaption(e.target.value)}
                        autoComplete="username"
                      />
                    </div>
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

export default Editpost;
