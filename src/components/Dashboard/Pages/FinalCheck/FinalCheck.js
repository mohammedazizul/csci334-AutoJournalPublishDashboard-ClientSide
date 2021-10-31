import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const FinalCheck = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript for final check</h3>
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
        <form method="POST">
          <table className="dataTable">
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
                <td>E387</td>
                <td>Safety Education</td>
                <td>Education</td>
                <td>289</td>
                <td>04/07/2017</td>
                <td>Tomas John</td>
                <td>Pending Final Check</td>
                <td><button>View</button></td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>S666</td>
                <td>Robotics and Surgical Medicine</td>
                <td>Science</td>
                <td>786</td>
                <td>07/09/2020</td>
                <td>Eric</td>
                <td>Pending Final Check</td>
                <td><button>View</button></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Satisfy"></input>
          <input type="submit" value="Reject"></input>
        </form>
      </div>
    </div>
  );
};

export default FinalCheck;