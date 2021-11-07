import React from "react";

const EditorData = (props) => {
  const { documentID, title, topic, dateOfSubmission, authorUsername, documentStatus } = props.data;

  return (
    <tbody>
      <tr>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{authorUsername}</td>
        <td>{documentStatus}</td>
        <td><button>View</button></td>
      </tr>
    </tbody>
  );
};

export default EditorData;