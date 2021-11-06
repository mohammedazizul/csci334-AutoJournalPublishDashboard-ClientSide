import React from "react";

const PendingModify = (props) => {
  const { documentID, title, topic, dateOfSubmission, documentStatus, editorRemarks } = props.data;

  const handleSelectDocID = (e) => {
    let radio = e.target.checked;

    if ( radio === true) {
      if (editorRemarks == null) {
        const array = [documentID, title, topic, "No Comments"];
        props.setSelectedData(array);
        props.setSelectedError({
          display: "none",
        })
      } else {
        const array = [documentID, title, topic, editorRemarks];
        props.setSelectedData(array);
        props.setSelectedError({
          display: "none",
        })
      }
    }
    else {
      const array = [];
      props.setSelectedData(array);
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
      </tr>
    </tbody>
  );
};

export default PendingModify;