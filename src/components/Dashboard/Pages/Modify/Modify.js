import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Modify = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to modify</h3>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>S2324</td>
                <td>Machine Learning for Medicine</td>
                <td>Science</td>
                <td>632</td>
                <td>19/07/2021</td>
                <td>Pending Modify</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>S2345</td>
                <td>Medicine with Industry 4.0</td>
                <td>Science</td>
                <td>432</td>
                <td>11/08/2021</td>
                <td>Pending Modify</td>
              </tr>
            </tbody>
          </table>
          <button className="btn" id="trueBtn">Modify Selected</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modify;