import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../App";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faQuestionCircle,
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import ReviewHistoryData from "../TableData/ReviewHistoryData";
import PendingRatingData from "../TableData/PendingRatingData";
import ViewDocumentPopUp from "../../ViewDocumentPopUp/ViewDocumentPopUp";

const ReviewerTable = () => {
  let history = useHistory();
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [selectedData, setSelectedData] = useState(null);

  const [isMainReviewerDiv, setMainReviewerDiv] = useState(true);

  const [isRateManuscriptDiv, setRateManuscriptDiv] = useState(false);

  const isRateManuscriptDashboard = () => {
    setMainReviewerDiv(false);

    setRateManuscriptDiv(true);
  };

  const isMainReviewerDashboard = () => {
    setMainReviewerDiv(true);

    setRateManuscriptDiv(false);

    setSelectedData(null);
  };

  // STANDARD GET REQUEST
  const reviewHistoryDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${loggedInUser.personID}&status=complete`;
  const [reviewHistoryData, setReviewHistoryData] = useState([]);
  const [updateHistoryTable, setUpdateHistoryTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateHistoryTable) {
      fetch(reviewHistoryDataUrl, {
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
        setReviewHistoryData(data);
        if (data) {
          setUpdateHistoryTable(false);
        }
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
    }
  },[reviewHistoryDataUrl, updateHistoryTable]);

  // STANDARD GET REQUEST
  const pendingRatingDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${loggedInUser.personID}&status=pending`;
  const [pendingRatingData, setPendingRatingData] = useState([]);
  const [updateRatingTable, setUpdateRatingTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateRatingTable) {
      fetch(pendingRatingDataUrl, {
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
        setPendingRatingData(data);
        if (data) {
          setUpdateRatingTable(false);
        }
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
    }
  },[pendingRatingDataUrl, updateRatingTable]);

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);

  // STANDARD POST REQUEST - POST - (NOT WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("documentID", selectedData);
  formData.append("personID", loggedInUser.personID);
  formData.append("rating", rating);
  formData.append("comment", comment);

  const processRate = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/rate.php`;

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
        setUpdateRatingTable(true);
        setUpdateHistoryTable(true);
        isMainReviewerDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [rateError, setRateError] = useState({
    display: "none",
  });
  const [commentError, setCommentError] = useState({
    display: "none",
  });

  const handleRating = (e) => {
    let rate = e.target.value;
    setRating(rate);

    if (rate !== "") {
      setRateError({
        display: "none",
      });
    }
  };

  const handleComment = (e) => {
    let cm = e.target.value;
    setComment(cm);

    if (cm !== "") {
      setCommentError({
        display: "none",
      });
    }
  };

  const handleUpdateRate = (e) => {
    if (rating === null || rating === "") {
      e.preventDefault();
      setRateError({
        display: "",
        color: "red",
      });
    } else if (comment === null || comment === "") {
      e.preventDefault();
      setCommentError({
        display: "",
        color: "red",
      });
    } else {
      processRate();
      alert("Update Successfully");
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

   // STANDARD GET REQUEST
   const updateStatusDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&id=${loggedInUser.personID}`;
   const [statusData, setStatusData] = useState([]);
   const [updateStatusData, setUpdateStatusData] = useState(true);
 
   // GET - (WORKING FINE)
   useEffect(() => {
     if (updateStatusData) {
       fetch(updateStatusDataUrl, {
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
         setStatusData(data);
         if (data) {
          setUpdateStatusData(false);
         }
       })
       .catch((error) => {
         console.error("JSON user data fetching error : ", error);
       });
     }
   },[updateStatusDataUrl, updateStatusData]);

   const statusArray = statusData.map(item => item.status);
   console.log(statusArray);

  const [status, setStatus] = useState(null);
  const [statusError, setStatusError] = useState({
    display: "none",
  });
  const [sameStatusError, setSameStatusError] = useState({
    display: "none",
  });
  // STANDARD POST REQUEST - POST - (NOT WORKING FINE)
  // creating data to send to BE
  let formdata = new FormData();
  formdata.append("reviewerID", loggedInUser.personID);
  formdata.append("status",status);

  const processChangeStatus = () => {
    // to Display the key/value pairs
    for (var pair of formdata.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/changereviewerstatus.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
        setUpdateStatusData(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  //fro reviewers change their status
 const handleStatus = (e) => {
  let newStatus = e.target.value;
  setStatus(newStatus);
  if(newStatus!==""){
    e.preventDefault();
    setStatusError({
      display: "none",
     });
    }
    setSameStatusError({
      display: "none",
    });
  }
  console.log(status);

  const handleUpdateStatus = (e) => {
    if (status === null || status === "") {
      e.preventDefault();
      setStatusError({
        display: "",
        color: "red",
      });
      setSameStatusError({
        display: "none",
      });
    } else if(status===statusArray) {
      setStatusError({
        display: "none",
      })
      setSameStatusError({
        display: "",
        color: "red",
      });
    } else {
      e.preventDefault();
      processChangeStatus();
      alert("Reviewer status changed successfully");
    }
  }

  return (
    <div>
      {isMainReviewerDiv ? (
        <div className="reviewerDashboard">
          <label>Dashboard</label>
          <div
            style={{
              marginLeft: "25%",
              display:"flex",
              textAlign:"center",
            }}
          >
            <h4>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;My Status:
            </h4>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{marginTop:"22px"}} id="status">{statusArray}</p>&nbsp;&nbsp;&nbsp;&nbsp;<br/>
            <h4>
              <FontAwesomeIcon icon={faUsersCog} />
              &nbsp;Change Status
            </h4>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <select 
            onChange={handleStatus} 
            style={{
              width:"120px",
              height:"20px",
              marginTop:"22px",
            }}>
                        <option value="">Change Status</option>
                        <option value="available">Available</option>
                        <option value="on leave">On Leave</option>
                        <option value="occupied">Occupied</option>
            </select>
            <button style={{height:"20px",marginTop:"22px"}} onClick={handleUpdateStatus}>Change my status</button>
            <span style={statusError} >Please choose a status to change</span>
            <span style={sameStatusError}>Please choose a new status to change</span>
          </div>
          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;Rating History
            </h3>
          </div>

          <div className="reviewerTable">
            <form method="GET">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Rating</th>
                    <th>Comments</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewHistoryData.map((item) => (
                    <ReviewHistoryData
                      key={item.documentID}
                      data={item}
                      setViewDocument={setViewDocument}
                      handleOpen={handleOpen}
                    />
                  ))}
                </tbody>
              </table>
            </form>
          </div>

          <div
            style={{
              marginLeft: "180px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faQuestionCircle} />
              &nbsp;Pending for Your Rating
            </h3>
          </div>

          <div className="reviewerTable">
            <form method="GET">
              <table
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="dataTable"
              >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRatingData.map((item) => (
                    <PendingRatingData
                      key={item.documentID}
                      data={item}
                      isRateManuscriptDashboard={isRateManuscriptDashboard}
                      setSelectedData={setSelectedData}
                      setViewDocument={setViewDocument}
                      handleOpen={handleOpen}
                    />
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      ) : null}

      {isRateManuscriptDiv ? (
        <div className="rateManuscriptDiv">
          <div>
            <label>Dashboard / Rate the manuscript</label>
          </div>

          <div className="rateManuscriptForm">
            <form method="POST">
              <table
                style={{
                  width: "40%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <tbody>
                  <tr>
                    <td>Rate: *</td>
                    <td>
                      <select onChange={handleRating}>
                        <option value="">Rate</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      &nbsp;
                      <span style={rateError}>Please rate the manuscript</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Comments: *</td>
                    <td>
                      <textarea onChange={handleComment}></textarea>
                      <br />
                      <span style={commentError}>Please enter the comment</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span
                style={{ position: "absolute", left: "0", padding: "20px" }}
              >
                There are required fields in this form marked *.
              </span>
              <input type="button" value="Confirm" onClick={handleUpdateRate}></input>
              <input
                type="button"
                value="Cancel"
                onClick={isMainReviewerDashboard}
              ></input>
            </form>
          </div>
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

export default ReviewerTable;
