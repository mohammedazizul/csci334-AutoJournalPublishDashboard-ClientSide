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

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log("userData: ", loggedInUser);

  const [isMainPayment, setMainPayment] = useState(true);

  const [isPaymentMehod, setPaymentMethod] = useState(false);

  const isPaymentMethodDashboard = () => {
    setMainPayment(false);

    setPaymentMethod(true);
  };

  const isMainPaymentDashboard = () => {
    setMainPayment(true);

    setPaymentMethod(false);

    setCardBtnClick(false);
    setBankBtnClick(false);
    setPaypalBtnClick(false);
    setApplepayBtnClick(false);

    setPaymentSuccessful({
      display: "none",
    });
    setPaymentError({
      display: "none",
    });
  };

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingPaymentDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${loggedInUser.personID}&docStatus=Pending Payment`;
  const [pendingPayment, setPendingPayment] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

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

  const [paymentSuccessful, setPaymentSuccessful] = useState({
    display: "none",
  });

  const [paymentError, setPaymentError] = useState({
    display: "none",
  });

  const handlePlacePayment = (e) => {
    if (
      isCardBtnClick === true ||
      isBankBtnClick === true ||
      isPaypalBtnClick === true ||
      isApplepayBtnClick === true
    ) {
      e.preventDefault();
      setPaymentSuccessful({
        display: "",
        color: "green",
        fontSize: "32px",
      });
      setPaymentError({
        display: "none",
      });
    } else {
      e.preventDefault();
      setPaymentSuccessful({
        display: "none",
      });
      setPaymentError({
        display: "",
        color: "red",
        fontSize: "32px",
      });
    }
    //
    processPayment();
  };

  // FAKE
  const documentIDs = [];
  documentIDs[0] = "D5";
  console.log(typeof documentIDs);

  // STANDARD POST REQUEST - POST - (WORKING FINE)
  // creating data to send to BE
  const formData = new FormData();
  formData.append("authorID", loggedInUser.personID); // OKAY
  formData.append("documentIDs", documentIDs); //  documentIDs should be an array

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
        console.log("Process Payment :", data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
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
              height: "250px",
            }}
          >
            <form method="GET">
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox"></input>
                    </th>
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
                  />
                ))}
              </table>
              <br />
              <span>Total: RM</span>
              <div>
                <button
                  className="btn"
                  id="trueBtn"
                  onClick={isPaymentMethodDashboard}
                >
                  Pay for Selected
                </button>
                <button className="btn" id="cancelPaymentBtn">
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
          </div>
        </div>
      ) : null}

      {isPaymentMehod ? (
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
          <div style={{ textAlign: "center" }}>
            <span style={paymentSuccessful}>
              <b>Payment Successful</b>
            </span>
            <span style={paymentError}>
              <b>Please Select one of the Method</b>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
