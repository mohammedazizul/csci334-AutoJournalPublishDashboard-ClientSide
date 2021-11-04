import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../App";
import {
  faAlignJustify,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const ReviewerTable = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainReviewerDiv, setMainReviewerDiv] = useState(true);

  const [isRateManuscriptDiv, setRateManuscriptDiv] = useState(false);

  const isRateManuscriptDashboard = () => {
    setMainReviewerDiv(false);

    setRateManuscriptDiv(true);
  };

  const isMainReviewerDashboard = () => {
    setMainReviewerDiv(true);

    setRateManuscriptDiv(false);
  };

  // STANDARD GET REQUEST
  const reviewerDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${loggedInUser.personID}`;
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
  },[]);

  return (
    <div>
      {isMainReviewerDiv ? (
        <div className="reviewerDashboard">
          <label>Dashboard</label>
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
                    <th>Pages</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Rating</th>
                    <th>Comments</th>
                    <th>Action</th>
                  </tr>
                </thead>
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
                    <th>Pages</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SS13</td>
                    <td>Social Study under Multimedia</td>
                    <td>Social Study</td>
                    <td>345</td>
                    <td>24/06/2021</td>
                    <td>Tomas John</td>
                    <td>Under Review</td>
                    <td>
                      <button>View</button>
                      <button onClick={isRateManuscriptDashboard}>Rate</button>
                    </td>
                  </tr>
                  <tr>
                    <td>E232</td>
                    <td>Self Defense</td>
                    <td>Education</td>
                    <td>124</td>
                    <td>07/11/2018</td>
                    <td>Vincent</td>
                    <td>Under Review</td>
                    <td>
                      <button>View</button>
                      <button onClick={isRateManuscriptDashboard}>Rate</button>
                    </td>
                  </tr>
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
                      <select>
                        <option value="default">Rate</option>
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
                    </td>
                  </tr>
                  <tr>
                    <td>Comments: *</td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span
                style={{ position: "absolute", left: "0", padding: "20px" }}
              >
                There are required fields in this form marked *.
              </span>
              <input type="submit" value="Confirm"></input>
              <input
                type="reset"
                value="Cancel"
                onClick={isMainReviewerDashboard}
              ></input>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewerTable;
