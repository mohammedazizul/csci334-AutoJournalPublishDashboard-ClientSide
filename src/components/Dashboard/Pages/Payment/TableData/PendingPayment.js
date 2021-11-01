import React from "react";

const PendingPayment = (props) => {
  const { documentID, title, topic, pages, dateOfSubmission, status, price } = props.data;

  return (
    <tbody>
      <tr>
        <td><input type="checkbox"></input></td>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{pages}</td>
        <td>{dateOfSubmission}</td>
        <td>{status}</td>
        <td>{price}</td>
      </tr>
    </tbody>
  );
};

export default PendingPayment;