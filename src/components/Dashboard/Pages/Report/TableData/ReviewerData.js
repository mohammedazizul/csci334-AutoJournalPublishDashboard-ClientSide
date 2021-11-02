import React from "react";

const ReviewerData = (props) => {
  const { dob, areaOfExpertise, username } = props.data;

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

  return (
    <tbody>
      <tr>
        <td>{username}</td>
        <td>{cal_age(dob)}</td>
        <td>{}</td>
        <td>{}</td>
        <td>{areaOfExpertise}</td>
        <td>{}</td>
      </tr>
    </tbody>
  );
};

export default ReviewerData;