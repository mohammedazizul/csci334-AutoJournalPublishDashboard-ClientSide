import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  faAlignJustify,
  faCreditCard,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcPaypal,
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import PendingPayment from "./TableData/PendingPayment";

const Payment = () => {
  let history = useHistory();

  const [isMainPayment, setMainPayment] = useState(true);

  const [isPaymentMehod, setPaymentMethod] = useState(false);

  const isPaymentMethodDashboard = () => {
    setMainPayment(false);

    setPaymentMethod(true);
  }

  const isMainPaymentDashboard = () => {
    setMainPayment(true);

    setPaymentMethod(false);
  }

  const goToManuscriptTable = () => {
    history.push("/dashboard/manuscript-table");
  };

  // STANDARD GET REQUEST
  const pendingPaymentDataUrl = `http://localhost/jess-backend/api/read/getmetadata.php?api_key=RXru1LUOOeKFX03LGSo7`;
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

  return (
    <div>
      {isMainPayment?
        <div className="mainPaymentDiv">
          <div>
            <label>Dashboard / Select Manuscript</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a manuscript to pay</h3>
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
                    <th><input type="checkbox"></input></th>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Topic</th>
                    <th>Pages</th>
                    <th>Submit Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                {pendingPayment.map((item) => (
                  <PendingPayment key={item.documentID} data={item} />
                ))}
              </table>
              <br />
              <span>Total: RM</span>
              <div>
                <button className="btn" id="trueBtn" onClick={isPaymentMethodDashboard}>Pay for Selected</button>
                <button className="btn" id="cancelPaymentBtn">Cancel Payment</button>
                <button className="btn" id="falseBtn" onClick={goToManuscriptTable}>Cancel</button>
              </div>
            </form>
          </div>
        </div>:null
      }

      {isPaymentMehod?
        <div className="paymentMethodSelectedDiv">
          <div>
            <label>Dashboard / Select Payment Method</label>
          </div>

          <div
            style={{
              margin: "20px",
            }}
          >
            <h3><FontAwesomeIcon icon={faAlignJustify}/>&nbsp;Select a payment method</h3>
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
              <table className="paymentTable">
                <tbody>
                  <tr>
                    <th><button><FontAwesomeIcon icon={faCreditCard}/>&nbsp;Credit / Debit Card</button></th>
                    <th><button><FontAwesomeIcon icon={faUniversity}/>&nbsp;Online Banking</button></th>
                  </tr>
                  <tr>
                    <th><button><FontAwesomeIcon icon={faCcPaypal}/>&nbsp;Paypal</button></th>
                    <th><button><FontAwesomeIcon icon={faApple}/>&nbsp;Apple Pay</button></th>
                  </tr>
                </tbody>
              </table>
              <input type="submit" value="Place Payment"></input>
              <input type="reset" value="Cancel" onClick={isMainPaymentDashboard}></input>
            </form>
          </div>
        </div>:null
      }
    </div>
  );
};

export default Payment;