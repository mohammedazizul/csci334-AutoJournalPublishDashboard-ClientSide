import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { faAlignJustify, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../../App";
import NewDocumentData from "./TableData/NewDocumentData";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Review = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainReview, setMainReview] = useState(true);

  const [isRecordInformation, setRecordInformation] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isRecordInformationDashboard = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      setMainReview(false);

      setRecordInformation(true);

      setScope("Within Scope");
    }
  };

  const isMainReviewDashboard = () => {
    setMainReview(true);

    setRecordInformation(false);

    setSelectedData(null);

    setDocumentID(null);

    setAltDocID(null);

    setEditorRemarks(null);

    setScope("Out of scope");

    setDocumentIDError({
      display: "none",
    });

    setEditorRemarksError({
      display: "none",
    });
  };

  // STANDARD GET REQUEST
  const newDocumentDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=New`;
  const [newDocumentData, setNewDocumentData] = useState([]);
  const [updateNewDocumentTable, setUpdateNewDocumentTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateNewDocumentTable) {
      fetch(newDocumentDataUrl, {
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
          setNewDocumentData(data);
          if (data) {
            setUpdateNewDocumentTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [newDocumentDataUrl, updateNewDocumentTable]);

  const [func] = useState("determinescope");
  const [documentID, setDocumentID] = useState(null);
  console.log(documentID);
  const [altDocID, setAltDocID] = useState(null);
  console.log(altDocID);
  const [scope, setScope] = useState("Out of scope");
  const [editorRemarks, setEditorRemarks] = useState(null);
  console.log(editorRemarks);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formDataApprove = new FormData();
  formDataApprove.append("function", func)
  formDataApprove.append("scope", scope);
  formDataApprove.append("editorID", loggedInUser.personID);
  formDataApprove.append("documentID", altDocID);
  formDataApprove.append("newDocumentID", documentID);
  formDataApprove.append("editorRemarks", editorRemarks);

  const processUpdateEditorRemarks = () => {
    // to Display the key/value pairs
    for (var pair of formDataApprove.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formDataApprove,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdateNewDocumentTable(true);
        isMainReviewDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const[documentIDError, setDocumentIDError] = useState({
    display: "none",
  })
  const [editorRemarksError, setEditorRemarksError] = useState({
    display: "none",
  });

  const handleDocumentID = (e) => {
    let docID = e.target.value;
    setDocumentID(docID);

    if (docID !== "") {
      setDocumentIDError({
        display: "none",
      })
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

  const handleUpdateEditorRemarks = (e) => {
    if (scope === "Out of scope") {
      if (documentID === null || documentID === "") {
        e.preventDefault();
        setSelectedError({
          display: "",
          color: "red",
        });
      } else {
        e.preventDefault();
        processUpdateEditorRemarks();
        alert("Update Successfully");
      }
    } else {
      if (documentID === null || documentID === "") {
        e.preventDefault();
        setDocumentIDError({
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
        processUpdateEditorRemarks();
        alert("Update Successfully");
        document.getElementById("updateEditorRemarksForm").reset();
      }
    }
  }

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formDataReject = new FormData();
  formDataReject.append("function", func)
  formDataReject.append("scope", scope);
  formDataReject.append("editorID", loggedInUser.personID);
  formDataReject.append("documentID", selectedData);

  const processUpdateReject = () => {
    // to Display the key/value pairs
    for (var pair of formDataReject.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formDataReject,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdateNewDocumentTable(true);
        isMainReviewDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleUpdateReject = (e) => {
    if (selectedData === null || selectedData === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      e.preventDefault();
      processUpdateReject();
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
      {isMainReview ? (
        <div className="mainReviewDiv">
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
              &nbsp;Select a manuscript to review
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
                {newDocumentData.map((item) => (
                  <NewDocumentData
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setDocumentID={setDocumentID}
                    setAltDocID={setAltDocID}
                    setSelectedData={setSelectedData}
                    setSelectedError={setSelectedError}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button
                className="btn"
                id="trueBtn"
                onClick={isRecordInformationDashboard}
              >
                Within Scope
              </button>
              <button className="btn" id="falseBtn" onClick={handleUpdateReject}>
                Out of Scope
              </button>
            </form>
            <span style={selectedError}>
              Please select a manuscript to determine whether to be accepted
            </span>
          </div>
        </div>
      ) : null}

      {isRecordInformation ? (
        <div className="recordInformationDiv">
          <div>
            <label>Dashboard / Record Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faPenNib} />
              &nbsp;Record Information
            </h3>
          </div>

          <div className="recordInfoFormDiv">
            <form method="POST" id="updateEditorRemarksForm">
              <table>
                <tbody>
                  <tr>
                    <td>No .</td>
                    <td>
                      <input type="text" defaultValue={documentID} onChange={handleDocumentID}></input>
                      &nbsp;
                      <span style={documentIDError}>Please enter the documentID</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Comments *</td>
                    <td>
                      <textarea onChange={handleEditorRemarks}></textarea>
                      <br />
                      <span style={editorRemarksError}>
                        Please enter your remarks
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="button" value="Upload" onClick={handleUpdateEditorRemarks}></input>
                <input
                  type="button"
                  value="Cancel"
                  onClick={isMainReviewDashboard}
                ></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *.</span>
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

export default Review;
