import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const user_Regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const focus_STYLE = {
    outline: "none",
    boxShadow: "0 0 5px #66afe9",
    borderColor: "#66afe9",
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //username validation
  useEffect(() => {
    const result = user_Regex.test(user);
    console.log("Valid username: " + result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //password validation
  useEffect(() => {
    const result = pwd_Regex.test(pwd);
    console.log("Valid password: " + result);
    console.log(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //err msg reset
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <>
      <section id="registerPage">
        <div>
          <p
            ref={errRef}
            className={errMsg ? "err-msg" : "hide-msg"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register Landlord</h1>
          <form>
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
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "hide-msg"
              }
            >
              <ErrorIcon />
              4 - 24 characters. <br /> Must begin with a letter. <br />
              Letters, Numbers, Underscores, Hyphens Allowed
            </p>

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

            <label htmlFor="matchPwd">Confirm Password:</label>
            <input
              type="password"
              id="matchPwd"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setMatchPwd(e.target.value);
              }}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setMatchPwdFocus(true);
              }}
              onBlur={() => {
                setMatchPwdFocus(false);
              }}
            />

            <button type="submit">SUBMIT</button>
          </form>
          <a id="loginToAccount" href="#/user/login">
            Already have an account!
          </a>
        </div>
      </section>
    </>
  );
}

export default Register;
