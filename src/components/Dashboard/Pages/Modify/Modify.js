import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const Modify = () => {
  let history = useHistory();

  const [isMainModify, setMainModify] = useState(true);

  const [isManuscriptNo, setModifySelected] = useState(false);

  const isModifySelected = () => {
    setMainModify(false);

    setModifySelected(true);
  }

  const isMainManu = () => {
    setMainModify(true);

    setModifySelected(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  return (
    <div>
      {isMainModify?
        <div className="mainModifyDiv">
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
            }}
          >
            <form method="GET">
              <table className="dataTable">
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
              <button className="btn" id="trueBtn" onClick={isModifySelected}>Modify Selected</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
          </div>
        </div>:null
      }

      {isManuscriptNo?
        <div className="modifySelectedDiv">
          <div>
            <label>Dashboard / Upload Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faExchangeAlt}/>&nbsp;Modify pending manuscript</h3>
          </div>

          <div className="modifyFormDiv">
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>No.</td>
                    <td><input type="text" value="S2324" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td><input type="text" value="Machine Learning for Medicine" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Topic</td>
                    <td><input type="text" value="Science" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Remarks</td>
                    <td><textarea placeholder="Nothing Special"></textarea></td>
                  </tr>
                  <tr>
                    <td>Attachments *</td>
                    <td><input type="file"></input></td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Update Manuscript"></input>
                <input type="reset" value="Cancel" onClick={isMainManu}></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *.</span>
        </div>:null
      }
    </div>
  );
};

export default Modify;