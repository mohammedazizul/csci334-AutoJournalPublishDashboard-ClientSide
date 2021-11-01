import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faAlignJustify,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const ReviewerTable = () => {
  const [isMainReviewerDiv, setMainReviewerDiv] = useState(true);

  const [isRateManuscriptDiv, setRateManuscriptDiv] = useState(false);

  const isRateManuscriptDashboard = () => {
    setMainReviewerDiv(false);

    setRateManuscriptDiv(true);
  }

  const isMainReviewerDashboard = () => {
    setMainReviewerDiv(true);

    setRateManuscriptDiv(false);
  }

  return (
    <div>
      {isMainReviewerDiv?
      <div className="reviewerDashboard">
        <h1>Reviewer Dashboard</h1>
        <label>Dashboard</label>
        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Rating History</h3>
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
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S2324</td>
                  <td>Machine Learning for Medicine</td>
                  <td>Science</td>
                  <td>632</td>
                  <td>19/07/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                  <td>6.7</td>
                  <td>Need Modify</td>
                  <td><button>View</button></td>
                </tr>
                <tr>
                  <td>S2345</td>
                  <td>Medicine with Industry 4.0</td>
                  <td>Science</td>
                  <td>432</td>
                  <td>11/08/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                  <td>7.3</td>
                  <td>Good</td>
                  <td><button>View</button></td>
                </tr>
                <tr>
                  <td>S376</td>
                  <td>Machine Learning for Gimification</td>
                  <td>Science</td>
                  <td>345</td>
                  <td>09/08/2015</td>
                  <td>Tomas John</td>
                  <td>Paid</td>
                  <td>7.3</td>
                  <td>Good</td>
                  <td><button>View</button></td>
                </tr>
                <tr>
                  <td>SS34</td>
                  <td>Culture and Encomics</td>
                  <td>Social Study</td>
                  <td>444</td>
                  <td>29/09/2018</td>
                  <td>Doris Wu</td>
                  <td>Paid</td>
                  <td>8.5</td>
                  <td>Perfect</td>
                  <td><button>View</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        <div
          style={{
            marginLeft: "180px",
          }}
        >
          <h3><FontAwesomeIcon icon={faQuestionCircle}/>&nbsp;Pending for Your Rating</h3>
        </div>

        <div className="reviewerTable">
          <form method="GET">
            <table style={{width: "80%", marginLeft: "auto", marginRight: "auto"}} className="dataTable">
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
      </div>:null
      }

      {isRateManuscriptDiv?
      <div className="rateManuscriptDiv">
          <div>
            <label>Dashboard / Rate the manuscript</label>
          </div>

          <div className="rateManuscriptForm">
            <form method="POST">
              <table style={{width: "40%", marginLeft: "auto", marginRight: "auto"}}>
                <tr>
                  <td>Rate: *</td>
                  <td><input type="text"></input></td>
                </tr>
                <tr>
                  <td>Comments: *</td>
                  <td><textarea></textarea></td>
                </tr>
              </table>
              <span style={{position: "absolute", left: "0", padding: "20px"}}>There are required fields in this form marked *.</span>
              <input type="submit" value="Confirm"></input>
              <input type="reset" value="Cancel" onClick={isMainReviewerDashboard}></input>
            </form>
          </div>
      </div>:null
      }
    </div>
  );
};

export default ReviewerTable;