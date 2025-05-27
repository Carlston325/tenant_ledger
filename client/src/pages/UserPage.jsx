import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// components
import Login from "../components/Login";
import Register from "../components/Register";
// import ErrorPage from "./ErrorPage";
// import DisplayDetails from "../components/DisplayDetails";

function UserPage() {
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState([]);

  // Redirect to login if the user is not logged in
  useEffect(() => {
    // if (userDetails) {
    //   setUserIsLoggedIn(true);
    // } else {
    //   setUserIsLoggedIn(false);
    // }

    if (userIsLoggedIn === false && id !== "login" && id !== "register") {
      navigate("/user/login");
    }
  }, [userIsLoggedIn, id, navigate]);

  if (userIsLoggedIn) {
    return (
      <main>
        <h1>Welcome {userDetails.f_name}!</h1>
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
