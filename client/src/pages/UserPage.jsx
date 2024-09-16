import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import ErrorPage from "./ErrorPage";

function UserPage() {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const { id } = useParams();

  console.log("route id: " + id);

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!userIsLoggedIn && id !== "login" && id !== "register") {
      navigate("/user/login");
    }
  }, [userIsLoggedIn, id, navigate]);

  if (userIsLoggedIn) {
    return (
      <main>
        <h1>Welcome User!</h1>
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
