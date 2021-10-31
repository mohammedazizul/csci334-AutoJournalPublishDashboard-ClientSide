import React from "react";

const EditorAuthorTable = () => {
  // EditorAuthor Dashboard

  return (
    <div>
      <h1>Editor Author Table</h1>
      
      <label>Dashboard</label>

      <div className="editorAuthorDashboard">
        <div className="filterDiv">
          <table>
            <tbody>
              <tr>
                <td>
                  {/* Filter by Topic */}
                  <select>
                    <option value="">Filter by Topic</option>
                    <option value="history">History</option>
                    <option value="science">Science</option>
                    <option value="social study">Social Study</option>
                    <option value="medicine">Medicine</option>
                    <option value="education">Education</option>
                    <option value="others">Others</option>
                  </select>
                </td>
                <td>
                  {/* Filter by Pages */}
                  <select>
                    <option value="">Filter by Pages</option>
                    <option value="<100">&lt; 100</option>
                    <option value="100-200">100 - 200</option>
                    <option value="200-300">200 - 300</option>
                    <option value="300-400">300 - 400</option>
                    <option value="400-500">400 - 500</option>
                    <option value=">500">&gt; 500</option>
                  </select>
                </td>
                <td>
                  {/* Filter by Date */}
                  <select>
                    <option value="">Filter by Date</option>
                    <option value="1week">Last one week</option>
                    <option value="1month">Last one month</option>
                    <option value="3months">Last three months</option>
                    <option value="6months">Last half year</option>
                    <option value="1year">Last one year</option>
                    <option value="3years">Last three years</option>
                  </select>
                </td>
                <td>
                  {/* Filter by Status */}
                  <select>
                    <option value="">Filter by Status</option>
                    <option value="1week">New</option>
                    <option value="1month">Pending Review</option>
                    <option value="3months">Rejected</option>
                    <option value="6months">Under View</option>
                    <option value="1year">Paid</option>
                    <option value="3years">Pending Modify</option>
                    <option value="3years">Pending Payment</option>
                    <option value="3years">Pending Final Check</option>
                    <option value="3years">Published</option>
                    <option value="3years">Cancelled</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="editorDashboard">
          <form method="GET">
            <table className="dataTable">
              <thead>
                <tr>
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
                  <td>S111</td>
                  <td>AI Development History</td>
                  <td>Science</td>
                  <td>111</td>
                  <td>11/11/2011</td>
                  <td>Tomas John</td>
                  <td>Published</td>
                </tr>
                <tr>
                  <td>E878</td>
                  <td>Patriotic Education</td>
                  <td>Education</td>
                  <td>346</td>
                  <td>21/12/2011</td>
                  <td>Jane</td>
                  <td>Published</td>
                </tr>
                <tr>
                  <td>S343</td>
                  <td>Computer Science Development</td>
                  <td>Science</td>
                  <td>212</td>
                  <td>12/12/2012</td>
                  <td>Tomas John</td>
                  <td>Cancelled</td>
                </tr>
                <tr>
                  <td>S1323</td>
                  <td>AI Technique with Industry 4.0</td>
                  <td>Science</td>
                  <td>276</td>
                  <td>07/11/2019</td>
                  <td>Tomas John</td>
                  <td>Pending Payment</td>
                </tr>
                <tr>
                  <td>H212</td>
                  <td>The Study of Qing Emperors</td>
                  <td>History</td>
                  <td>223</td>
                  <td>24/12/2020</td>
                  <td>Tomas John</td>
                  <td>Pending Payment</td>
                </tr>
                <tr>
                  <td>E387</td>
                  <td>Safety Education</td>
                  <td>Education</td>
                  <td>289</td>
                  <td>04/07/2017</td>
                  <td>Tomas John</td>
                  <td>Pending Final Check</td>
                </tr>
                <tr>
                  <td>S666</td>
                  <td>Robotics and Surgical Medicine</td>
                  <td>Science</td>
                  <td>786</td>
                  <td>07/09/2020</td>
                  <td>Eric</td>
                  <td>Pending Final Check</td>
                </tr>
                <tr>
                  <td>S2324</td>
                  <td>Machine Learning for Medicine</td>
                  <td>Science</td>
                  <td>632</td>
                  <td>19/07/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                </tr>
                <tr>
                  <td>S2345</td>
                  <td>Medicine with Industry 4.0</td>
                  <td>Science</td>
                  <td>432</td>
                  <td>11/08/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Modify</td>
                </tr>
                <tr>
                  <td>S376</td>
                  <td>Machine Learning for Gimification</td>
                  <td>Science</td>
                  <td>345</td>
                  <td>09/08/2015</td>
                  <td>Tomas John</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>SS34</td>
                  <td>Culture and Encomics</td>
                  <td>Social Study</td>
                  <td>444</td>
                  <td>29/09/2018</td>
                  <td>Doris Wu</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>SS13</td>
                  <td>Social Study under Multimedia</td>
                  <td>Social Study</td>
                  <td>345</td>
                  <td>24/06/2021</td>
                  <td>Tomas John</td>
                  <td>Under Review</td>
                </tr>
                <tr>
                  <td>E232</td>
                  <td>Self Defense</td>
                  <td>Education</td>
                  <td>124</td>
                  <td>07/11/2018</td>
                  <td>Vincent</td>
                  <td>Under Review</td>
                </tr>
                <tr>
                  <td>M232</td>
                  <td>Medical Robotics</td>
                  <td>Medicine</td>
                  <td>432</td>
                  <td>17/09/2021</td>
                  <td>Tomas John</td>
                  <td>Pending Review</td>
                </tr>
                <tr>
                  <td>S767</td>
                  <td>AI for Medical Surgery</td>
                  <td>Science</td>
                  <td>854</td>
                  <td>20/12/2020</td>
                  <td>Qing Yun</td>
                  <td>Pending Review</td>
                </tr>
                <tr>
                  <td>G333</td>
                  <td>Gimification Industry</td>
                  <td>Gimification</td>
                  <td>176</td>
                  <td>23/03/2021</td>
                  <td>Tomas John</td>
                  <td>Rejected</td>
                </tr>
                <tr>
                  <td>A354</td>
                  <td>Art and Culture</td>
                  <td>Art</td>
                  <td>323</td>
                  <td>21/12/2012</td>
                  <td>James Lee</td>
                  <td>Rejected</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Preschool Education</td>
                  <td>Education</td>
                  <td>367</td>
                  <td>21/09/2021</td>
                  <td>Tomas John</td>
                  <td>New</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Kinematics and Health</td>
                  <td>Health</td>
                  <td>567</td>
                  <td>13/11/2019</td>
                  <td>James Lee</td>
                  <td>New</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default EditorAuthorTable;
