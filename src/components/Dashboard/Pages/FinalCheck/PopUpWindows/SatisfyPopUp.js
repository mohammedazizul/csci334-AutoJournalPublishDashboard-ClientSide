import React from "react";
import "./style.css";
 
const SatisfyPopUp = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleSatisfyPopUpClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default SatisfyPopUp;