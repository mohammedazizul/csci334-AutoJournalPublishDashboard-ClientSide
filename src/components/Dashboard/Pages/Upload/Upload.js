import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";
import {
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  let history = useHistory();

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };
  
  return (
    <div>
      <div>
        <label>Dashboard / Upload</label>
      </div>

      <div
        style={{
          margin: "20px",
        }}
      >
        <h3><FontAwesomeIcon icon={faArrowUp}/>&nbsp;Upload new manuscript</h3>
      </div>

      <div className="uploadDiv">
        <form method="POST">
          <table>
            <tbody>
              <tr>
                <td>Title *</td>
                <td colSpan="2"><input type="text"></input></td>
              </tr>
              <tr>
                <td>Topic *</td>
                <td>
                  <select>
                    <option value="">Select Topic</option>
                    <option value="science">Science</option>
                    <option value="education">Education</option>
                    <option value="history">History</option>
                    <option value="social study">Social Study</option>
                  </select>
                </td>
                <td>
                  If others, please specify &nbsp; <input type="text"></input>
                </td>
              </tr>
              <tr>
                <td>Remarks</td>
                <td colSpan="2"><textarea></textarea></td>
              </tr>
              <tr>
                <td>Attachments *</td>
                <td colSpan="2"><input type="file"></input></td>
              </tr>
            </tbody>
          </table>
          <div className="inputBtn">
            <input type="submit" value="Submit Manuscript"></input>
            <input type="reset" value="Cancel" onClick={goToManuscriptTable}></input>
          </div>
        </form>
      </div>
      <span>There are required fields in this form marked *.</span>
    </div>
  );
};

export default Upload;