import React, { useEffect, useState } from "react";

const ReviewHistoryData = (props) => {
  const { documentID, rating, comment} = props.data;

  // STANDARD GET REQUEST
  const docInfoDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&docID=${documentID}`;
  const [docInfoData, setDocInfoData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
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
        setDocInfoData(data);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  },[]);

  return (
    <tbody>
      <tr>
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.documentID}</td>
        ))}
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.title}</td>
        ))}
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.topic}</td>
        ))}
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.pages}</td>
        ))}
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.dateOfSubmission}</td>
        ))}
        {docInfoData.map((item) => (
          <td key={item.documentMetaData.documentID}>{item.documentMetaData.username}</td>
        ))}
        <td>{rating}</td>
        <td>{comment}</td>
        <td><button>View</button></td>
      </tr>
    </tbody>
  );
};

export default ReviewHistoryData;