import React from "react";

const Paid = (props) => {
  const { documentID, dateOfSubmission, title, topic, authorUsername, authorRemarks, editorUsername, editorRemarks, documentStatus, printDate, journalIssue } = props.data;
  
  const handleSelectDocID = (e) => {
    let radio = e.target.checked;

    if (radio === true) {
      props.setDocumentID(documentID);
      props.setSelectedError({
        display: "none",
      });
    }
  }

  const handleDownloadDoc = (e) => {
    e.preventDefault();

    if (authorRemarks === null || authorRemarks === "") {
      const array = [documentID, dateOfSubmission, title, topic, authorUsername, "", editorUsername, editorRemarks, documentStatus, printDate, journalIssue];
      props.setViewDocument(array);
      props.handleOpen();
    } else if (editorRemarks === null || authorRemarks === "") {
      const array = [documentID, dateOfSubmission, title, topic, authorUsername, authorRemarks, editorUsername, "", documentStatus, printDate, journalIssue];
      props.setViewDocument(array);
      props.handleOpen();
    } else if ((authorRemarks === null || authorRemarks === "") && (editorRemarks === null || authorRemarks === "")) {
      const array = [documentID, dateOfSubmission, title, topic, authorUsername, "", editorUsername, "", documentStatus, printDate, journalIssue];
      props.setViewDocument(array);
      props.handleOpen();
    } else {
      const array = [documentID, dateOfSubmission, title, topic, authorUsername, authorRemarks, editorUsername, editorRemarks, documentStatus, printDate, journalIssue];
      props.setViewDocument(array);
      props.handleOpen();
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
        <td>{authorUsername}</td>
        <td>{documentStatus}</td>
        <td><button onClick={handleDownloadDoc}>View</button></td>
      </tr>
    </tbody>
  );
};

export default Paid;