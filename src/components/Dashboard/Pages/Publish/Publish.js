import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import Paid from "./TableData/Paid";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Publish = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainPublish, setMainPublish] = useState(true);

  const [isRecordJournalInfo, setRecordJournalInfo] = useState(false);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isRecordJournalInfoDashboard = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      setMainPublish(false);

      setRecordJournalInfo(true);

      setSelectedError({
        display: "none",
      });
    }
  }

  const isMainPublishDashboard = () => {
    setMainPublish(true);

    setRecordJournalInfo(false);

    setDocumentID(null);

    setJournalIssue(null);

    setJournalIssueError({
      display: "none",
    });
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const paidDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Paid`;
  const [paid, setPaid] = useState([]);
  const [updatePaidTable, setUpdatePaidTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updatePaidTable) {
      fetch(paidDataUrl, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          setPaid(data);
          if (data) {
            setUpdatePaidTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[paidDataUrl, updatePaidTable]);

  const [func] = useState("publish");
  const [documentID, setDocumentID] = useState(null);
  const [journalIssue, setJournalIssue] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("function", func);
  formData.append("documentID", documentID);
  formData.append("editorID", loggedInUser.personID);
  formData.append("journalIssue", journalIssue);

  const processPublish = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

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
        setUpdatePaidTable(true);
        isMainPublishDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [journalIssueError, setJournalIssueError] = useState({
    display: "none",
  });

  const handleJournalIssue = (e) => {
    let journal = e.target.value;
    setJournalIssue(journal);

    if (journalIssue !== "") {
      setJournalIssueError({
        display: "none",
      });
    }
  }

  const handlePublish = (e) => {
    if (journalIssue === null || journalIssue === "") {
      e.preventDefault();
      setJournalIssueError({
        display: "",
        color: "red",
      });
    } else {
      e.preventDefault();
      processPublish();
      alert("Publish Successfully");
    }
  }

  const [viewDocument, setViewDocument] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const downloadDocument = (e) => {
    e.preventDefault();
    document.getElementById("downloadDocumentForm").submit();
  }

  return (
    <div>
      {isMainPublish?
        <div className="mainPublishDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript publish</h3>
          </div>

          <div
            style={{
              paddingTop: "10px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <form method="GET">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {paid.map((item) => (
                  <Paid
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setDocumentID={setDocumentID}
                    setSelectedError={setSelectedError}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isRecordJournalInfoDashboard}>Publish</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
            <span style={selectedError}>
              Please select a manuscript to publish
            </span>
          </div>
        </div>:null
      }

      {isRecordJournalInfo?
        <div className="recordJournalInformationDiv">
          <div>
            <label>Dashboard / Record Journal Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Record Journal Information</h3>
          </div>

          <div className="recordJournalInfoDiv">
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>Print date</td>
                    <td><input type="text" placeholder={new Date().toLocaleString().substr(0, 10)} readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Journal Issue</td>
                    <td>
                      <textarea onChange={handleJournalIssue}></textarea>
                      <br />
                      <span style={journalIssueError}>
                        Please enter the journal issue
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="button" value="Confirm" onClick={handlePublish}></input>
                <input type="button" value="Cancel" onClick={isMainPublishDashboard}></input>
              </div>
            </form>
          </div>
        </div>:null}

        <div>
        {isOpen && <ViewDocumentPopUp
          content={<>
            <table className="downloadManuscriptTable">
              <tbody>
                <tr>
                  <td>No. : </td>
                  <td>{viewDocument[0]}</td>
                  <td>Submit Date :</td>
                  <td>{viewDocument[1]}</td>
                </tr>
                <tr>
                  <td>Title :</td>
                  <td>{viewDocument[2]}</td>
                  <td>Topic :</td>
                  <td>{viewDocument[3]}</td>
                </tr>
                <tr>
                  <td>Author Name :</td>
                  <td>{viewDocument[4]}</td>
                  <td>Author Remarks :</td>
                  <td><textarea value={viewDocument[5]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Editor Name :</td>
                  <td>{viewDocument[6]}</td>
                  <td>Editor Remarks :</td>
                  <td><textarea value={viewDocument[7]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Status :</td>
                  <td>{viewDocument[8]}</td>
                  <td>Print Date :</td>
                  <td>{viewDocument[9]}</td>
                </tr>
                <tr>
                  <td>Journal Issue :</td>
                  <td colSpan="3">{viewDocument[10]}</td>
                </tr>
                <tr>
                  <td colSpan="4"><button onClick={downloadDocument}>Download</button></td>
                </tr>
              </tbody>
            </table>
            <form target="_blank" method="post" id="downloadDocumentForm" action="http://localhost/jess-backend/processes/downloadDocument.php">
              <input type="hidden" name="documentID" id="documentID" value={viewDocument[0]}/>
            </form>
          </>}
          handleClose={handleOpen}
        />}
      </div>
    </div>
  );
};

export default Publish;