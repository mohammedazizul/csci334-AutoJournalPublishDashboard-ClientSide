import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Table.css";
import {
  faAlignJustify,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import PendingReview from "./TableData/PendingReview";

const Assign = () => {
  let history = useHistory();

  const [isMainAssign, setMainAssign] = useState(true);

  const [isAssignReviewers, setAssignReviewers] = useState(false);

  const isAssignReviewersDashboard = () => {
    setMainAssign(false);

    setAssignReviewers(true);
  }

  const isMainAssignDashboard = () => {
    setMainAssign(true);

    setAssignReviewers(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingReviewDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Review,Pending Additional Reviewer`;
  const [pendingReview, setPendingReview] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  // STANDARD GET REQUEST
  const reviewerNameDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Available`;
  const [reviewerNameData, setReviewerNameData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

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
                    <th>Pages</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {pendingReview.map((item) => (
                  <PendingReview
                    key={item.documentMetaData.documentID}
                    data={item.documentMetaData}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isAssignReviewersDashboard}>Assign</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
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
                    <th>Pages</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S767</td>
                    <td>AI for Medical Surgery</td>
                    <td>Science</td>
                    <td>854</td>
                    <td>20/12/2020</td>
                    <td>Qing Yun</td>
                    <td>Pending Review</td>
                  </tr>
                </tbody>
              </table>
              <div className="reviewersSelectedDiv">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Reviewer 1 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label>Reviewer 2 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label>Reviewer 3 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button className="btn" id="trueBtn">Assign</button>
                <button className="btn" id="falseBtn" onClick={isMainAssignDashboard}>Cancel</button>
              </div>
            </form>
          </div>
        </div>:null
      }
    </div>
  );
};

export default Assign;
