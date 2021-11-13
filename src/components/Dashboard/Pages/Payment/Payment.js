import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../../App";
import {
  faAlignJustify,
  faCreditCard,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { faCcPaypal, faApple } from "@fortawesome/free-brands-svg-icons";
import PendingPayment from "./TableData/PendingPayment";

const Payment = () => {
  let history = useHistory();

  const [loggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainPayment, setMainPayment] = useState(true);

  const [isPaymentMethod, setPaymentMethod] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const [selectedError, setSelectedError] = useState({
    display: "none",
  });

  const [cancelledError, setCancelledError] = useState({
    display: "none",
  });

  const isPaymentMethodDashboard = (e) => {
    if (selectedData !== null) {
      setMainPayment(false);

      setPaymentMethod(true);

      setChoice("pay");
    } else {
      e.preventDefault();
      setSelectedError({
        display: "",
        color: "red",
      });
      setCancelledError({
        display: "none",
      });
    }
  };

  const isMainPaymentDashboard = () => {
    setMainPayment(true);

    setPaymentMethod(false);

    setCardBtnClick(false);
    setBankBtnClick(false);
    setPaypalBtnClick(false);
    setApplepayBtnClick(false);

    setSelectedData(null);
    setChoice("cancel");
  };

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingPaymentDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${loggedInUser.personID}&docStatus=Pending Payment`;
  const [pendingPayment, setPendingPayment] = useState([]);
  const [updateManuscriptPayTable, setUpdateManuscriptPayTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateManuscriptPayTable) {
      fetch(pendingPaymentDataUrl, {
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
          setPendingPayment(data);
          if (data) {
            setUpdateManuscriptPayTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [pendingPaymentDataUrl, updateManuscriptPayTable]);

  const [choice, setChoice] = useState("cancel");

  // STANDARD POST REQUEST - POST - (NOT WORKING FINE)
  // creating data to send to BE
  let formData = new FormData();
  formData.append("documentID", selectedData);
  formData.append("authorID", loggedInUser.personID);
  formData.append("choice", choice);

  const processPayment = () => {
    // to Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log("Form Data: ", pair[0] + ", " + pair[1]);
    }

    const urlToPost = `http://localhost/jess-backend/processes/authorPayment.php`;

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
        setUpdateManuscriptPayTable(true);
        isMainPaymentDashboard();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleCancel = (e) => {
    if (selectedData !== null) {
      e.preventDefault();
      processPayment();
      alert("Payment Cancelled");
    } else {
      e.preventDefault();
      setSelectedError({
        display: "none",
      })
      setCancelledError({
        display: "",
        color: "red",
      });
    }
  };

  const [isCardBtnClick, setCardBtnClick] = useState(false);
  const [isBankBtnClick, setBankBtnClick] = useState(false);
  const [isPaypalBtnClick, setPaypalBtnClick] = useState(false);
  const [isApplepayBtnClick, setApplepayBtnClick] = useState(false);

  const handleCardButtom = () => {
    if (isCardBtnClick === false) {
      document.querySelector("#card").style.backgroundColor = "grey";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(true);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    } else if (isCardBtnClick === true) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    }
  };

  const handleBankButtom = () => {
    if (isBankBtnClick === false) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor = "grey";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(true);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    } else if (isBankBtnClick === true) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    }
  };

  const handlePaypalButtom = () => {
    if (isPaypalBtnClick === false) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor = "grey";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(true);
      setApplepayBtnClick(false);
    } else if (isPaypalBtnClick === true) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    }
  };

  const handleApplepayButtom = () => {
    if (isApplepayBtnClick === false) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor = "grey";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(true);
    } else if (isApplepayBtnClick === true) {
      document.querySelector("#card").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#bank").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#paypal").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      document.querySelector("#applepay").style.backgroundColor =
        "rgba(255, 255, 255, 0.5)";
      setCardBtnClick(false);
      setBankBtnClick(false);
      setPaypalBtnClick(false);
      setApplepayBtnClick(false);
    }
  };

  const handlePlacePayment = (e) => {
    if (
      isCardBtnClick === true ||
      isBankBtnClick === true ||
      isPaypalBtnClick === true ||
      isApplepayBtnClick === true
    ) {
      e.preventDefault();
      processPayment();
      alert("Payment Successfully");
    } else {
      e.preventDefault();
      alert("Please Select one of the Method");
    }
  };

  return (
    <div>
      {isMainPayment ? (
        <div className="mainPaymentDiv">
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
              &nbsp;Select a manuscript to pay
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
            <form method="GET" id="paymentForm">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Submit Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                {pendingPayment.map((item) => (
                  <PendingPayment
                    key={item.documentMetaDataObject.documentID}
                    data={item.documentMetaDataObject}
                    setSelectedData={setSelectedData}
                    setSelectedError={setSelectedError}
                    setCancelledError={setCancelledError}
                  />
                ))}
              </table>

              <div>
                <button
                  className="btn"
                  id="trueBtn"
                  onClick={isPaymentMethodDashboard}
                >
                  Pay for Selected
                </button>
                <button
                  className="btn"
                  id="cancelPaymentBtn"
                  value="cancel"
                  onClick={handleCancel}
                >
                  Cancel Payment
                </button>
                <button
                  className="btn"
                  id="falseBtn"
                  onClick={goToManuscriptTable}
                >
                  Cancel
                </button>
              </div>
            </form>
            <span style={selectedError}>Please select a manuscript to pay</span>
            <span style={cancelledError}>Please select a manuscript to cancel</span>
          </div>
        </div>
      ) : null}

      {isPaymentMethod ? (
        <div className="paymentMethodSelectedDiv">
          <div>
            <label>Dashboard / Select Payment Method</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3>
              <FontAwesomeIcon icon={faAlignJustify} />
              &nbsp;Select a payment method
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
            <table className="paymentTable">
              <tbody>
                <tr>
                  <th>
                    <button id="card" onClick={handleCardButtom}>
                      <FontAwesomeIcon icon={faCreditCard} />
                      &nbsp;Credit / Debit Card
                    </button>
                  </th>
                  <th>
                    <button id="bank" onClick={handleBankButtom}>
                      <FontAwesomeIcon icon={faUniversity} />
                      &nbsp;Online Banking
                    </button>
                  </th>
                </tr>
                <tr>
                  <th>
                    <button id="paypal" onClick={handlePaypalButtom}>
                      <FontAwesomeIcon icon={faCcPaypal} />
                      &nbsp;Paypal
                    </button>
                  </th>
                  <th>
                    <button id="applepay" onClick={handleApplepayButtom}>
                      <FontAwesomeIcon icon={faApple} />
                      &nbsp;Apple Pay
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
            <input
              type="button"
              value="Place Payment"
              onClick={handlePlacePayment}
            ></input>
            <input
              type="button"
              value="Cancel"
              onClick={isMainPaymentDashboard}
            ></input>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
