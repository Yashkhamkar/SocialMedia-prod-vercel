import React, { useRef, useState } from "react";
import "./auth.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
  const [email, setemail] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter email",
      });
    }
    fetch("/user/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const { message, id } = data;

          navigate(`/reset/${id}`);
          Swal.fire({
            icon: "success",
            text: message,
          });
        });
      } else if (res.status === 404) {
        return Swal.fire({
          icon: "error",
          text: "User not found",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
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
                  Enter your email address and we'll send you a Otp to reset
                  your password.
                </span>
                <form id="stripe-login">
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Email</label>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
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
                      value="Send"
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

export default ForgotPassword;
