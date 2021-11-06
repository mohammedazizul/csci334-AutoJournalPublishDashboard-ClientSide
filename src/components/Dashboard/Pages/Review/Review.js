import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { faAlignJustify, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../../App";
import NewDocumentData from "./TableData/NewDocumentData";

const Review = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
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

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

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
    </div>
  );
};

export default Review;
