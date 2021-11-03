import React from "react";

const AuthorData = (props) => {
  const { documentID, title, topic, pages, dateOfSubmission, status } = props.data;

  return (
    <tbody>
      <tr>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{pages}</td>
        <td>{dateOfSubmission}</td>
        <td>{status}</td>
      </tr>
    </tbody>
  );
};

export default AuthorData;
