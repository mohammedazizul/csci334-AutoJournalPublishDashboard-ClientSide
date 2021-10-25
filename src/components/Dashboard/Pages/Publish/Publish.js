import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

const Publish = () => {
  let history = useHistory();

  const [isMainPublish, setMainPublish] = useState(true);

  const [isRecordJournalInfo, setRecordJournalInfo] = useState(false);

  const isRecordJournalInfoDashboard = () => {
    setMainPublish(false);

    setRecordJournalInfo(true);
  }

  const isMainPublishDashboard = () => {
    setMainPublish(true);

    setRecordJournalInfo(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  return (
    <div>
      {isMainPublish?
        <div className="mainPublishDiv">
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
              <button className="btn" id="trueBtn" onClick={isRecordJournalInfoDashboard}>Publish</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
          </div>
        </div>:null
      }

      {isRecordJournalInfo?
        <div className="recordJournalInformationDiv">
          <div>
            <label>Dashboard / Record Journal Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Record Journal Information</h3>
          </div>

          <div className="recordJournalInfoDiv">
            <form method="POST">
              <table>
                <tr>
                  <td>Print date</td>
                  <td><input type="date"></input></td>
                </tr>
                <tr>
                  <td>Journal Issue</td>
                  <td><textarea></textarea></td>
                </tr>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Confirm"></input>
                <input type="reset" value="Cancel" onClick={isMainPublishDashboard}></input>
              </div>
            </form>
          </div>
        </div>:null
      }
    </div>
  );
};

export default Publish;