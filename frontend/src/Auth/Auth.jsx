import React, { useEffect, useState } from "react";
import "./auth.css";
import Swal from "sweetalert2";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login, Register } from "../actions/User";
import { AiFillGithub } from "react-icons/ai";
import logo from "../assets/logo.png";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setlogin] = useState(true);
  const [valid, setValid] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pic, setpic] = useState("");
  const [image, setimage] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [password, setpassword] = useState("");
  const flip = () => {
    setlogin(!login);
  };
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/home");
    }
  }, []);

  const validEmail = (e) => {
    setemail(e.target.value);
    setValid(validator.isEmail(e.target.value));
  };
  const register = (e) => {
    e.preventDefault();
    let avtar;
    if (!name || !email || !password) {
      return Swal.fire({
        icon: "warning",
        text: "Please fill all the fields",
      });
    } else if (!valid) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter a valid email",
      });
    } else if (password.length < 8) {
      return Swal.fire({
        icon: "warning",
        text: "Password must be at least 8 characters long",
      });
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Food-Delivery");
    data.append("cloud_name", "xash");

    fetch("https://api.cloudinary.com/v1_1/xash/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        avtar = data.secure_url;

        return fetch(`/user/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            avtar,
          }),
        });
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 408) {
          return Swal.fire({
            icon: "warning",
            text: "Username already taken. Please try another one.",
          });
        } else {
          return Swal.fire({
            icon: "Warning",
            text: "User with same email already exists. Please try another one.",
          });
        }
      })
      .then((data) => {
        const { message, id } = data;
        Swal.fire({
          icon: "success",
          text: message,
        });
        navigate(`/verify/${id}`);
        setlogin(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.message || "An error occurred. Please try again later.",
        });
      });
  };

  const loginuser = (e) => {
    e.preventDefault();
    if (!loginemail || !loginpassword) {
      return Swal.fire({
        icon: "warning",
        text: "Please fill all the fields",
      });
    } else if (!validator.isEmail(loginemail)) {
      return Swal.fire({
        icon: "warning",
        text: "Please Enter Valid email",
      });
    }
    fetch(`/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginemail,
        password: loginpassword,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            const { other } = data;

            if (other.twoFa) {
              navigate(`/verify/${other._id}`);
              Swal.fire({
                icon: "success",
                text: "Otp sent for user login",
              });
            } else {
              localStorage.setItem("userInfo", JSON.stringify(other));
              dispatch(Login(other));
              Swal.fire({
                icon: "success",
                text: "User Logged In Successfully",
              });
              navigate("/home");
              window.location.reload();
            }
          });
        } else if (res.status === 401) {
          return Swal.fire({
            icon: "error",
            text: "Invalid Credentials",
          });
        } else {
          return Swal.fire({
            icon: "error",
            text: "User is not verified. Please verify your email.",
          });
        }
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          text: "An error occurred. Please try again later.",
        });
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
            {login ? (
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15 spans">
                    Log in to your account
                  </span>
                  <form id="stripe-login">
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        value={loginemail}
                        onChange={(e) => setloginemail(e.target.value)}
                      />
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">Password</label>
                        <div className="reset-pass">
                          <a style={{ cursor: "pointer" }}>
                            <Link to="/forgot">Forgot your password?</Link>
                          </a>
                        </div>
                      </div>
                      <input
                        type="password"
                        value={loginpassword}
                        onChange={(e) => setloginpassword(e.target.value)}
                      />
                    </div>
                    <div
                      className="field padding-bottom--24"
                      style={{ marginTop: "1rem" }}
                    >
                      <input
                        type="submit"
                        onClick={loginuser}
                        name="submit"
                        value="Login"
                      />
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <span className="padding-bottom--15 spans">
                      Create a new account
                    </span>
                    <form id="stripe-login">
                      <div className="field padding-bottom--12">
                        <label htmlFor="email">Username</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </div>
                      <div className="field padding-bottom--12">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={validEmail}
                        />
                      </div>
                      <div className="field padding-bottom--12">
                        <div className="grid--50-50">
                          <label htmlFor="password">Password</label>
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                      <div className="field padding-bottom--12">
                        <div className="grid--50-50">
                          <label htmlFor="password">Profile pic</label>
                        </div>
                        <input
                          type="file"
                          onChange={(e) => setimage(e.target.files[0])}
                        />
                      </div>
                      <div
                        className="field padding-bottom--12"
                        style={{ marginTop: "1rem" }}
                      >
                        <input
                          type="submit"
                          onClick={register}
                          name="submit"
                          value="Register"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            <div className="footer-link padding-top--24">
              <span
                onClick={flip}
                style={{ cursor: "pointer" }}
                className="footer-link-span spans"
              >
                {login ? (
                  <>
                    Don't have an account?{" "}
                    <a style={{ color: "#e1306c" }}>Sign up</a>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <a style={{ color: "#e1306c" }}>Log in</a>
                  </>
                )}
              </span>

              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                <span
                  style={{ display: "inline-flex", alignItems: "center" }}
                  className="footer-span"
                >
                  <a
                    href="https://github.com/Yashkhamkar"
                    target="_blank"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AiFillGithub size={24} />
                    <span style={{ marginLeft: "5px" }}>
                      Made by Yashkhamkar
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
