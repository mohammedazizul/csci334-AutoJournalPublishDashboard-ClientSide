import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { faAlignJustify, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../../App";
import NewDocumentData from "./TableData/NewDocumentData";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const Review = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainReview, setMainReview] = useState(true);

  const [isRecordInformation, setRecordInformation] = useState(false);

  const isRecordInformationDashboard = () => {
    setMainReview(false);

    setRecordInformation(true);
  };

  const isMainReviewDashboard = () => {
    setMainReview(true);

    setRecordInformation(false);
  };

  // STANDARD GET REQUEST
  const newDocumentDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=New`;
  const [newDocumentData, setNewDocumentData] = useState([]);
  const [updateNewDocumentTable, setUpdateNewDocumentTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateNewDocumentTable) {
      fetch(newDocumentDataUrl, {
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
          setNewDocumentData(data);
          if (data) {
            setUpdateNewDocumentTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [newDocumentDataUrl, updateNewDocumentTable]);

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
      {isMainReview ? (
        <div className="mainReviewDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;Select a manuscript to review
            </h3>
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
                {newDocumentData.map((item) => (
                  <NewDocumentData
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setViewDocument={setViewDocument}
                    handleOpen={handleOpen}
                  />
                ))}
              </table>
              <button
                className="btn"
                id="trueBtn"
                onClick={isRecordInformationDashboard}
              >
                Within Scope
              </button>
              <button className="btn" id="falseBtn">
                Out of Scope
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {isRecordInformation ? (
        <div className="recordInformationDiv">
          <div>
            <label>Dashboard / Record Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faPenNib} />
              &nbsp;Record Information
            </h3>
          </div>

          <div className="recordInfoFormDiv">
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>Comments *</td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="button" value="Upload"></input>
                <input
                  type="button"
                  value="Cancel"
                  onClick={isMainReviewDashboard}
                ></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *.</span>
        </div>
      ) : null}

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

export default Review;
