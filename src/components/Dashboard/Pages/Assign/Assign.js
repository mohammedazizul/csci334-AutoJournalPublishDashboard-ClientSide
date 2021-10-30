import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Table.css";
import {
  faAlignJustify,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

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
  const userDataUrl =
    "http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2";
  const [reviewerNameData, setReviewerNameData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(userDataUrl, {
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
  }, []);

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
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox"></input></th>
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
                    <td><input type="checkbox"></input></td>
                    <td>M232</td>
                    <td>Medical Robotics</td>
                    <td>Medicine</td>
                    <td>432</td>
                    <td>17/09/2021</td>
                    <td>Tomas John</td>
                    <td>Pending Review</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>
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
              <table>
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
                  <tr>
                    <td>
                      <label>Reviewer 1 *</label>
                      <select>
                        <option value="">Select Reviewer</option>
                        {reviewerNameData.map((item) => (
                          <option value={item.personID}>{item.username}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <label>Reviewer 2 *</label>
                      <select>
                        <option value="">Select Reviewer</option>
                        {reviewerNameData.map((item) => (
                          <option value={item.personID}>{item.username}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <label>Reviewer 3 *</label>
                      <select>
                        <option value="">Select Reviewer</option>
                        {reviewerNameData.map((item) => (
                          <option value={item.personID}>{item.username}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
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
