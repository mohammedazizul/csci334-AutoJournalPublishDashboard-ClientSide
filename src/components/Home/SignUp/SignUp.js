import "./SignUp.css";
import React from "react";
import Logo from "../../Logo/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelopeOpen,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  return (
    <div className="SignupMainDiv" id="bgsetting">
      <div className="leftPart">
        <img src={Logo} alt="logo" />
      </div>
      <div className="rightPart">
        <form>
          <label>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp;
          </label>
          <input type="text" placeholder="Full Name" />
          <br />
          <br />

          <label>
            <FontAwesomeIcon icon={faEnvelopeOpen} />
            &nbsp;&nbsp;
          </label>
          <input type="text" placeholder="Email Address" />
          <br />
          <br />

          <label>
            <FontAwesomeIcon icon={faLock} />
            &nbsp;&nbsp;
          </label>
          <input type="password" placeholder="Password" />
          <br />
          <br />

          <label>
            <FontAwesomeIcon icon={faLock} />
            &nbsp;&nbsp;
          </label>
          <input type="password" placeholder="Confirm Password" />
          <br />
          <br />

          <select>
            <option value="DEFAULT" disabled>
              Select your role
            </option>
            <option value="Author">Author</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <br />
          <br />

          <select>
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
          >
            <FontAwesomeIcon icon={faUserPlus} />
            &nbsp;&nbsp; Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
