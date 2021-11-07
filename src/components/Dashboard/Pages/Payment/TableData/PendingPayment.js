import React from "react";

const PendingPayment = (props) => {
  const { documentID, title, topic, dateOfSubmission, documentStatus, price } = props.data;

  const handleSelectDocID = (e) => {
    let radio = e.target.checked;

    if ( radio === true ) {
      const array = [documentID]
      props.setSelectedData(documentID);
      props.setSelectedError({
        display: "none",
      })
    }
  }

  return (
    <tbody>
      <tr>
        <td><input type="radio" name="radioSelected" onChange={handleSelectDocID}></input></td>
        <td>{documentID}</td>
        <td>{title}</td>
        <td>{topic}</td>
        <td>{dateOfSubmission}</td>
        <td>{documentStatus}</td>
        <td>{price}</td>
      </tr>
    </tbody>
  );
};

export default PendingPayment;