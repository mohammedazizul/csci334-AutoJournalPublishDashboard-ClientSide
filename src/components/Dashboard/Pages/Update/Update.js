import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTableData from "./TableData/UpdateTableData";

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

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

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
                  <th>Pages</th>
                  <th>Submit Date</th>
                  <th>Author Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              {updateTableData.map((item) => (
                <UpdateTableData
                  key={item.documentMetaData.documentID}
                  data={item.documentMetaData}
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
              <input type="submit" value="Confirm"></input>
              <input type="reset" value="Cancel" onClick={isMainUpdateDashboard}></input>
            </div>
          </form>
        </div>
        <span>Dynamic field, appear after reviewing only #. The field marked * is the only field can edit.</span>
      </div>:null
      }
    </div>
  );
};

export default Update;