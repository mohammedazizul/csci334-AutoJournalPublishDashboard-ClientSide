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
          <button className="btn" id="trueBtn">Update Info</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Update;