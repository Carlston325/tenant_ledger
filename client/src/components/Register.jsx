import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const user_Regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_-]).{8,24}$/;

// styles
const focus_STYLE = {
  outline: "none",
  boxShadow: "0 0 5px #66afe9",
  borderColor: "#66afe9",
};

function Register() {
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
    if (pwd === "" && matchPwd === "") {
      setValidMatch(false);
    } else {
      setValidMatch(match);
    }
  }, [pwd, matchPwd]);

  //err msg reset
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    const v1 = user_Regex.test(user);
    const v2 = pwd_Regex.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      <section id="registerSection" className="userAuth">
        <p
          ref={errRef}
          className={errMsg ? "err" : "hide"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register Landlord</h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label htmlFor="username">
            Username:
            <span className={validName ? "valid" : "hide"}>
              <CheckIcon style={{ color: "rgb(122 221 0)" }} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <ClearIcon style={{ color: "red" }} />
            </span>
          </label>
          <input
            style={userFocus ? focus_STYLE : null}
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
              userFocus && user && !validName ? "instructions" : "hide"
            }
          >
            <ErrorIcon />
            4 - 24 characters. <br /> Must begin with a letter. <br />
            Letters, Numbers, Underscores, Hyphens Allowed
          </p>

          {/* Password */}
          <label htmlFor="password">
            Password:
            <span className={validPwd ? "valid" : "hide"}>
              <CheckIcon style={{ color: "rgb(122 221 0)" }} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <ClearIcon style={{ color: "red" }} />
            </span>
          </label>
          <input
            style={pwdFocus ? focus_STYLE : null}
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => {
              setPwdFocus(true);
            }}
            onBlur={() => {
              setPwdFocus(false);
            }}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "hide"}
          >
            <ErrorIcon />
            8 to 24 characters <br /> Must include <strong>
              Uppercase
            </strong>{" "}
            and <strong>Lowercase</strong> letters, a <strong>Number</strong>{" "}
            and a <strong>Special Character</strong>. <br />
            Allowed special characters:{" "}
            <strong>
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="precent">%</span>{" "}
              <span aria-label="hyphen">-</span>{" "}
              <span aria-label="underscore">_</span>
            </strong>
          </p>

          {/* Confirm Password */}
          <label htmlFor="confirm_password">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              <CheckIcon style={{ color: "rgb(122 221 0)" }} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              <ClearIcon style={{ color: "red" }} />
            </span>
          </label>
          <input
            style={matchPwdFocus ? focus_STYLE : null}
            type="password"
            id="confirm_password"
            onChange={(e) => {
              setMatchPwd(e.target.value);
            }}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => {
              setMatchPwdFocus(true);
            }}
            onBlur={() => {
              setMatchPwdFocus(false);
            }}
          />
          <p
            id="confirmnote"
            className={matchPwdFocus && !validMatch ? "instructions" : "hide"}
          >
            <ErrorIcon /> Must match password input field!
          </p>

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account! <br />
          <a href="#/user/login">Sign In</a>
        </p>
      </section>
    </>
  );
}

export default Register;
