import React from "react";
import "./style.css";
 
const RejectPopUp = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleRejectPopUpClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default RejectPopUp;