import React from "react";

const ReviewerData = (props) => {
  const { dob, areaOfExpertise, username } = props.data;

  return (
    <tbody>
      <tr>
        <td>{username}</td>
        <td>{dob}</td>
        <td>{}</td>
        <td>{}</td>
        <td>{areaOfExpertise}</td>
        <td>{}</td>
      </tr>
    </tbody>
  );
};

export default ReviewerData;