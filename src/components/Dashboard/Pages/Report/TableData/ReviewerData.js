import React from "react";

const ReviewerData = (props) => {
  const { dob, areaOfExpertise, status, username } = props.data;

  return (
    <tbody>
      <tr>
        <td>{username}</td>
        <td>{dob}</td>
        <td>{}</td>
        <td>{}</td>
        <td>{areaOfExpertise}</td>
        <td>{status}</td>
      </tr>
    </tbody>
  );
};

export default ReviewerData;