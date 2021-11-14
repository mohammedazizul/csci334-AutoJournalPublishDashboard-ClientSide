import React from "react";
import "./style.css";
 
const ApprovePopUp = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleApprovePopUpClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default ApprovePopUp;