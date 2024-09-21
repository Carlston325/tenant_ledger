import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const user_Regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const email_Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

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

  //email validation
  useEffect(() => {
    const result = email_Regex.test(email);
    console.log("Valid email: " + result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

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

  // Submit Form
  async function handleSubmit(e) {
    e.preventDefault();

    const v1 = user_Regex.test(user);
    const v2 = email_Regex.test(email);
    const v3 = pwd_Regex.test(pwd);
    if (!v1) {
      setErrMsg(
        "Invalid username. Must be 4-24 characters long and start with a letter."
      );
      errRef.current.focus();
      return;
    }

    if (!v2) {
      setErrMsg("Invalid email format. Please provide a valid email.");
      errRef.current.focus();
      return;
    }

    if (!v3) {
      setErrMsg(
        "Invalid password. Must be 8-24 characters long, include uppercase, lowercase, a number, and a special character."
      );
      errRef.current.focus();
      return;
    }

    if (pwd !== matchPwd) {
      setErrMsg("Passwords do not match.");
      errRef.current.focus();
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      <section id="registerSection" className="userAuth">
        <p
          ref={errRef}
          tabIndex="-1"
          className={errMsg ? "err" : "hide"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register Landlord</h1>
        {success ? (
          <>
            <h3>Account created</h3>
          </>
        ) : (
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

            {/* Email */}
            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <CheckIcon style={{ color: "rgb(122 221 0)" }} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <ClearIcon style={{ color: "red" }} />
              </span>
            </label>
            <input
              style={emailFocus ? focus_STYLE : null}
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => {
                setEmailFocus(true);
              }}
              onBlur={() => {
                setEmailFocus(false);
              }}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              <ErrorIcon />
              Must be a valid Email!.
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
              className={
                matchPwdFocus && !validMatch && matchPwd
                  ? "instructions"
                  : "hide"
              }
            >
              <ErrorIcon /> Must match password input field!
            </p>

            {/* Submit Button */}
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Already Registered */}
        <p>
          Already have an account! <br />
          <a href="#/user/login">Sign In</a>
        </p>
      </section>
    </>
  );
}

export default Register;
