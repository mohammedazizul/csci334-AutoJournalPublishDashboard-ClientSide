import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Update = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to update</h3>
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
                <td>S111</td>
                <td>AI Development History</td>
                <td>Science</td>
                <td>111</td>
                <td>11/11/2011</td>
                <td>Tomas John</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>E878</td>
                <td>Patriotic Education</td>
                <td>Education</td>
                <td>346</td>
                <td>21/12/2011</td>
                <td>Jane</td>
                <td>Published</td>
              </tr>
            </tbody>
          </table>
          <button className="btn" id="trueBtn">Update Info</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Update;