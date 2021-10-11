import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Review = () => {
  return (
    <div>
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
          height: "250px",
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
          <button className="btn" id="trueBtn">Within Scope</button>
          <button className="btn" id="falseBtn">Out of Scope</button>
        </form>
      </div>
    </div>
  );
};

export default Review;
