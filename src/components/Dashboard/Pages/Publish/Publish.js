import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Publish = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript publish</h3>
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
                <td>S376</td>
                <td>Machine Learning for Gimification</td>
                <td>Science</td>
                <td>345</td>
                <td>09/08/2015</td>
                <td>Tomas John</td>
                <td>Paid</td>
                <td>View</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>SS34</td>
                <td>Culture and Encomics</td>
                <td>Social Study</td>
                <td>444</td>
                <td>29/09/2018</td>
                <td>Doris Wu</td>
                <td>Paid</td>
                <td>View</td>
              </tr>
            </tbody>
          </table>
          <button className="btn" id="trueBtn">Publish</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Publish;