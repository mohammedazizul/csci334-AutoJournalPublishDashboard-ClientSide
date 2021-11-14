import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import "./Table.css";
import {
  faAlignJustify,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import PendingReview from "./TableData/PendingReview";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Assign = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainAssign, setMainAssign] = useState(true);

  const [isAssignReviewers, setAssignReviewers] = useState(false);

  const [isAssignAdditionalReviewers, setAssignAdditionalReviewers] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isAssignReviewersDashboard = () => {
    if (selectedData === null || selectedData === "") {
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      if (selectedData[5] === "pending review") {
        setMainAssign(false);
  
        setAssignReviewers(true);
  
        setAssignAdditionalReviewers(false);
      } else {
        setMainAssign(false);
  
        setAssignReviewers(false);
  
        setAssignAdditionalReviewers(true);
      }
    }
  }

  const isMainAssignDashboard = () => {
    setMainAssign(true);

    setAssignReviewers(false);

    setAssignAdditionalReviewers(false);

    setSelectedData(null);

    setDocumentID(null);

    setTopic(null);

    setDocumentStatus(null);

    setReviewer1ID(null);
    setReviewer1Error({
      display: "none",
    });

    setReviewer2ID(null);
    setReviewer2Error({
      display: "none",
    });

    setReviewer3ID(null);
    setReviewer3Error({
      display: "none",
    });
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingReviewDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Review,Pending Additional Reviewer`;
  const [pendingReview, setPendingReview] = useState([]);
  const [updatePendingReviewTable, setUpdatePendingReviewTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updatePendingReviewTable) {
      fetch(pendingReviewDataUrl, {
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
          setPendingReview(data);
          if (data) {
            setUpdatePendingReviewTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[pendingReviewDataUrl, updatePendingReviewTable]);

  // STANDARD GET REQUEST
  const reviewerNameDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Available`;
  const [reviewerNameData, setReviewerNameData] = useState([]);
  const [updateReviewerName, setUpdateReviewerName] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateReviewerName) {
      fetch(reviewerNameDataUrl, {
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
          setReviewerNameData(data);
          if (data) {
            setUpdateReviewerName(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[reviewerNameDataUrl, updateReviewerName]);

  // STANDARD GET REQUEST
  const reviewDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7`;
  const [reviewData, setReviewData] = useState([]);
  const [updateReviewData, setUpdateReviewData] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateReviewData) {
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
          setReviewData(data);
          if (data) {
            setUpdateReviewData(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[reviewDataUrl, updateReviewData]);

  const [func] = useState("assignreviewers");
  const [documentID, setDocumentID] = useState(null);
  const [reviewer1ID, setReviewer1ID] = useState(null);
  const [reviewer2ID, setReviewer2ID] = useState(null);
  const [reviewer3ID, setReviewer3ID] = useState(null);

  const [topic, setTopic] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);

  const reviewerSelect = reviewerNameData.filter(item => item.areaOfExpertise.includes(topic));
  const existingReview = reviewData.filter(item => item.documentID.includes(documentID));
  const existingReviewerID = existingReview.map(item => item.reviewerID);
  const additionalReviewers = reviewerSelect.filter(item => (item.personID !== (existingReviewerID[0])) && (item.personID !== (existingReviewerID[1])));

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData1 = new FormData();
  formData1.append("function", func);
  formData1.append("documentID", documentID);
  formData1.append("editorID", loggedInUser.personID);
  formData1.append("reviewerID", reviewer1ID);

  const processAssignReviewer1 = () => {
    // to Display the key/value pairs
    for (var pair of formData1.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData1,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdatePendingReviewTable(true);
        setUpdateReviewerName(true);
        isMainAssignDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData2 = new FormData();
  formData2.append("function", func);
  formData2.append("documentID", documentID);
  formData2.append("editorID", loggedInUser.personID);
  formData2.append("reviewerID", reviewer2ID);

  const processAssignReviewer2 = () => {
    // to Display the key/value pairs
    for (var pair of formData2.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData2,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdatePendingReviewTable(true);
        setUpdateReviewerName(true);
        isMainAssignDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData3 = new FormData();
  formData3.append("function", func);
  formData3.append("documentID", documentID);
  formData3.append("editorID", loggedInUser.personID);
  formData3.append("reviewerID", reviewer3ID);

  const processAssignReviewer3 = () => {
    // to Display the key/value pairs
    for (var pair of formData3.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData3,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdatePendingReviewTable(true);
        setUpdateReviewerName(true);
        isMainAssignDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [reviewer1Error, setReviewer1Error] = useState({
    display: "none",
  });
  const [reviewer2Error, setReviewer2Error] = useState({
    display: "none",
  });
  const [reviewer3Error, setReviewer3Error] = useState({
    display: "none",
  });

  const handleSelectReviewer = (e) => {
    if (reviewerSelect.length < 2 && documentStatus === "pending review") {
      e.preventDefault();
      alert("There is no enough available reviewers.");
    } else if (additionalReviewers.length < 1 && documentStatus === "pending additional reviewer") {
      e.preventDefault();
      alert("There is no enough available reviewer.");
    } else {
      e.preventDefault();
      isAssignReviewersDashboard();
    }
  }

  const handleReviewer1 = (e) => {
    setReviewer1ID(null);
    let reviewer1 = e.target.value;
    setReviewer1ID(reviewer1);

    if (reviewer1 !== "") {
      setReviewer1Error({
        display: "none",
      });
    }
  }

  const handleReviewer2 = (e) => {
    setReviewer2ID(null);
    let reviewer2 = e.target.value;
    setReviewer2ID(reviewer2);

    if (reviewer2 !== "") {
      setReviewer2Error({
        display: "none",
      });
    }
  }

  const handleReviewer3 = (e) => {
    setReviewer3ID(null);
    let reviewer3 = e.target.value;
    setReviewer3ID(reviewer3);

    if (reviewer3 !== "") {
      setReviewer3Error({
        display: "none",
      });
    }
  }

  const handleUpdateAssign = (e) => {
    if (isAssignReviewers === true) {
      if (reviewer1ID === null || reviewer1ID === "") {
        e.preventDefault();
        setReviewer1Error({
          display: "",
          color: "red",
        });
      } else if (reviewer2ID === null || reviewer2ID === "") {
        e.preventDefault();
        setReviewer2Error({
          display: "",
          color: "red",
        });
      } else if (reviewer1ID === reviewer2ID) {
        e.preventDefault();
        alert("Reviewer 1 and Reviewer 2 can not be the same.");
      } else {
        e.preventDefault();
        processAssignReviewer1();
        processAssignReviewer2();
        alert("Assign Successfully");
      }
    } else if (isAssignAdditionalReviewers === true) {
      if (reviewer3ID === null || reviewer3ID === "") {
        e.preventDefault();
        setReviewer3Error({
          display: "",
          color: "red",
        });
      } else {
        e.preventDefault();
        processAssignReviewer3();
        alert("Assign Successfully");
      }
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
      {isMainAssign?
        <div className="mainAssignDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to assign reviewers</h3>
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
                {pendingReview.map((item) => (
                  <PendingReview
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setSelectedData={setSelectedData}
                    setSelectedError={setSelectedError}
                    setDocumentID={setDocumentID}
                    setTopic={setTopic}
                    setDocumentStatus={setDocumentStatus}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={handleSelectReviewer}>Assign</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
            <span style={selectedError}>
              Please select a manuscript to assign reviewer(s)
            </span>
          </div>
        </div>:null
      }

      {isAssignReviewers?
        <div>
          <div className="assignReviewersDiv">
            <label>Dashboard / Assign</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faEdit}/>&nbsp;Assign Reviewers</h3>
          </div>

          <div
            style={{
              paddingTop: "10px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <form method="POST">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedData[0]}</td>
                    <td>{selectedData[1]}</td>
                    <td>{selectedData[2]}</td>
                    <td>{selectedData[3]}</td>
                    <td>{selectedData[4]}</td>
                    <td>{selectedData[5]}</td>
                  </tr>
                </tbody>
              </table>
              <div className="reviewersSelectedDiv">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Reviewer 1 *</label>
                        <select onChange={handleReviewer1}>
                          <option value="">Select Reviewer</option>
                          {reviewerSelect.map((item) => (
                            <option key={item.personID} value={item.personID}>{item.username}</option>
                          ))}
                        </select>
                        <br />
                        <span style={reviewer1Error}>Please select the reviewer</span>
                      </td>
                      <td>
                        <label>Reviewer 2 *</label>
                        <select onChange={handleReviewer2}>
                          <option value="">Select Reviewer</option>
                          {reviewerSelect.map((item) => (
                            <option key={item.personID} value={item.personID}>{item.username}</option>
                          ))}
                        </select>
                        <br />
                        <span style={reviewer2Error}>Please select the reviewer</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="inputBtn">
                <input type="button" value="Assign" onClick={handleUpdateAssign}></input>
                <input type="button" value="Cancel" onClick={isMainAssignDashboard}></input>
              </div>
            </form>
          </div>
        </div>:null}

        {isAssignAdditionalReviewers?
        <div>
          <div className="assignReviewersDiv">
            <label>Dashboard / Assign</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faEdit}/>&nbsp;Assign Additional Reviewer</h3>
          </div>

          <div
            style={{
              paddingTop: "10px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <form method="POST">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedData[0]}</td>
                    <td>{selectedData[1]}</td>
                    <td>{selectedData[2]}</td>
                    <td>{selectedData[3]}</td>
                    <td>{selectedData[4]}</td>
                    <td>{selectedData[5]}</td>
                  </tr>
                </tbody>
              </table>
              <div className="additionalReviewersSelectedDiv">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Reviewer 3 *</label>
                        <select onChange={handleReviewer3}>
                          <option value="">Select Reviewer</option>
                          {additionalReviewers.map((item) => (
                            <option key={item.personID} value={item.personID}>{item.username}</option>
                          ))}
                        </select>
                        <br />
                        <span style={reviewer3Error}>Please select the reviewer</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="inputBtn">
                <input type="button" value="Assign" onClick={handleUpdateAssign}></input>
                <input type="button" value="Cancel" onClick={isMainAssignDashboard}></input>
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

export default Assign;
