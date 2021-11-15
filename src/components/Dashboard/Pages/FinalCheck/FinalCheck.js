import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import PendingFinalCheck from "./TableData/PendingFinalCheck";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";
import SatisfyPopUp from "./PopUpWindows/SatisfyPopUp";
import RejectPopUp from "./PopUpWindows/RejectPopUp";

const FinalCheck = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  // STANDARD GET REQUEST
  const pendingFinalCheckDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Final Check`;
  const [pendingFinalCheck, setPendingFinalCheck] = useState([]);
  const [updatePendingFinalCheckTable, setUpdatePendingFinalCheckTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updatePendingFinalCheckTable) {
      fetch(pendingFinalCheckDataUrl, {
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
          setPendingFinalCheck(data);
          if (data) {
            setUpdatePendingFinalCheckTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[pendingFinalCheckDataUrl, updatePendingFinalCheckTable]);

  const [func] = useState("finalcheck");
  const [documentID, setDocumentID] = useState(null);
  const [checkStatus, setCheckStatus] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("function", func);
  formData.append("documentID", documentID);
  formData.append("editorID", loggedInUser.personID);
  formData.append("satisfied", checkStatus);

  const processUpdateFinalCheck = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/editorSection.php`;

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
        setUpdatePendingFinalCheckTable(true);
        setSatisfyPopUpOpen(false);
        setRejectPopUpOpen(false);
        setDocumentID(null);
        setCheckStatus(null);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [isSatisfyPopUpOpen, setSatisfyPopUpOpen] = useState(false);

  const handleSatisfyPopUpOpen = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      setSatisfyPopUpOpen(!isSatisfyPopUpOpen);
      setCheckStatus("satisfied");
    }
  }

  const [isRejectPopUpOpen, setRejectPopUpOpen] = useState(false);

  const handleRejectPopUpOpen = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      setRejectPopUpOpen(!isRejectPopUpOpen);
      setCheckStatus("unsatisfied");
    }
  }

  const handleUpdateFinalCheck = (e) => {
    e.preventDefault();
    processUpdateFinalCheck();
    alert("Update Successfully");
  }
 
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
      <div>
        <label>Dashboard / Select Manuscript</label>
      </div>

      <div
        style={{
          margin: "20px",
        }}
      >
        <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript for final check</h3>
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
            {pendingFinalCheck.map((item) => (
              <PendingFinalCheck
                key={item.documentMetaDataObject.documentID}
                data={item.documentMetaDataObject}
                setDocumentID={setDocumentID}
                setSelectedError={setSelectedError}
                setViewDocument={setViewDocument}
                handleOpen={handleOpen}
              />
            ))}
          </table>
          <div className="inputBtn">
            <input type="button" value="Satisfy" onClick={handleSatisfyPopUpOpen}></input>
            <input type="button" value="Reject" onClick={handleRejectPopUpOpen}></input>
          </div>
        </form>
        <span style={selectedError}>
          Please select a manuscript to final check
        </span>
      </div>

      <div>
        {isSatisfyPopUpOpen && <SatisfyPopUp
          content={<>
            <div style={ {textAlign: "center"} }>
              <form method="POST">
                <h3>Are you sure to satisfy this manuscript?</h3>
                <div className="inputBtn">
                  <input type="button" value="Yes" onClick={handleUpdateFinalCheck}></input>
                  <input type="button" value="No" onClick={handleSatisfyPopUpOpen}></input>
                </div>
              </form>
            </div>
          </>}
          handleSatisfyPopUpClose={handleSatisfyPopUpOpen}
        />}
      </div>

      <div>
        {isRejectPopUpOpen && <RejectPopUp
          content={<>
            <div style={ {textAlign: "center"} }>
              <form method="POST">
                <h3>Are you sure to reject this manuscript?</h3>
                <div className="inputBtn">
                  <input type="button" value="Yes" onClick={handleUpdateFinalCheck}></input>
                  <input type="button" value="No" onClick={handleRejectPopUpOpen}></input>
                </div>
              </form>
            </div>
          </>}
          handleRejectPopUpClose={handleRejectPopUpOpen}
        />}
      </div>

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

export default FinalCheck;