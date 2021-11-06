import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import PendingSetPrice from "./TableData/PendingSetPrice";

const SetPrice = () => {
  let history = useHistory();

  const [isMainSetPrice, setMainSetPrice] = useState(true);

  const [isSetPrice, setSetPrice] = useState(false);

  const isSetPriceDashboard = () => {
    setMainSetPrice(false);

    setSetPrice(true);
  };

  const isMainSetPriceDashboard = () => {
    setMainSetPrice(true);

    setSetPrice(false);
  };

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingSetPriceDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=On Hold`;
  const [pendingSetPrice, setPendingSetPrice] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(pendingSetPriceDataUrl, {
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
        setPendingSetPrice(data);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  return (
    <div>
      {isMainSetPrice?
      <div className="mainSetPriceDiv">
        <div>
          <label>Dashboard / Select Manuscript</label>
        </div>

        <div
          style={{
            margin: "20px",
          }}
        >
          <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to set price</h3>
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
              {pendingSetPrice.map((item) => (
                <PendingSetPrice
                  key={item.documentMetaDataObject.documentID}
                  data={item.documentMetaDataObject}
                />
              ))}
            </table>
            <button className="btn" id="trueBtn" onClick={isSetPriceDashboard}>Set Price</button>
            <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
          </form>
        </div>
      </div>:null
      }

      {isSetPrice ? (
        <div className="setPriceDiv">
          <div>
            <label>Dashboard / Set Price</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Set Price</h3>
          </div>

          <div className="setPriceFormDiv">
            <form method="POST">
              <table>
                <tbody>
                  <tr>
                    <td>Price *</td>
                    <td>
                      <input type="text"></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="submit" value="Update"></input>
                <input type="reset" value="Cancel" onClick={isMainSetPriceDashboard}></input>
              </div>
            </form>
          </div>
          <span>There are required fields in this form marked *.</span>
        </div>
      ) : null}
    </div>
  );
};

export default SetPrice;