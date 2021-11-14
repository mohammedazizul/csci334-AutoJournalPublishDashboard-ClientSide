import React, { useEffect, useState } from "react";

const AuthorData = (props) => {
  const { username, dob, personID } = props.data;

  // STANDARD GET REQUEST
  const authorDataUrl = `http://localhost/jess-backend/api/read/getdocument.php?api_key=RXru1LUOOeKFX03LGSo7&authorID=${personID}`;
  const [authorData, setAuthorData] = useState([]);
  const [updateTable, setUpdateTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateTable) {
      fetch(authorDataUrl, {
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
          setAuthorData(data);
          if (data) {
            setUpdateTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [authorDataUrl, updateTable]);

  var historyArray = authorData.filter(item => item.documentMetaDataObject.topic === ("History"));
  var scienceArray = authorData.filter(item => item.documentMetaDataObject.topic === ("Science"));
  var medicineArray = authorData.filter(item => item.documentMetaDataObject.topic === ("Medicine"));
  var educationArray = authorData.filter(item => item.documentMetaDataObject.topic === ("Education"));
  var socialStudyArray = authorData.filter(item => item.documentMetaDataObject.topic === ("Social Study"));
  var othersArray = authorData.filter(item => item.documentMetaDataObject.topic === ("Others"));
  var publishedArray = authorData.filter(item => item.documentMetaDataObject.documentStatus === ("published"));
  var publicationRate = (publishedArray.length / authorData.length) * 100;
  // real age calculate
  const cal_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age_now--;
    }
    return age_now;
  }

  return (
    <tbody>
      <tr>
        <td>{username}</td>
        <td>{cal_age(dob)}</td>
        <td>{authorData.length}</td>
        <td>{historyArray.length}</td>
        <td>{scienceArray.length}</td>
        <td>{medicineArray.length}</td>
        <td>{educationArray.length}</td>
        <td>{socialStudyArray.length}</td>
        <td>{othersArray.length}</td>
        <td>{publishedArray.length}</td>
        <td>{String(publicationRate)}%</td>
      </tr>
    </tbody>
  );
};

export default AuthorData;