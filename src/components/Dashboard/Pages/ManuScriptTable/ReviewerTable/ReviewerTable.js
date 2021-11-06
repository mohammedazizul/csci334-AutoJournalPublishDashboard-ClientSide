import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../App";
import {
  faAlignJustify,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReviewHistoryData from "../TableData/ReviewHistoryData";
import PendingRatingData from "../TableData/PendingRatingData";

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
  const reviewHistoryDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${loggedInUser.personID}&status=completed`;
  const [reviewHistoryData, setReviewHistoryData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  // STANDARD GET REQUEST
  const pendingRatingDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${loggedInUser.personID}&status=pending`;
  const [pendingRatingData, setPendingRatingData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
                      function={isRateManuscriptDashboard}
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
