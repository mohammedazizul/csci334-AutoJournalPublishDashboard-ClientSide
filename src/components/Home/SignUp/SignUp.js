import "./SignUp.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelopeOpen,
  faLock,
  faUserPlus,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  let history = useHistory();

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [pwdConfirm, setPwdConfirm] = useState(null);
  const [dob, setDob] = useState(null);
  const [role, setRole] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  const [responseData, setResponseData] = useState(false);

  // creating data to send to BE
  let formData = new FormData();
  formData.append("username", userName);
  formData.append("email", userEmail);
  formData.append("password", pwd);
  formData.append("dob", dob);
  formData.append("type", 1);

  const processSignUp = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/api/create/person.php`;

    fetch(urlToPost, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) =>
        // making forceful response in FE if their is
        response.text().then(setResponseData(true))
      )
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

    if (role === "Reviewer") {
      setAOE({
        display: "",
      });
    }
    if (role === "Author") {
      setAOE({
        display: "none",
      });
    }
    if (role === "Editor") {
      setAOE({
        display: "none",
      });
    }
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
    } else {
      console.log("user name: ", userName);
      console.log("user email: ", userEmail);
      console.log("user role: ", role);
      console.log("user dob: ", role);
      console.log("user pass: ", pwd);
      //
      // history.push("/sign-in");
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
          <option value="Author">Author</option>
          <option value="Editor">Editor</option>
          <option value="Reviewer">Reviewer</option>
        </select>
        <br />
        <br />
        <select style={AOE}>
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
          onClick={processSignUp}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          &nbsp;&nbsp; Sign up
        </button>
        {/* response */}
        <div style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}>
          {responseData && "Successfully Signed Up !"}
        </div>
      </div>
    </div>
  );
};
export default SignUp;
