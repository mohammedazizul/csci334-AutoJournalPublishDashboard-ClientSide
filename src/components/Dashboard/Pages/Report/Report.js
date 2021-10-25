import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faAlignJustify,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

const Report = () => {
  const [isMainReport, setMainReport] = useState(true);

  const [isReviewerMgnt, setReviewerMgnt] = useState(false);

  const [isAuthorMgnt, setAuthorMgnt] = useState(false);

  const isReviewerMgntDashboard = () => {
    setMainReport(false);

    setReviewerMgnt(true);

    setAuthorMgnt(false);
  }

  const isAuthorMgntDashboard = () => {
    setMainReport(false);

    setReviewerMgnt(false);

    setAuthorMgnt(true);
  }

  const isMainReportDashboard = () => {
    setMainReport(true);

    setReviewerMgnt(false);

    setAuthorMgnt(false);
  }

  return (
    <div>
      {isMainReport?
      <div className="mainReportMgntDiv">
        <div>
          <label>Dashboard / Management</label>
        </div>

        <div
          style={{
            paddingTop: "150px",
            margin: "20px",
            textAlign: "center",
          }}
        >
            <button className="btn" id="trueBtn" onClick={isReviewerMgntDashboard}>Reviewer Management</button>
            <div style={{paddingTop: "100px"}} />
            <button className="btn" id="falseBtn" onClick={isAuthorMgntDashboard}>Author Management</button>
        </div>
      </div>:null
      }

      {isReviewerMgnt?
      <div className="reviewerMgntDiv">
        <div>
          <label>Dashboard / Reviewer Management</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Existing Reviewers</h3>
        </div>

        <form method="GET">
          <table>
            <thead>
              <tr>
                <th>Reviewer Name</th>
                <th>Age</th>
                <th>Total Reviewed</th>
                <th>Pending Reviewing</th>
                <th>H</th>
                <th>S</th>
                <th>M</th>
                <th>E</th>
                <th>SS</th>
                <th>O</th>
                <th>Expertise</th>
                <th>Average Point</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Oliver</td>
                <td>26</td>
                <td>23</td>
                <td>4</td>
                <td>18</td>
                <td>1</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>3</td>
                <td>History</td>
                <td>7.20</td>
              </tr>
              <tr>
                <td>Sam</td>
                <td>27</td>
                <td>24</td>
                <td>3</td>
                <td>3</td>
                <td>14</td>
                <td>3</td>
                <td>2</td>
                <td>2</td>
                <td>0</td>
                <td>Science</td>
                <td>7.75</td>
              </tr>
              <tr>
                <td>Joning</td>
                <td>45</td>
                <td>17</td>
                <td>4</td>
                <td>1</td>
                <td>2</td>
                <td>10</td>
                <td>0</td>
                <td>0</td>
                <td>4</td>
                <td>Medicine</td>
                <td>7.12</td>
              </tr>
              <tr>
                <td>Kingsley</td>
                <td>33</td>
                <td>28</td>
                <td>6</td>
                <td>0</td>
                <td>27</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>Science</td>
                <td>6.78</td>
              </tr>
              <tr>
                <td>Irine</td>
                <td>36</td>
                <td>45</td>
                <td>8</td>
                <td>3</td>
                <td>0</td>
                <td>0</td>
                <td>4</td>
                <td>37</td>
                <td>1</td>
                <td>Social Study</td>
                <td>7.50</td>
              </tr>
              <tr>
                <td>Emma</td>
                <td>51</td>
                <td>76</td>
                <td>11</td>
                <td>1</td>
                <td>0</td>
                <td>2</td>
                <td>46</td>
                <td>1</td>
                <td>1</td>
                <td>Education</td>
                <td>7.64</td>
              </tr>
            </tbody>
          </table>
        </form>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;New sign-up</h3>
        </div>

        <form method="GET">
          <table>
            <thead>
              <tr>
                <th>Reviewer Name</th>
                <th>Age</th>
                <th>Area of Expertise</th>
                <th>Sign-up date &amp; time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tommy</td>
                <td>33</td>
                <td>Science</td>
                <td>20/09/2021 09:45 am</td>
                <td>
                  <input type="submit" value="Approve"></input>
                  <input type="submit" value="Reject"></input>
                </td>
              </tr>
              <tr>
                <td>Newton</td>
                <td>29</td>
                <td>Education</td>
                <td>21/09/2021 11:23 am</td>
                <td>
                  <input type="submit" value="Approve"></input>
                  <input type="submit" value="Reject"></input>
                </td>
              </tr>
              <tr>
                <td>Alias</td>
                <td>43</td>
                <td>Social Study</td>
                <td>22/02/2021 03:43 pm</td>
                <td>
                  <input type="submit" value="Approve"></input>
                  <input type="submit" value="Reject"></input>
                </td>
              </tr>
              <tr>
                <td>Tim</td>
                <td>36</td>
                <td>Others</td>
                <td>23/09/2021 11:23 am</td>
                <td>
                  <input type="submit" value="Approve"></input>
                  <input type="submit" value="Reject"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <button onClick={isMainReportDashboard}><FontAwesomeIcon icon={faUndo}/> <b>Back</b></button>
      </div>:null
      }

      {isAuthorMgnt?
      <div className="authorMgntDiv">
        <div>
          <label>Dashboard / Author Management</label>
        </div>

        <form method="GET" style={{margin: "20px"}}>
          <table>
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Age</th>
                <th>Total Submission</th>
                <th>H</th>
                <th>S</th>
                <th>M</th>
                <th>E</th>
                <th>SS</th>
                <th>O</th>
                <th>Total Publication</th>
                <th>Publication Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tomas John</td>
                <td>37</td>
                <td>11</td>
                <td>1</td>
                <td>5</td>
                <td>1</td>
                <td>2</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>9.09%</td>
              </tr>
              <tr>
                <td>Jane</td>
                <td>32</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>100%</td>
              </tr>
              <tr>
                <td>Eric</td>
                <td>22</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0.00%</td>
              </tr>
              <tr>
                <td>Doris Wu</td>
                <td>23</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0.00%</td>
              </tr>
              <tr>
                <td>Vicent</td>
                <td>27</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0.00%</td>
              </tr>
              <tr>
                <td>Qing Yun</td>
                <td>41</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0.00%</td>
              </tr>
              <tr>
                <td>James Lee</td>
                <td>36</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td>0.00%</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td>17</td>
                <td>1</td>
                <td>7</td>
                <td>1</td>
                <td>4</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>11.76%</td>
              </tr>
            </tbody>
          </table>
        </form>
        <button onClick={isMainReportDashboard}><FontAwesomeIcon icon={faUndo}/> <b>Back</b></button>
      </div>:null
      }
    </div>
  );
};

export default Report;