import React, { useEffect, useState } from "react";
import ViewBtn from "./ViewBtn/ViewBtn";

const PendingRatingData = (props) => {
  const { documentID } = props.data;

  const handleSelectDocID = (e) => {
    e.preventDefault();
    props.setSelectedData(documentID);
    props.isRateManuscriptDashboard();
  }

  // STANDARD GET REQUEST
  const docInfoDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docID=${documentID}`;
  const [docInfoData, setDocInfoData] = useState([]);
  const [updateDocInfoData, setUpdateDocInfoData] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateDocInfoData) {
      let isMounted = true;
      fetch(docInfoDataUrl, {
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
        if (isMounted) {
          setDocInfoData(data);
          if (data) {
            setUpdateDocInfoData(false);
          }
        }
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
      return () => {
        isMounted = false;
      };
    }
  },[docInfoDataUrl, updateDocInfoData]);

  return (
    <tr>
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.documentID}</td>
      ))}
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.title}</td>
      ))}
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.topic}</td>
      ))}
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.dateOfSubmission}</td>
      ))}
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.authorUsername}</td>
      ))}
      {docInfoData.map((item) => (
        <td key={item.documentMetaDataObject.documentID}>{item.documentMetaDataObject.documentStatus}</td>
      ))}
      <td>
        {docInfoData.map((item) => (
          <ViewBtn
            key={item.documentMetaDataObject.documentID}
            data={item.documentMetaDataObject}
            setViewDocument={props.setViewDocument}
            handleOpen={props.handleOpen}
          />
        ))}
        <button onClick={handleSelectDocID}>Rate</button>
      </td>
    </tr>
  );
};

export default PendingRatingData;