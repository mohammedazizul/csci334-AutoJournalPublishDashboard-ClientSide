import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import {
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../../App";

const Upload = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();

  const goToManuscriptTable = () => {
    document.getElementById("uploadForm").reset();
    history.push("/dashboard/manuscript-table");
  };

  const [docTitle, setDocTitle] = useState(null);
  const [docTopic, setDocTopic] = useState(null);
  const [docTopicSpecify, setDocTopicSpecify] = useState(null);
  const [authorRemarks, setAuthorRemarks] = useState(null);
  const [attachments, setAttachments] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("personID", loggedInUser.personID);
  formData.append("title", docTitle);
  formData.append("topic", docTopic);
  formData.append("authorRemarks", authorRemarks);
  formData.append("document", attachments);

  const processUploadDoc = () => {
    const urlToPost = `http://localhost/jess-backend/processes/uploadDocument.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [docTitleError, setDocTitleError] = useState({
    display: "none",
  });
  const [docTopicError, setDocTopicError] = useState({
    display: "none",
  });
  const [docTopicSpecifyError, setDocTopicSpecifyError] = useState({
    display: "none",
  });
  const [authorRemarksError, setAuthorRemarksError] = useState({
    display: "none",
  });
  const [attachmentsError, setAttachmentsError] = useState({
    display: "none",
  });

  const handleDocTitle = (e) => {
    let title = e.target.value;
    setDocTitle(title);

    if (title !== "") {
      setDocTitleError({
        display: "none",
      });
    }
  };

  const handleDocTopic = (e) => {
    let topic = e.target.value;
    setDocTopic(topic);

    if (topic !== "") {
      setDocTopicError({
        display: "none",
      });
      setDocTopicSpecifyError({
        display: "none",
      });
    } else if (topic === "other") {
      handleDocTopicSpecify();
    }
  };

  const handleDocTopicSpecify = (e) => {
    let topic = e.target.value;
    setDocTopicSpecify(topic);

    if (topic !== "") {
      setDocTopicSpecifyError({
        display: "none",
      })
    }
  }

  const handleAuthorRemarks = (e) => {
    let remarks = e.target.value;
    setAuthorRemarks(remarks);

    if (remarks !== "") {
      setAuthorRemarksError({
        display: "none",
      });
    }
  };

  const handleAttachments = (e) => {
    let attachments = e.target.files[0];
    setAttachments(attachments);

    if (attachments !== "") {
      setAttachmentsError({
        display: "none",
      });
    }
  };
  
  const handleUpload = (e) => {
    if (docTitle === null || docTitle === "") {
      e.preventDefault();
      setDocTitleError({
        display: "",
        color: "red",
      });
    } else if (docTopic === null || docTopic === "") {
      e.preventDefault();
      setDocTopicError({
        display: "",
        color: "red",
      });
    } else if (docTopic === "other" && (docTopicSpecify === null || docTopicSpecify === "")) {
      e.preventDefault();
      setDocTopicSpecifyError({
        display: "",
        color: "red",
      });
    } else if (authorRemarks === null || authorRemarks === "") {
      e.preventDefault();
      setAuthorRemarksError({
        display: "",
        color: "red",
      });
    } else if (attachments === null || attachments === "") {
      e.preventDefault();
      setAttachmentsError({
        display: "",
        color: "red",
      });
    } else {
      processUploadDoc();
      document.getElementById("uploadForm").reset();
    }
  };

  return (
    <div>
      <div>
        <label>Dashboard / Upload</label>
      </div>

      <div
        style={{
          margin: "20px",
        }}
      >
        <h3><FontAwesomeIcon icon={faArrowUp}/>&nbsp;Upload new manuscript</h3>
      </div>

      <div className="uploadDiv">
        <form method="POST" id="uploadForm">
          <table>
            <tbody>
              <tr>
                <td>Title *</td>
                <td colSpan="2">
                  <input type="text" onChange={handleDocTitle}></input>
                  &nbsp;
                  <span style={docTitleError}>Please enter the manuscript title</span>
                </td>
              </tr>
              <tr>
                <td>Topic *</td>
                <td>
                  <select onChange={handleDocTopic}>
                    <option value="">Select Topic</option>
                    <option value="history">History</option>
                    <option value="science">Science</option>
                    <option value="medicine">Medicine</option>
                    <option value="education">Education</option>
                    <option value="social study">Social Study</option>
                    <option value="other">Other</option>
                  </select>
                  <br />
                  <span style={docTopicError}>Please select the manuscript topic</span>
                </td>
                <td>
                  If others, please specify &nbsp; <input type="text" onChange={handleDocTopicSpecify}></input>
                  <br />
                  <span style={docTopicSpecifyError}>Please enter the topic specify</span>
                </td>
              </tr>
              <tr>
                <td>Remarks</td>
                <td colSpan="2">
                  <textarea onChange={handleAuthorRemarks}></textarea>
                  <br />
                  <span style={authorRemarksError}>Please enter your remarks</span>
                </td>
              </tr>
              <tr>
                <td>Attachments *</td>
                <td colSpan="2">
                  <input type="file" onChange={handleAttachments}></input>
                  <br />
                  <span style={attachmentsError}>Please submit the attachments</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="inputBtn">
            <input type="button" value="Submit Manuscript" onClick={handleUpload}></input>
            <input type="button" value="Cancel" onClick={goToManuscriptTable}></input>
          </div>
        </form>
      </div>
      <span>There are required fields in this form marked *.</span>
    </div>
  );
};

export default Upload;