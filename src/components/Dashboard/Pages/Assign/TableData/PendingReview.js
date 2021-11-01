import React from "react";

const PendingReview = (props) => {
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
      </tr>
    </tbody>
  );
};

export default PendingReview;