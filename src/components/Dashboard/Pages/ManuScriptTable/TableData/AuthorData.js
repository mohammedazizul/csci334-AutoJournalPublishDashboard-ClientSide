import React from "react";

const AuthorData = (props) => {
  const { documentID, title, topic, dateOfSubmission, documentStatus } =
    props.data;

  return (
    <tbody>
      <tr>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{documentStatus}</td>
        <td>
          {/* suggestions from Rayan  */}
          {/* on click switch to view page display all info about single manuscript and allow to download */}
          <button>VIEW</button>
        </td>
      </tr>
    </tbody>
  );
};

export default AuthorData;
