import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
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
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to pay</h3>
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
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>S1323</td>
                <td>AI Technique with Industry 4.0</td>
                <td>Science</td>
                <td>276</td>
                <td>07/11/2019</td>
                <td>Pending Payment</td>
                <td>RM320</td>
              </tr>
              <tr>
                <td><input type="checkbox"></input></td>
                <td>H212</td>
                <td>The Study of Qing Emperors</td>
                <td>History</td>
                <td>223</td>
                <td>24/12/2020</td>
                <td>Pending Payment</td>
                <td>RM180</td>
              </tr>
            </tbody>
          </table>
          <button className="btn" id="trueBtn">Pay for Selected</button>
          <button className="btn" id="cancelPaymentBtn">Cancel Payment</button>
          <button className="btn" id="falseBtn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;