import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Table.css";
import {
  faAlignJustify,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import PendingReview from "./TableData/PendingReview";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Assign = () => {
  let history = useHistory();

  const [isMainAssign, setMainAssign] = useState(true);

  const [isAssignReviewers, setAssignReviewers] = useState(false);

  const isAssignReviewersDashboard = () => {
    setMainAssign(false);

    setAssignReviewers(true);
  }

  const isMainAssignDashboard = () => {
    setMainAssign(true);

    setAssignReviewers(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingReviewDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Review,Pending Additional Reviewer`;
  const [pendingReview, setPendingReview] = useState([]);
  const [updatePendingReviewTable, setUpdatePendingReviewTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updatePendingReviewTable) {
      fetch(pendingReviewDataUrl, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          setPendingReview(data);
          if (data) {
            setUpdatePendingReviewTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[pendingReviewDataUrl, updatePendingReviewTable]);

  // STANDARD GET REQUEST
  const reviewerNameDataUrl = `http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7&type=2&status=Available`;
  const [reviewerNameData, setReviewerNameData] = useState([]);
  const [updateReviewerName, setUpdateReviewerName] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateReviewerName) {
      fetch(reviewerNameDataUrl, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log(data);
          setReviewerNameData(data);
          if (data) {
            setUpdateReviewerName(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[reviewerNameDataUrl, updateReviewerName]);

  const [viewDocument, setViewDocument] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const downloadDocument = (e) => {
    e.preventDefault();
    document.getElementById("downloadDocumentForm").submit();
  }

  return (
    <div>
      {isMainAssign?
        <div className="mainAssignDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to assign reviewers</h3>
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
                    <th></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Author Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {pendingReview.map((item) => (
                  <PendingReview
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isAssignReviewersDashboard}>Assign</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
          </div>
        </div>:null
      }

      {isAssignReviewers?
        <div>
          <div className="assignReviewersDiv">
            <label>Dashboard / Assign</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faEdit}/>&nbsp;Assign Reviewers</h3>
          </div>

          <div
            style={{
              paddingTop: "10px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <form method="POST">
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
              <div className="reviewersSelectedDiv">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Reviewer 1 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label>Reviewer 2 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label>Reviewer 3 *</label>
                        <select>
                          <option value="">Select Reviewer</option>
                          {reviewerNameData.map((item) => (
                            <option key={item.personID}>{item.username}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="inputBtn">
                <input type="button" value="Assign"></input>
                <input type="button" value="Cancel" onClick={isMainAssignDashboard}></input>
              </div>
            </form>
          </div>
        </div>:null}
        
        <div>
        {isOpen && <ViewDocumentPopUp
          content={<>
            <table className="downloadManuscriptTable">
              <tbody>
                <tr>
                  <td>No. : </td>
                  <td>{viewDocument[0]}</td>
                  <td>Submit Date :</td>
                  <td>{viewDocument[1]}</td>
                </tr>
                <tr>
                  <td>Title :</td>
                  <td>{viewDocument[2]}</td>
                  <td>Topic :</td>
                  <td>{viewDocument[3]}</td>
                </tr>
                <tr>
                  <td>Author Name :</td>
                  <td>{viewDocument[4]}</td>
                  <td>Author Remarks :</td>
                  <td><textarea value={viewDocument[5]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Editor Name :</td>
                  <td>{viewDocument[6]}</td>
                  <td>Editor Remarks :</td>
                  <td><textarea value={viewDocument[7]} readOnly></textarea></td>
                </tr>
                <tr>
                  <td>Status :</td>
                  <td>{viewDocument[8]}</td>
                  <td>Print Date :</td>
                  <td>{viewDocument[9]}</td>
                </tr>
                <tr>
                  <td>Journal Issue :</td>
                  <td colSpan="3">{viewDocument[10]}</td>
                </tr>
                <tr>
                  <td colSpan="4"><button onClick={downloadDocument}>Download</button></td>
                </tr>
              </tbody>
            </table>
            <form target="_blank" method="post" id="downloadDocumentForm" action="http://localhost/jess-backend/processes/downloadDocument.php">
              <input type="hidden" name="documentID" id="documentID" value={viewDocument[0]}/>
            </form>
          </>}
          handleClose={handleOpen}
        />}
      </div>
    </div>
  );
};

export default Assign;
