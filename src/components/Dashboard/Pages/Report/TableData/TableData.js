import React from "react";

const TableData = (props) => {
  const { dob, areaOfExpertise, status, username } = props.data;

  return (
    <div>
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
    </div>
  );
};

export default TableData;
