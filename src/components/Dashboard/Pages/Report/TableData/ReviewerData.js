import React, { useEffect, useState } from "react";

const ReviewerData = (props) => {
  const { dob, areaOfExpertise, username, personID } = props.data;

  // STANDARD GET REQUEST
  const reviewDataUrl = `http://localhost/jess-backend/api/read/getreview.php?api_key=RXru1LUOOeKFX03LGSo7&reviewerID=${personID}`;
  const [reviewData, setReviewData] = useState([]);
  const [updateTable, setUpdateTable] = useState(true);

  // GET - (WORKING FINE)
  useEffect(() => {
    if (updateTable) {
      fetch(reviewDataUrl, {
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
          setReviewData(data);
          if (data) {
            setUpdateTable(false);
          }
        })
        .catch((error) => {
          console.error("JSON user data fetching error : ", error);
        });
    }
  }, [reviewDataUrl, updateTable]);

  var completeArray = reviewData.filter(item => item.reviewStatus === ("complete"));
  var sum = 0;
  if(completeArray !== null || completeArray !== "") {
    for (let i = 0; i < completeArray.length; i++) {
      sum += parseInt(completeArray[i].rating);
    }
  }
  var averagePoint = sum / completeArray.length;
  var pendingArray = reviewData.filter(item => item.reviewStatus === ("pending"));

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
        <td>{completeArray.length}</td>
        <td>{pendingArray.length}</td>
        <td>{areaOfExpertise}</td>
        <td>{String(averagePoint)}</td>
      </tr>
    </tbody>
  );
};

export default ReviewerData;