import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTableData from "./TableData/UpdateTableData";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Update = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainUpdate, setMainUpdate] = useState(true);

  const [isUpdateInfoTwo, setUpdateInfoTwo] = useState(false);

  const [isUpdateInfoThree, setUpdateInfoThree] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isUpdateInfoDashboard = (e) => {
    if (selectedData === null || selectedData === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      if (reviewArray.length === 2) {
        setMainUpdate(false);

        setUpdateInfoTwo(true);

        setUpdateInfoThree(false);

        setSelectedError({
          display: "none",
        });
      } else if (reviewArray.length === 3) {
        setMainUpdate(false);

        setUpdateInfoTwo(false);

        setUpdateInfoThree(true);

        setSelectedError({
          display: "none",
        });
      }
    }
  }

  const isMainUpdateDashboard = () => {
    setMainUpdate(true);

    setUpdateInfoTwo(false);

    setUpdateInfoThree(false);

    setSelectedData(null);

    setDocumentID(null);

    setAltDocID(null);

    setEditorRemarks(null);

    setDocIDError({
      display: "none",
    });

    setEditorRemarksError({
      display: "none",
    });

    empty();
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const updateDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Compile`;
  const [updateTableData, setUpdateTableData] = useState([]);
  const [updateTable, setUpdateTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateTable) {
      fetch(updateDataUrl, {
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
          setUpdateTableData(data);
          if (data) {
            setUpdateTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[updateDataUrl, updateTable]);

  const [func] = useState("compile");
  const [documentID, setDocumentID] = useState(null);
  const [altDocID, setAltDocID] = useState(null);
  const [editorRemarks, setEditorRemarks] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("function", func);
  formData.append("documentID", altDocID);
  formData.append("newDocumentID", documentID);
  formData.append("editorID", loggedInUser.personID);
  formData.append("editorRemarks", editorRemarks);

  const processUpdate = () => {
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
        setUpdateTable(true);
        isMainUpdateDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // STANDARD GET REQUEST
  const reviewDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7`;
  const [reviewTableData, setReviewTableData] = useState([]);
  const [reviewTable, setReviewTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (reviewTable) {
      fetch(reviewDataUrl, {
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
          setReviewTableData(data);
          if (data) {
            setReviewTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[reviewDataUrl, reviewTable]);

  var reviewArray = reviewTableData.filter(item => item.documentID === (altDocID));

  function empty() {
    reviewArray = [];
  }

  const [docIDError, setDocIDError] = useState({
    display: "none",
  });

  const [editorRemarksError, setEditorRemarksError] = useState({
    display: "none",
  });

  const handleDocID = (e) => {
    let docID = e.target.value;
    setDocumentID(docID);

    if (docID !== "") {
      setDocIDError({
        display: "none",
      });
    }
  }

  const handleEditorRemarks = (e) => {
    let remarks = e.target.value;
    setEditorRemarks(remarks);

    if (remarks !== "") {
      setEditorRemarksError({
        display: "none",
      });
    }
  }

  const handleProcessUpdate = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setDocIDError({
        display: "",
        color: "red",
      });
    } else if (editorRemarks === null || editorRemarks === "") {
      e.preventDefault();
      setEditorRemarksError({
        display: "",
        color: "red",
      });
    } else {
      e.preventDefault();
      processUpdate();
      alert("Update Successfully");
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
      {isMainUpdate?
      <div className="mainUpdateDiv">
        <div>
          <label>Dashboard / Select Manuscript</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to update</h3>
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
              {updateTableData.map((item) => (
                <UpdateTableData
                  key={item.documentMetaDataObject.documentID}
                  data={item.documentMetaDataObject}
                  setDocumentID={setDocumentID}
                  setAltDocID={setAltDocID}
                  setEditorRemarks={setEditorRemarks}
                  setSelectedData={setSelectedData}
                  setSelectedError={setSelectedError}
                  setViewDocument={setViewDocument}
                  handleOpen={handleOpen}
                />
              ))}
            </table>
            <button className="btn" id="trueBtn" onClick={isUpdateInfoDashboard}>Update Info</button>
            <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
          </form>
          <span style={selectedError}>
            Please select a manuscript to update
          </span>
        </div>
      </div>:null
      }

      {isUpdateInfoTwo?
      <div className="updateInformationDiv">
        <div>
          <label>Dashboard / Update Information</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Update Information</h3>
        </div>

        <div className="updateInfoDiv">
          <form method="POST">
            <table>
              <tbody>
                <tr>
                  <td>No. *</td>
                  <td>
                    <input type="text" defaultValue={documentID} onChange={handleDocID}></input>
                    &nbsp;
                    <span style={docIDError}>Please enter the documentID</span>
                  </td>
                </tr>
                <tr>
                  <td>Author Name</td>
                  <td><input type="text" value={selectedData[1]} readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 1 Point #: {reviewArray[0].rating}</td>
                  <td><input type="text" value={reviewArray[0].comment} readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 2 Point #: {reviewArray[1].rating}</td>
                  <td><input type="text" value={reviewArray[1].comment} readOnly></input></td>
                </tr>
                <tr>
                  <td>Editor Remarks *</td>
                  <td>
                    <textarea defaultValue={selectedData[2]} onChange={handleEditorRemarks}></textarea>
                    <br />
                    <span style={editorRemarksError}>Please compile the reviewers feedback into the remarks</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="inputBtn">
              <input type="button" value="Confirm" onClick={handleProcessUpdate}></input>
              <input type="button" value="Cancel" onClick={isMainUpdateDashboard}></input>
            </div>
          </form>
        </div>
        <span>Dynamic field, appear after reviewing only #. The field marked * is the only field can edit.</span>
      </div>:null}

      {isUpdateInfoThree?
      <div className="updateInformationDiv">
        <div>
          <label>Dashboard / Update Information</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Update Information</h3>
        </div>

        <div className="updateInfoDiv">
          <form method="POST">
            <table>
              <tbody>
                <tr>
                  <td>No. *</td>
                  <td>
                    <input type="text" defaultValue={documentID} onChange={handleDocID}></input>
                    &nbsp;
                    <span style={docIDError}>Please enter the documentID</span>
                  </td>
                </tr>
                <tr>
                  <td>Author Name</td>
                  <td><input type="text" value={selectedData[1]} readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 1 Point #: {reviewArray[0].rating}</td>
                  <td><input type="text" value={reviewArray[0].comment} readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 2 Point #: {reviewArray[1].rating}</td>
                  <td><input type="text" value={reviewArray[1].comment} readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 3 Point #: {reviewArray[2].rating}</td>
                  <td><input type="text" value={reviewArray[2].comment} readOnly></input></td>
                </tr>
                <tr>
                  <td>Editor Remarks *</td>
                  <td>
                    <textarea defaultValue={selectedData[2]} onChange={handleEditorRemarks}></textarea>
                    <br />
                    <span style={editorRemarksError}>Please compile the reviewers feedback into the remarks</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="inputBtn">
              <input type="button" value="Confirm" onClick={handleProcessUpdate}></input>
              <input type="button" value="Cancel" onClick={isMainUpdateDashboard}></input>
            </div>
          </form>
        </div>
        <span>Dynamic field, appear after reviewing only #. The field marked * is the field can edit.</span>
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

export default Update;