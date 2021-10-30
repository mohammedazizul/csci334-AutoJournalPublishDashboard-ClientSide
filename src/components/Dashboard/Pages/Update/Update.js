import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

const Update = () => {
  let history = useHistory();

  const [isMainUpdate, setMainUpdate] = useState(true);

  const [isUpdateInfo, setUpdateInfo] = useState(false);

  const isUpdateInfoDashboard = () => {
    setMainUpdate(false);

    setUpdateInfo(true);
  }

  const isMainUpdateDashboard = () => {
    setMainUpdate(true);

    setUpdateInfo(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  return (
    <div>
      {isMainUpdate?
      <div className="mainUpdateDiv">
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
                  <td>S1323</td>
                  <td>AI Technique with Industry 4.0</td>
                  <td>Science</td>
                  <td>276</td>
                  <td>07/11/2019</td>
                  <td>Tomas John</td>
                  <td>Pending Payment</td>
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>H212</td>
                  <td>The Study of Qing Emperors</td>
                  <td>History</td>
                  <td>223</td>
                  <td>24/12/2020</td>
                  <td>Tomas John</td>
                  <td>Pending Payment</td>
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>E387</td>
                  <td>Safety Education</td>
                  <td>Education</td>
                  <td>289</td>
                  <td>04/07/2017</td>
                  <td>Tomas John</td>
                  <td>Pending Final Check</td>
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
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>S2324</td>
                  <td>Machine Learning for Medicine</td>
                  <td>Science</td>
                  <td>632</td>
                  <td>19/07/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>S2345</td>
                  <td>Medicine with Industry 4.0</td>
                  <td>Science</td>
                  <td>432</td>
                  <td>11/08/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>S376</td>
                  <td>Machine Learning for Gimification</td>
                  <td>Science</td>
                  <td>345</td>
                  <td>09/08/2015</td>
                  <td>Tomas John</td>
                  <td>Paid</td>
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
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>SS13</td>
                  <td>Social Study under Multimedia</td>
                  <td>Social Study</td>
                  <td>345</td>
                  <td>24/06/2021</td>
                  <td>Tomas John</td>
                  <td>Under Review</td>
                </tr>
                <tr>
                  <td><input type="checkbox"></input></td>
                  <td>E232</td>
                  <td>Self Defense</td>
                  <td>Education</td>
                  <td>124</td>
                  <td>07/11/2018</td>
                  <td>Vincent</td>
                  <td>Under Review</td>
                </tr>
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
            <button className="btn" id="trueBtn" onClick={isUpdateInfoDashboard}>Update Info</button>
            <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
          </form>
        </div>
      </div>:null
      }

      {isUpdateInfo?
      <div className="updateInformationDiv">
        <div>
          <label>Dashboard / Update Information</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Update Information</h3>
        </div>

        <div className="updateInfoDiv">
          <form method="POST">
            <table>
              <tr>
                <td>No.</td>
                <td colSpan="3"><input type="text" value="H212" readonly></input></td>
              </tr>
              <tr>
                <td>Pages</td>
                <td colSpan="3"><input type="text" value="223" readonly></input></td>
              </tr>
              <tr>
                <td>Author Name</td>
                <td colSpan="3"><input type="text" value="Tomas John" readonly></input></td>
              </tr>
              <tr>
                <td>Comments</td>
                <td colSpan="3"><textarea placeholder="Nothing Special"></textarea></td>
              </tr>
              <tr></tr>
              <tr style={{textAlign: "center"}}>
                <td>Point 1: 7.5</td>
                <td>Point 2: 6.8</td>
                <td>Point 3: 7.5</td>
                <td>*</td>
              </tr>
            </table>
            <div className="inputBtn">
              <input type="submit" value="Confirm"></input>
              <input type="reset" value="Cancel" onClick={isMainUpdateDashboard}></input>
            </div>
          </form>
        </div>
        <span>Dynamic field, appear after reviewing only *</span>
      </div>:null
      }
    </div>
  );
};

export default Update;