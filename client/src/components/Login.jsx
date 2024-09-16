import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [userLoginDetails, setUserLoginDetails] = useState({});

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userLoginDetails
      );

      if (response.data.success) {
        const id = response.data.userId;

        navigate("/");
      } else {
        setErrMsg(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setErrMsg("An error occurred. Please try again later.");
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <p
        ref={errRef}
        className={errMsg ? "err-msg" : "hide-msg"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      {/* <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
        />

        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          id="pwd"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {
            setPwdFocus(true);
          }}
          onBlur={() => {
            setPwdFocus(false);
          }}
        />

        <button type="submit" onClick={handleLogin}>SUBMIT</button>
      </form> */}
      <a href="#/user/register">Register Account!</a>
    </main>
  );
}

export default Login;
