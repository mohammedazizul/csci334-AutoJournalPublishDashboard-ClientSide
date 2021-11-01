import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import PendingFinalCheck from "./TableData/PendingFinalCheck";

const FinalCheck = () => {
  // STANDARD GET REQUEST
  const pendingFinalCheckDataUrl = `http://localhost/jess-backend/api/read/getmetadata.php?api_key=RXru1LUOOeKFX03LGSo7`;
  const [pendingFinalCheck, setPendingFinalCheck] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

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
          height: "250px",
        }}
      >
        <form method="POST">
          <table className="dataTable">
            <thead>
              <tr>
                <th><input type="checkbox"></input></th>
                <th>No.</th>
                <th>Title</th>
                <th>Topic</th>
                <th>Pages</th>
                <th>Submit Date</th>
                <th>Author Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {pendingFinalCheck.map((item) => (
              <PendingFinalCheck key={item.documentID} data={item} />
            ))}
          </table>
          <input type="submit" value="Satisfy"></input>
          <input type="submit" value="Reject"></input>
        </form>
      </div>
    </div>
  );
};

export default FinalCheck;