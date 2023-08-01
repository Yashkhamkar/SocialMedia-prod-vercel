import React, { useRef, useState } from "react";
import "./auth.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";


const ResetPassword = () => {
  const inputRefs = useRef([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const handleInputChange = (index, e) => {
    const input = e.target;
    const value = input.value;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputBackspace = (index, e) => {
    if (e.keyCode === 8 && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderInputFields = () => {
    const fields = [];
    for (let i = 0; i < 4; i++) {
      fields.push(
        <input
          key={i}
          type="text"
          maxLength="1"
          ref={(ref) => (inputRefs.current[i] = ref)}
          onChange={(e) => handleInputChange(i, e)}
          onKeyDown={(e) => handleInputBackspace(i, e)}
        />
      );
    }
    return fields;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputRefs.current
      .map((ref) => ref.value)
      .join("")
      .toString();
    if (password.length < 8) {
      return Swal.fire({
        icon: "error",
        text: "Password must be atleast 8 characters long",
      });
    }
    fetch(`/user/reset/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp,
        password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Password reseted successfully",
        });
        navigate("/");
      } else {
        return Swal.fire({
          icon: "error",
          text: "Invalid OTP",
        });
      }
    });
  };
  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div
              className="box-root flex-flex"
              style={{ gridArea: "top / start / 8 / end" }}
            >
              <div
                className="box-root"
                style={{
                  backgroundImage:
                    "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                  flexGrow: 1,
                }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 2 / auto / 5" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "6 / start / auto / 2" }}
            >
              <div
                className="box-root box-background--blue800"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "7 / start / auto / 4" }}
            >
              <div
                className="box-root box-background--blue animationLeftRight"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "8 / 4 / auto / 6" }}
            >
              <div
                className="box-root box-background--gray100 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "2 / 15 / auto / end" }}
            >
              <div
                className="box-root box-background--cyan200 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "3 / 14 / auto / end" }}
            >
              <div
                className="box-root box-background--blue animationRightLeft"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 17 / auto / 20" }}
            >
              <div
                className="box-root box-background--gray100 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "5 / 14 / auto / 17" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                style={{ flexGrow: 1 }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="box-root padding-top--24 flex-flex flex-direction--column"
          style={{ flexGrow: 1, zIndex: 9 }}
        >
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1>
              <a href="" rel="">
              <Link to="/">
                  <img
                    src={logo}
                    alt=""
                    srcset=""
                    height={45}
                    style={{ marginBottom: "-25px" }}
                  />
                </Link>
              </a>
            </h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span
                  className="padding-bottom--15 spans"
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Verify your Otp
                </span>
                <form id="stripe-login">
                  <div className="otp">{renderInputFields()}</div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">New password</label>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div
                    className="field padding-bottom--24"
                    style={{ marginTop: "1rem" }}
                  >
                    <input
                      type="submit"
                      onClick={handleSubmit}
                      name="submit"
                      value="Verify"
                    />
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

export default ResetPassword;
