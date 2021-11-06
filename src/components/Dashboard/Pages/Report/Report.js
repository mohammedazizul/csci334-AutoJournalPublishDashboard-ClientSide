import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faAlignJustify, faUndo } from "@fortawesome/free-solid-svg-icons";
import ReviewerData from "./TableData/ReviewerData";
import NewReviewerData from "./TableData/NewReviewerData";
import AuthorData from "./TableData/AuthorData";

const Report = () => {
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
  };

  // STANDARD GET REQUEST
  const reviewerDataUrl = "http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Available,On Leave,Occupied";
  const [reviewerData, setReviewerData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

  // STANDARD GET REQUEST
  const newReviewerDataUrl = "http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Pending Approval";
  const [newReviewerData, setNewReviewerData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

  // STANDARD GET REQUEST
  const authorDataUrl =
    "http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=1";
  const [authorData, setAuthorData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

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
                <NewReviewerData key={item.personID} data={item} />
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
    </div>
  );
};

export default Report;
