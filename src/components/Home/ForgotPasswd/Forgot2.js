import "./Forgot.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Forgot2 = () => {
  let history = useHistory();
  const [TAC, setTAC] = useState(null);
  const [TACError, setTACError] = useState({
    display: "none",
  });
  const handleTAC = (e) => {
    let TAC = e.target.value;
    setTAC(TAC);

    if (TAC !== "") {
      setTACError({
        display: "none",
      });
    }
  };

  const handleSubmit = (e) => {
    if (TAC === null) {
      e.preventDefault();
      setTACError({
        display: "",
        color: "red",
      });
    }else {
      console.log("TAC: ", TAC);
      //
      history.push("/forgot-password3");
    }
  };

  return (
    <div className="forgotMainDiv" id="bgsetting">
      <br />
      <FontAwesomeIcon
        style={{ fontSize: "100px", color: "purple" }}
        icon={faEnvelopeOpenText}
      />
      <br />
      <br />

      <h1>Check your mail</h1>
      <br />

        <label>TAC: </label>

        <input type="text" placeholder="TAC" onChange={handleTAC}/><br />
        <span style={TACError}>Please enter the 6-digit TAC</span>
        <br />
        <br />

        <button 
              type="submit" 
              style={{ backgroundColor: "#eb94f9" }}
              onClick={handleSubmit}>
          Submit
        </button>
      <br />
      <br />

      <p>
        We have sent a password recovery TAC number to your email. <br />
        <br />
        Did not receive the email? Check your spam filter, or&nbsp;
        <Link to="/forgot-password1">try again</Link>.
      </p>
    </div>
  );
};

export default Forgot2;
