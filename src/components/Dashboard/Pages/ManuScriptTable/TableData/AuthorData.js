import React from "react";

const AuthorData = (props) => {
  const { documentID, title, topic, dateOfSubmission, documentStatus } = props.data;

  return (
    <tbody>
      <tr>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{documentStatus}</td>
      </tr>
    </tbody>
  );
};

export default AuthorData;
