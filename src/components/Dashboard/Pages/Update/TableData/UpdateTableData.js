import React from "react";

const UpdateTableData = (props) => {
  const { documentID, title, topic, dateOfSubmission, authorUsername, documentStatus } = props.data;

  return (
    <tbody>
      <tr>
        <td><input type="checkbox"></input></td>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{authorUsername}</td>
        <td>{documentStatus}</td>
      </tr>
    </tbody>
  );
};

export default UpdateTableData;