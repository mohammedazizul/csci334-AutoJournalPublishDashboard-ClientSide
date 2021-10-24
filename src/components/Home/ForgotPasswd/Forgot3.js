import "./Forgot.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faLock, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const Forgot3 = () => {
  let history = useHistory();
  const [pwd, setPwd] = useState(null);
  const [pwdConfirm, setPwdConfirm] = useState(null);

  const [PwdError, setPwdError] = useState({
    display: "none",
  });
  const [PwdsError, setPwdsError] = useState({
    display: "none",
  });

  const handlePwd = (e) => {
    let pwd = e.target.value;
    setPwd(pwd);

    if (pwd !== "") {
      setPwdError({
        display: "none",
      });
    }
  };

  const handlePwdConfirm = (e) => {
    let pwdConfirm = e.target.value;
    setPwdConfirm(pwdConfirm);

    if (pwdConfirm === pwd) {
      setPwdsError({
        display: "none",
      });
    }
  };

  const handleSubmit= (e) => {
    if (pwd === null) {
      e.preventDefault();
      setPwdError({
        display: "",
        color: "red",
      });
    }else if(pwdConfirm !== pwd){
      e.preventDefault();
      setPwdsError({
        display: "",
        color: "red",
      });
    }else {
      console.log("user new password: ", pwd);
      //
      history.push("/sign-in");
    }
  };


  return (
    <div className="forgotMainDiv" id="bgsetting">
        <br/>
        <FontAwesomeIcon style={{fontSize:"100px",color:"purple"}} icon={faExchangeAlt}/><br/><br/>
        <h1>Create New Password</h1>
        <p>
            You new password must be different from the previous used passwords.
        </p><br/><br/>
        <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
        <input type="password"  placeholder="Password" onChange={handlePwd}/><br />
        <span style={PwdError}>Please enter the password</span><br/><br/>


        <label><FontAwesomeIcon icon={faLock}/>&nbsp;&nbsp;</label>
        <input type="password"  placeholder="Confirm Password" onChange={handlePwdConfirm}/><br />
        <span style={PwdsError}>Password does not match</span><br/><br/>


        <button 
                type="submit" 
                style={{backgroundColor:"#eb94f9"}}
                onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSyncAlt}/>&nbsp;&nbsp; Reset Password
        </button>
    </div>
  );
};

export default Forgot3;
