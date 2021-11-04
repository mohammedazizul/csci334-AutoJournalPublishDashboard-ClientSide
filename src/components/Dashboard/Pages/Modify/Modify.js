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

  const isModifySelected = () => {
    setMainModify(false);

    setModifySelected(true);
  }

  const isMainManu = () => {
    setMainModify(true);

    setModifySelected(false);
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
                    <th>Status</th>
                  </tr>
                </thead>
                {pendingModify.map((item) => (
                  <PendingModify
                    key={item.documentMetaData.documentID}
                    data={item.documentMetaData}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isModifySelected}>Modify Selected</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
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
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>No.</td>
                    <td><input type="text" value="S2324" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td><input type="text" value="Machine Learning for Medicine" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Topic</td>
                    <td><input type="text" value="Science" readOnly></input></td>
                  </tr>
                  <tr>
                    <td>Comments</td>
                    <td><textarea value="Nothing Special" readOnly></textarea></td>
                  </tr>
                  <tr>
                    <td>Remarks *</td>
                    <td><textarea></textarea></td>
                  </tr>
                  <tr>
                    <td>Attachments *</td>
                    <td><input type="file"></input></td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Update Manuscript"></input>
                <input type="reset" value="Cancel" onClick={isMainManu}></input>
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