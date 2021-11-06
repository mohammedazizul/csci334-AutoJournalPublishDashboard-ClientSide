import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import Paid from "./TableData/Paid";

const Publish = () => {
  let history = useHistory();

  const [isMainPublish, setMainPublish] = useState(true);

  const [isRecordJournalInfo, setRecordJournalInfo] = useState(false);

  const isRecordJournalInfoDashboard = () => {
    setMainPublish(false);

    setRecordJournalInfo(true);
  }

  const isMainPublishDashboard = () => {
    setMainPublish(true);

    setRecordJournalInfo(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const paidDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=Paid`;
  const [paid, setPaid] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(paidDataUrl, {
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
        setPaid(data);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  return (
    <div>
      {isMainPublish?
        <div className="mainPublishDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript publish</h3>
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
                {paid.map((item) => (
                  <Paid
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                  />
                ))}
              </table>
              <button className="btn" id="trueBtn" onClick={isRecordJournalInfoDashboard}>Publish</button>
              <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
            </form>
          </div>
        </div>:null
      }

      {isRecordJournalInfo?
        <div className="recordJournalInformationDiv">
          <div>
            <label>Dashboard / Record Journal Information</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faPenNib}/>&nbsp;Record Journal Information</h3>
          </div>

          <div className="recordJournalInfoDiv">
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>Print date</td>
                    <td><input type="date"></input></td>
                  </tr>
                  <tr>
                    <td>Journal Issue</td>
                    <td><textarea></textarea></td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Confirm"></input>
                <input type="reset" value="Cancel" onClick={isMainPublishDashboard}></input>
              </div>
            </form>
          </div>
        </div>:null
      }
    </div>
  );
};

export default Publish;