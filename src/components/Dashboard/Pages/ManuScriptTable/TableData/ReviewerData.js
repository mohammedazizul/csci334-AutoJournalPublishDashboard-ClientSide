import React, { useEffect, useState } from "react";
import DocInfoData from "../TableData/DocInfoData/DocInfoData";

const ReviewerData = (props) => {
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
      {docInfoData.map((item) => (
        <DocInfoData
          key={item.documentMetaData.documentID}
          data={item.documentMetaData}
        />
      ))}
    </tbody>
  );
};

export default ReviewerData;