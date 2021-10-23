import React from "react";
import { useHistory } from "react-router";

const SignOut = () => {
  let history = useHistory();

  const backToSignIn = () => {
    history.push("/");
  };
  return (
    <div>
      <button onClick={backToSignIn}>Click to Confirm Sign Out</button>
    </div>
  );
};

export default SignOut;
