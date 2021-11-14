import React from "react";

const NewReviewerData = (props) => {
  const { dob, areaOfExpertise, username, personID } = props.data;

  // real age calculate
  const cal_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age_now--;
    }
    return age_now;
  }

  const approve = (e) => {
    e.preventDefault();
    props.setReviewerID(personID);
    props.handleApprovePopUpOpen();
  }

  const reject = (e) => {
    e.preventDefault();
    props.setReviewerID(personID);
    props.handleRejectPopUpOpen();
  }

  return (
    <tbody>
      <tr>
        <td>{username}</td>
        <td>{cal_age(dob)}</td>
        <td>{areaOfExpertise}</td>
        <td>
          <input type="submit" value="Approve" onClick={approve}></input>
          <input type="submit" value="Reject" onClick={reject}></input>
        </td>
      </tr>
    </tbody>
  );
};

export default NewReviewerData;