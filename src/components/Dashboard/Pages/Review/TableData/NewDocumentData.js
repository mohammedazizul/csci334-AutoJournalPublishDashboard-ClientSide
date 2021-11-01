import React from "react";

const NewDocumentData = (props) => {
  const { documentID, title, topic, pages, dateOfSubmission, authorID, status } = props.data;

  return (
    <tbody>
      <tr>
        <td><input type="checkbox"></input></td>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{pages}</td>
        <td>{dateOfSubmission}</td>
        <td>{authorID}</td>
        <td>{status}</td>
        <td><button>View</button></td>
      </tr>
    </tbody>
  );
};

export default NewDocumentData;