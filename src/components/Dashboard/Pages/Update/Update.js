import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTableData from "./TableData/UpdateTableData";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

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

  // STANDARD GET REQUEST
  const updateDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Pending Compile`;
  const [updateTableData, setUpdateTableData] = useState([]);
  const [updateTable, setUpdateTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateTable) {
      fetch(updateDataUrl, {
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
          setUpdateTableData(data);
          if (data) {
            setUpdateTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[updateDataUrl, updateTable]);

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
              {updateTableData.map((item) => (
                <UpdateTableData
                  key={item.documentMetaDataObject.documentID}
                  data={item.documentMetaDataObject}
                  setViewDocument={setViewDocument}
                  handleOpen={handleOpen}
                />
              ))}
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
              <tbody>
                <tr>
                  <td>No.</td>
                  <td><input type="text" value="H212" readOnly></input></td>
                </tr>
                <tr>
                  <td>Pages</td>
                  <td><input type="text" value="223" readOnly></input></td>
                </tr>
                <tr>
                  <td>Author Name</td>
                  <td><input type="text" value="Tomas John" readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 1 Point #: 7.5</td>
                  <td><input type="text" value="Ok" readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 2 Point #: 6.8</td>
                  <td><input type="text" value="Not good" readOnly></input></td>
                </tr>
                <tr>
                  <td>Reviewer 3 Point #: 7.5</td>
                  <td><input type="text" value="Ok" readOnly></input></td>
                </tr>
                <tr>
                  <td>Editor Comments *</td>
                  <td><textarea></textarea></td>
                </tr>
              </tbody>
            </table>
            <div className="inputBtn">
              <input type="button" value="Confirm"></input>
              <input type="button" value="Cancel" onClick={isMainUpdateDashboard}></input>
            </div>
          </form>
        </div>
        <span>Dynamic field, appear after reviewing only #. The field marked * is the only field can edit.</span>
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

export default Update;