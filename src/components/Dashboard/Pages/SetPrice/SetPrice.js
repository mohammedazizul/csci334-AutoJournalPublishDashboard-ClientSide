import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import PendingSetPrice from "./TableData/PendingSetPrice";
import ViewDocumentPopUp from "../ViewDocumentPopUp/ViewDocumentPopUp";

const SetPrice = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainSetPrice, setMainSetPrice] = useState(true);

  const [isSetPrice, setSetPrice] = useState(false);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const isSetPriceDashboard = (e) => {
    if (documentID === null || documentID === "") {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
    } else {
      setMainSetPrice(false);

      setSetPrice(true);

      setSelectedError({
        display: "none",
      });
    }
  };

  const isMainSetPriceDashboard = () => {
    setMainSetPrice(true);

    setSetPrice(false);

    setDocumentID(null);

    setPrice(null);

    setSetPriceError({
      display: "none",
    });
  };

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingSetPriceDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docStatus=On Hold`;
  const [pendingSetPrice, setPendingSetPrice] = useState([]);
  const [updatePendingSetPrice, setUpdatePendingSetPrice] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updatePendingSetPrice) {
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
          if (data) {
            setUpdatePendingSetPrice(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  },[pendingSetPriceDataUrl, updatePendingSetPrice]);

  const [func] = useState("setprice");
  const [documentID, setDocumentID] = useState(null);
  const [price, setPrice] = useState(null);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("function", func);
  formData.append("documentID", documentID);
  formData.append("editorID", loggedInUser.personID);
  formData.append("price", price);

  const processUpdatePrice = () => {
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
        setUpdatePendingSetPrice(true);
        isMainSetPriceDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [setPriceError, setSetPriceError] = useState({
    display: "none",
  });

  const handleSetPrice = (e) => {
    let price = e.target.value;
    setPrice(price);

    if (price !== "") {
      setSetPriceError({
        display: "none",
      });
    }
  }

  const handleUpdatePrice = (e) => {
    if (price === null || price === "") {
      e.preventDefault();
      setSetPriceError({
        display: "",
        color: "red",
      });
    } else {
      e.preventDefault();
      processUpdatePrice();
      alert("Update Successfully");
    }
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
                  setDocumentID={setDocumentID}
                  setSelectedError={setSelectedError}
                  setViewDocument={setViewDocument}
                  handleOpen={handleOpen}
                />
              ))}
            </table>
            <button className="btn" id="trueBtn" onClick={isSetPriceDashboard}>Set Price</button>
            <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
          </form>
          <span style={selectedError}>
            Please select a manuscript to set price
          </span>
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
                      <input type="text" onChange={handleSetPrice}></input>
                      <br />
                      <span style={setPriceError}>Please enter the price</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtn">
                <input type="button" value="Update" onClick={handleUpdatePrice}></input>
                <input type="button" value="Cancel" onClick={isMainSetPriceDashboard}></input>
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

export default SetPrice;