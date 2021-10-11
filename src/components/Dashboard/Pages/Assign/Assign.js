import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Table.css";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Assign = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to assign reviewers</h3>
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
          <button className="btn" id="trueBtn">Assign</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Assign;
