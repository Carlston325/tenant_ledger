import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// components
import Login from "../components/Login";
import Register from "../components/Register";
import ErrorPage from "./ErrorPage";
import DisplayDetails from "../components/DisplayDetails";

function UserPage() {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState({
    f_name: "Carlston",
    l_name: "Rebelo",
    d_o_b: "25 / 08 / 2001",
    email: "crebel325@gmail.com",
    username: "carlston325",
    pwd: "**********",
    phone_number: "07868283308",
  });

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!userIsLoggedIn && id !== "login" && id !== "register") {
      navigate("/user/login");
    }
  }, [userIsLoggedIn, id, navigate]);
  if (userIsLoggedIn) {
    return (
      <main>
        <h1>
          Welcome! <br /> {userDetails.f_name}
        </h1>
      </main>
    );
  }

  return (
    <main>
      {id === "login" && <Login />}
      {id === "register" && <Register />}
    </main>
  );
}

export default UserPage;
