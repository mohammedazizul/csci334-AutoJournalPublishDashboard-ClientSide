import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

const Review = () => {
  const [isMainReview, setMainReview] = useState(true);

  const [isRecordInformation, setRecordInformation] = useState(false);

  const isRecordInformationDashboard = () => {
    setMainReview(false);

    setRecordInformation(true);
  }

  const isMainReviewDashboard = () => {
    setMainReview(true);

    setRecordInformation(false);
  }

  return (
    <div>
      {isMainReview?
        <div className="mainReviewDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to review</h3>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox"></input></td>
                    <td></td>
                    <td>Preschool Education</td>
                    <td>Education</td>
                    <td>367</td>
                    <td>21/9/2021</td>
                    <td>Tomas John</td>
                    <td>New</td>
                    <td>View</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>
                    <td></td>
                    <td>Kinematics and Health</td>
                    <td>Health</td>
                    <td>567</td>
                    <td>13/11/2019</td>
                    <td>James Lee</td>
                    <td>New</td>
                    <td>View</td>
                  </tr>
                </tbody>
              </table>
              <button className="btn" id="trueBtn" onClick={isRecordInformationDashboard}>Within Scope</button>
              <button className="btn" id="falseBtn">Out of Scope</button>
            </form>
          </div>
        </div>:null
      }

      {isRecordInformation?
        <div className="recordInformationDiv">
          <div>
            <label>Dashboard / Record Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Record Information</h3>
          </div>

          <div className="recordInfoFormDiv">
            <form method="POST">
              <table>
                <tr>
                  <td>No. *</td>
                  <td><input type="text"></input></td>
                </tr>
                <tr></tr>
                <tr>
                  <td>Comments</td>
                  <td><textarea></textarea></td>
                </tr>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Upload"></input>
                <input type="reset" value="Cancel" onClick={isMainReviewDashboard}></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *.</span>
        </div>:null
      }
    </div>
  );
};

export default Review;
