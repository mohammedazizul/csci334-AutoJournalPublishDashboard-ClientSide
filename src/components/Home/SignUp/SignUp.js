import "./SignUp.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Logo from "../../Logo/logo512.png";
import {
  faUser,
  faEnvelopeOpen,
  faLock,
  faUserPlus,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SignUp = () => {
  let history = useHistory();

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [pwdConfirm, setPwdConfirm] = useState(null);
  const [dob, setDob] = useState(null);
  const [role, setRole] = useState(null);
  const [area, setArea] = useState(null);

  // creating data to send to BE
  let formData = new FormData();
  formData.append("username", userName);
  formData.append("email", userEmail);
  formData.append("password", pwd);
  formData.append("dob", dob);
  formData.append("type", role);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  const processSignUp = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/signUp.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.success);
        console.log("Server Response: ", data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  // POST COMPLETED

  const [nameError, setNameError] = useState({
    display: "none",
  });
  const [emailError, setEmailError] = useState({
    display: "none",
  });
  const [PwdError, setPwdError] = useState({
    display: "none",
  });
  const [PwdsError, setPwdsError] = useState({
    display: "none",
  });
  const [AOE, setAOE] = useState({
    display: "none",
  });

  const handleUserName = (e) => {
    let userName = e.target.value;
    setUserName(userName);

    if (userName !== "") {
      setNameError({
        display: "none",
      });
    }
  };

  const handleUserEmail = (e) => {
    let userEmail = e.target.value;
    setUserEmail(userEmail);

    if (userEmail !== "") {
      setEmailError({
        display: "none",
      });
    }
  };

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

  const handleRole = (e) => {
    let role = e.target.value;
    setRole(role);

    if (role === "2") {
      setAOE({
        display: "",
      });
    }
    if (role === "0") {
      setAOE({
        display: "none",
      });
    }
    if (role === "1") {
      setAOE({
        display: "none",
      });
    }
  };

  const handleAOE = (e) => {
    let area = e.target.value;
    setArea(area);
  };

  const handleSubmit = (e) => {
    let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (userName === null) {
      e.preventDefault();
      setNameError({
        display: "",
        color: "red",
      });
    } else if (userEmail === null) {
      e.preventDefault();
      setEmailError({
        display: "",
        color: "red",
      });
    } else if (!re.test(userEmail)) {
      e.preventDefault();
      alert("Email Format: ...@...com !");
    } else if (pwd === null) {
      e.preventDefault();
      setPwdError({
        display: "",
        color: "red",
      });
    } else if (pwdConfirm !== pwd) {
      e.preventDefault();
      setPwdsError({
        display: "",
        color: "red",
      });
    } else if (role === null) {
      alert("Please specify your role!");
    } else if ((area === null) & (role === "2")) {
      alert("Please specify your area of expertise!");
    } else {
      // console.log("user name: ", userName);
      // console.log("user email: ", userEmail);
      // console.log("user role: ", role);
      // console.log("user dob: ",dob);
      // console.log("user pass: ", pwd);
      // console.log("user role: ", role);
      // console.log("user area: ", area);
      if (role === "2") {
        console.log(area);
        setRole(role + "-" + area);
      }
      processSignUp();
      // alert("You have signed in successfully!");
      history.push("/");
    }
  };

  return (
    <div className="SignupMainDiv" id="bgsetting">
      <div className="leftPart">
        <img src={Logo} alt="logo" />
      </div>
      <div className="rightPart">
        <label>
          <FontAwesomeIcon icon={faUser} />
          &nbsp;&nbsp;
        </label>
        <input type="text" placeholder="Full Name" onChange={handleUserName} />
        <br />
        <span style={nameError}>Please enter your name</span>
        <br />
        <br />
        <label>
          <FontAwesomeIcon icon={faEnvelopeOpen} />
          &nbsp;&nbsp;
        </label>
        <input
          type="text"
          placeholder="Email Address"
          onChange={handleUserEmail}
        />
        <br />
        <span style={emailError}>Please enter your email</span>
        <br />
        <br />
        <label>
          <FontAwesomeIcon icon={faCalendarDay} />
          &nbsp;&nbsp;
        </label>
        <input
          type="date"
          placeholder="date of birth"
          onChange={(e) => setDob(e.target.value)}
        />
        (DOB)
        <br />
        <br />
        <br />
        <label>
          <FontAwesomeIcon icon={faLock} />
          &nbsp;&nbsp;
        </label>
        <input type="password" placeholder="Password" onChange={handlePwd} />
        <br />
        <span style={PwdError}>Please enter the password</span>
        <br />
        <br />
        <label>
          <FontAwesomeIcon icon={faLock} />
          &nbsp;&nbsp;
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={handlePwdConfirm}
        />
        <br />
        <span style={PwdsError}>Password does not match</span>
        <br />
        <br />
        <select onChange={handleRole}>
          <option value="DEFAULT" disabled>
            Select your role
          </option>
          <option value="1">Author</option>
          <option value="0">Editor</option>
          <option value="2">Reviewer</option>
        </select>
        <br />
        <br />
        <select style={AOE} onChange={handleAOE}>
          <option value="DEFAULT" disabled>
            Area of expertise
          </option>
          <option value="Science">Science</option>
          <option value="Education">Education</option>
          <option value="Social Study">Social Study</option>
          <option value="Medicine">Medicine</option>
          <option value="History">History</option>
          <option value="Others">Others</option>
        </select>
        <br />
        <p>By signing up, I accept the Terms &#38; Privacy Policies</p>
        <br />
        <button
          className="button"
          type="submit"
          style={{ backgroundColor: "#bae9f4" }}
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          &nbsp;&nbsp; Sign up
        </button>
        <Link to="/sign-in">
          <p>Already have an account, Click to Sing in</p>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
