import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";
import { faAlignJustify, faUndo } from "@fortawesome/free-solid-svg-icons";
import ReviewerData from "./TableData/ReviewerData";
import NewReviewerData from "./TableData/NewReviewerData";
import AuthorData from "./TableData/AuthorData";
import ApprovePopUp from "./PopUpWindows/ApprovePopUp";
import RejectPopUp from "./PopUpWindows/RejectPopUp";

const Report = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainReport, setMainReport] = useState(true);

  const [isReviewerMgnt, setReviewerMgnt] = useState(false);

  const [isAuthorMgnt, setAuthorMgnt] = useState(false);

  const isReviewerMgntDashboard = () => {
    setMainReport(false);

    setReviewerMgnt(true);

    setAuthorMgnt(false);
  };

  const isAuthorMgntDashboard = () => {
    setMainReport(false);

    setReviewerMgnt(false);

    setAuthorMgnt(true);
  };

  const isMainReportDashboard = () => {
    setMainReport(true);

    setReviewerMgnt(false);

    setAuthorMgnt(false);

    setFunc(null);

    setReviewerID(null);
  };

  // STANDARD GET REQUEST
  const reviewerDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Available,On Leave,Occupied`;
  const [reviewerData, setReviewerData] = useState([]);
  const [updateExistingReviewerTable, setUpdateExistingReviewerTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateExistingReviewerTable) {
      fetch(reviewerDataUrl, {
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
          setReviewerData(data);
          if (data) {
            setUpdateExistingReviewerTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [reviewerDataUrl, updateExistingReviewerTable]);

  // STANDARD GET REQUEST
  const newReviewerDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Pending Approval`;
  const [newReviewerData, setNewReviewerData] = useState([]);
  const [updateNewReviewerTable, setUpdateNewReviewerTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateNewReviewerTable) {
      fetch(newReviewerDataUrl, {
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
          setNewReviewerData(data);
          if (data) {
            setUpdateNewReviewerTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [newReviewerDataUrl, updateNewReviewerTable]);

  // STANDARD GET REQUEST
  const authorDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=1`;
  const [authorData, setAuthorData] = useState([]);
  const [updateExistingAuthorTable, setUpdateExistingAuthorTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateExistingAuthorTable) {
      fetch(authorDataUrl, {
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
          setAuthorData(data);
          if (data) {
            setUpdateExistingAuthorTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [authorDataUrl, updateExistingAuthorTable]);

  const [func, setFunc] = useState(null);
  const [reviewerID, setReviewerID] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("function", func);
  formData.append("editorID", loggedInUser.personID);
  formData.append("reviewerID", reviewerID);

  const processApprovalRejectReviewer = () => {
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
        setUpdateExistingReviewerTable(true);
        setUpdateNewReviewerTable(true)
        setApprovePopUpOpen(false);
        setRejectPopUpOpen(false);
        setFunc(null);
        setReviewerID(null);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [isApprovePopUpOpen, setApprovePopUpOpen] = useState(false);

  const handleApprovePopUpOpen = (e) => {
    setApprovePopUpOpen(!isApprovePopUpOpen);
    setFunc("approvereviewer");
  }

  const [isRejectPopUpOpen, setRejectPopUpOpen] = useState(false);

  const handleRejectPopUpOpen = (e) => {
    setRejectPopUpOpen(!isRejectPopUpOpen);
    setFunc("rejectreviewer");
  }

  const handleApproveReject = (e) => {
    e.preventDefault();
    processApprovalRejectReviewer();
    alert("Update Reviewer Status Successfully");
  }

  return (
    <div>
      {isMainReport ? (
        <div className="mainReportMgntDiv">
          <div>
            <label>Dashboard / Management</label>
          </div>

          <div
            style={{
              paddingTop: "150px",
              margin: "20px",
              textAlign: "center",
            }}
          >
            <button
              className="btn"
              id="trueBtn"
              onClick={isReviewerMgntDashboard}
            >
              Reviewer Management
            </button>
            <div style={{ paddingTop: "100px" }} />
            <button
              className="btn"
              id="falseBtn"
              onClick={isAuthorMgntDashboard}
            >
              Author Management
            </button>
          </div>
        </div>
      ) : null}

      {isReviewerMgnt ? (
        <div className="reviewerMgntDiv">
          <div>
            <label>Dashboard / Reviewer Management</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;Existing Reviewers
            </h3>
          </div>

          <form method="GET">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Reviewer Name</th>
                  <th>Age</th>
                  <th>Total Reviewed</th>
                  <th>Pending Reviewing</th>
                  <th>Expertise</th>
                  <th>Average Point</th>
                  <th>Late Reviews</th>
                </tr>
              </thead>
              {reviewerData.map((item) => (
                <ReviewerData key={item.personID} data={item} />
              ))}
            </table>
          </form>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;New sign-up
            </h3>
          </div>

          <form method="GET">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Reviewer Name</th>
                  <th>Age</th>
                  <th>Area of Expertise</th>
                  <th>Action</th>
                </tr>
              </thead>
              {newReviewerData.map((item) => (
                <NewReviewerData
                  key={item.personID}
                  data={item}
                  handleApprovePopUpOpen={handleApprovePopUpOpen}
                  handleRejectPopUpOpen={handleRejectPopUpOpen}
                  setReviewerID={setReviewerID}
                />
              ))}
            </table>
          </form>
          <button onClick={isMainReportDashboard}>
            <FontAwesomeIcon icon={faUndo} /> <b>Back</b>
          </button>
        </div>
      ) : null}

      {isAuthorMgnt ? (
        <div className="authorMgntDiv">
          <div>
            <label>Dashboard / Author Management</label>
          </div>

          <form method="GET" style={{ margin: "20px" }}>
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Author Name</th>
                  <th>Age</th>
                  <th>Total Submission</th>
                  <th>H</th>
                  <th>S</th>
                  <th>M</th>
                  <th>E</th>
                  <th>SS</th>
                  <th>O</th>
                  <th>Total Publication</th>
                  <th>Publication Rate</th>
                  <th>Late Edits</th>
                </tr>
              </thead>
              {authorData.map((item) => (
                <AuthorData key={item.personID} data={item} />
              ))}
            </table>
          </form>
          <button onClick={isMainReportDashboard}>
            <FontAwesomeIcon icon={faUndo} /> <b>Back</b>
          </button>
        </div>
      ) : null}

      <div>
        {isApprovePopUpOpen && <ApprovePopUp
          content={<>
            <div style={ {textAlign: "center"} }>
              <form method="POST">
                <h3>Are you sure to approve this reviewer?</h3>
                <div className="inputBtn">
                  <input type="button" value="Yes" onClick={handleApproveReject}></input>
                  <input type="button" value="No" onClick={handleApprovePopUpOpen}></input>
                </div>
              </form>
            </div>
          </>}
          handleApprovePopUpClose={handleApprovePopUpOpen}
        />}
      </div>

      <div>
        {isRejectPopUpOpen && <RejectPopUp
          content={<>
            <div style={ {textAlign: "center"} }>
              <form method="POST">
                <h3>Are you sure to reject this reviewer?</h3>
                <div className="inputBtn">
                  <input type="button" value="Yes" onClick={handleApproveReject}></input>
                  <input type="button" value="No" onClick={handleRejectPopUpOpen}></input>
                </div>
              </form>
            </div>
          </>}
          handleRejectPopUpClose={handleRejectPopUpOpen}
        />}
      </div>
    </div>
  );
};

export default Report;
