import React from "react";
import { useState } from "react/cjs/react.development";

const AuthorData = (props) => {
  const { documentID, title, topic, dateOfSubmission, documentStatus } = props.data;

  const handleViewDocument = (e) => {
    e.preventDefault();
    props.setViewDocument(documentID);
    document.getElementById("docform").submit();
  }

  return (
    <tbody>
      <tr>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{documentStatus}</td>
        <td><button onClick={props.handleOpen}>View</button></td>
      </tr>
    </tbody>
  );
};

export default AuthorData;
