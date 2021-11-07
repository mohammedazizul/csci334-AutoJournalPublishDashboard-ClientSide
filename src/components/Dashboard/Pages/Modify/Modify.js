import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import PendingModify from "./TableData/PendingModify";

const Modify = () => {
  let history = useHistory();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainModify, setMainModify] = useState(true);

  const [isManuscriptNo, setModifySelected] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  })

  const isModifySelected = (e) => {
    if (selectedData !== null) {
      setMainModify(false);

      setModifySelected(true);
    } else {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    }
  }

  const isMainManu = () => {
    setMainModify(true);

    setModifySelected(false);

    setSelectedData(null);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingModifyDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${loggedInUser.personID}&docStatus=Pending Modify`;
  const [pendingModify, setPendingModify] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(pendingModifyDataUrl, {
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
        setPendingModify(data);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  const [authorRemarks, setAuthorRemarks] = useState(null);
  const [attachments, setAttachments] = useState(null);

  // STANDARD POST REQUEST - POST - (NOT WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("authorRemarks", authorRemarks);
  formData.append("document", attachments);

  const processUpdateModify = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editDocument.php`;

    fetch(urlToPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("upload :", data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [authorRemarksError, setAuthorRemarksError] = useState({
    display: "none",
  });
  const [attachmentsError, setAttachmentsError] = useState({
    display: "none",
  });

  const handleAuthorRemarks = (e) => {
    let remarks = e.target.value;
    setAuthorRemarks(remarks);

    if (remarks !== "") {
      setAuthorRemarksError({
        display: "none",
      });
    }
  };

  const handleAttachments = (e) => {
    let attachments = e.target.files[0];
    setAttachments(attachments);

    if (attachments !== "") {
      setAttachmentsError({
        display: "none",
      });
    }
  };

  const handleUpdateModify = (e) => {
    if (authorRemarks === null || authorRemarks === "") {
      e.preventDefault();
      setAuthorRemarksError({
        display: "",
        color: "red",
      });
    } else if (attachments === null || attachments === "") {
      e.preventDefault();
      setAttachmentsError({
        display: "",
        color: "red",
      });
    } else {
      processUpdateModify();
      document.getElementById("modifyForm").reset();
    }
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
            <form method="GET" id="modifyTable">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {pendingModify.map((item) => (
                  <PendingModify
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setSelectedData={setSelectedData}
                    setSelectedError={setSelectedError}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isModifySelected}>Modify Selected</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
            <span style={selectedError}>Please select a manuscript to modify</span>
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
            <form method="POST" id="modifyForm">
              <table>
                <tbody>
                  <tr>
                    <td>No.</td>
                    <td><input type="text" value={selectedData[0]} readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td><input type="text" value={selectedData[1]} readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Topic</td>
                    <td><input type="text" value={selectedData[2]} readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Comments</td>
                    <td><textarea value={selectedData[3]} readOnly></textarea></td>
                  </tr>
                  <tr>
                    <td>Remarks *</td>
                    <td>
                      <textarea onChange={handleAuthorRemarks}></textarea>
                      <br />
                      <span style={authorRemarksError}>Please enter your remarks</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Attachments *</td>
                    <td>
                      <input type="file" onChange={handleAttachments}></input>
                      <br />
                      <span style={attachmentsError}>Please enter your remarks</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="button" value="Update Manuscript" onClick={handleUpdateModify}></input>
                <input type="button" value="Cancel" onClick={isMainManu}></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *. Else fields read only.</span>
        </div>:null
      }
    </div>
  );
};

export default Modify;