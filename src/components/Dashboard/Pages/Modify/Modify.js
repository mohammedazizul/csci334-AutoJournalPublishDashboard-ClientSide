import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import PendingModify from "./TableData/PendingModify";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Modify = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainModify, setMainModify] = useState(true);

  const [isManuscriptNo, setModifySelected] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isModifySelected = (e) => {
    if (selectedData !== null) {
      setMainModify(false);

      setModifySelected(true);

      setDocumentID(selectedData[0]);
    } else {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    }
  };

  const isMainManu = () => {
    setMainModify(true);

    setModifySelected(false);

    setSelectedData(null);
  };

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingModifyDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${loggedInUser.personID}&docStatus=Pending Modify`;
  const [pendingModify, setPendingModify] = useState([]);
  const [updateModifyTable, setUpdateModifyTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateModifyTable) {
      fetch(pendingModifyDataUrl, {
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
        setPendingModify(data);
        if (data) {
          setUpdateModifyTable(false);
        }
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
    }
  }, [pendingModifyDataUrl, updateModifyTable]);

  const [documentID, setDocumentID] = useState(null);
  const [authorRemarks, setAuthorRemarks] = useState(null);
  const [attachments, setAttachments] = useState(null);

  // STANDARD POST REQUEST - POST - (NOT WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("documentID", documentID);
  formData.append("personID", loggedInUser.personID);
  formData.append("authorRemarks", authorRemarks);
  formData.append("document", attachments);

  const processUpdateModify = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editDocument.php`;

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
        setUpdateModifyTable(true);
        isMainManu();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [authorRemarksError, setAuthorRemarksError] = useState({
    display: "none",
  });
  const [attachmentsError, setAttachmentsError] = useState({
    display: "none",
  });

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

  const handleUpdateModify = (e) => {
    if (authorRemarks === null || authorRemarks === "") {
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
      processUpdateModify();
      alert("Update Successfully");
      document.getElementById("modifyForm").reset();
    }
  };

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
      {isMainModify ? (
        <div className="mainModifyDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;Select a manuscript to modify
            </h3>
          </div>

          <div
            style={{
              paddingTop: "10px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <form method="GET" id="modifyTable">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {pendingModify.map((item) => (
                  <PendingModify
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setSelectedData={setSelectedData}
                    setSelectedError={setSelectedError}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isModifySelected}>
                Modify Selected
              </button>
              <button
                className="btn"
                id="falseBtn"
                onClick={goToManuscriptTable}
              >
                Cancel
              </button>
            </form>
            <span style={selectedError}>
              Please select a manuscript to modify
            </span>
          </div>
        </div>
      ) : null}

      {isManuscriptNo ? (
        <div className="modifySelectedDiv">
          <div>
            <label>Dashboard / Upload Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faExchangeAlt} />
              &nbsp;Modify pending manuscript
            </h3>
          </div>

          <div className="modifyFormDiv">
            <form method="POST" id="modifyForm">
              <table>
                <tbody>
                  <tr>
                    <td>No.</td>
                    <td>
                      <input
                        type="text"
                        value={selectedData[0]}
                        readOnly
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td>
                      <input
                        type="text"
                        value={selectedData[1]}
                        readOnly
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Topic</td>
                    <td>
                      <input
                        type="text"
                        value={selectedData[2]}
                        readOnly
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Comments</td>
                    <td>
                      <textarea value={selectedData[3]} readOnly></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>Remarks *</td>
                    <td>
                      <textarea placeholder={selectedData[4]} onChange={handleAuthorRemarks}></textarea>
                      <br />
                      <span style={authorRemarksError}>
                        Please enter your remarks
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Attachments *</td>
                    <td>
                      <input type="file" onChange={handleAttachments}></input>
                      <br />
                      <span style={attachmentsError}>
                        Please enter your remarks
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input
                  type="button"
                  value="Update Manuscript"
                  onClick={handleUpdateModify}
                ></input>
                <input
                  type="button"
                  value="Cancel"
                  onClick={isMainManu}
                ></input>
              </div>
            </form>
          </div>
          <span>
            There are required fields in this form marked *. Else fields read only.
          </span>
        </div>
      ) : null}

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

export default Modify;
