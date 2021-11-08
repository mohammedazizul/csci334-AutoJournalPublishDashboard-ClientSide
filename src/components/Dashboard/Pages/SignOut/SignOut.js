import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";

const SignOut = () => {
  let history = useHistory();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const backToSignIn = () => {
    setLoggedInUser({
      username: "",
      personID: "",
      email: "",
      password: "",
      type: -1,
      dob: "",
      isLoggedIn: false,
    });
    console.log("User Signed Out!");
    history.push("/");
  };
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <p>You are logged in as {loggedInUser.username}</p>
      <button onClick={backToSignIn}>Click to Confirm Sign Out</button>
    </div>
  );
};

export default SignOut;
