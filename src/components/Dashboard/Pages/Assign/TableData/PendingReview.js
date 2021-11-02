import React from "react";

const PendingReview = (props) => {
  const { documentID, title, topic, pages, dateOfSubmission, username, status } = props.data;

  return (
    <tbody>
      <tr>
        <td><input type="checkbox"></input></td>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{pages}</td>
        <td>{dateOfSubmission}</td>
        <td>{username}</td>
        <td>{status}</td>
      </tr>
    </tbody>
  );
};

export default PendingReview;