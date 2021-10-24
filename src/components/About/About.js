import React, { useEffect, useState } from "react";

const About = () => {
  // GET -> to read
  // POST -> to send
  // PATCH -> to update
  // DELETE ->

  // STANDARD GET REQUEST
  const userDataUrl =
    "http://localhost/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7";
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  // GET - (WORKING FINE)
  useEffect(() => {
    fetch(userDataUrl, {
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
        setUserData(data);
        setUserDataLoading(false);
      })
      .catch((error) => {
        console.error("JSON user data fetching error : ", error);
      });
  }, []);

  const userObj = {
    dob: "2000-01-01",
    email: "ryan@example.com",
    password: "5f4dcc3b5aa765d61d8327deb882cf99",
    personID: "P00010",
    type: 0,
    username: "ryan",
  };

  // POST - (NEED TO TEST)
  // const sendData = () => {
  //   const urlToPost = `http://localhost/api/create/createperson.php`;
  //   fetch(urlToPost, {
  //     method: "POST",
  //     // mode: "no-cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userObj),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data: ", data);
  //       setUserDataLoading(false);
  //       setUserData(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error: ", error);
  //     });
  // };
  // sendData();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ABOUT</h1>
      {/* div for JSON user data */}
      <div>
        user data using GET Request
        {userDataLoading ? (
          " User Data is Loading . . . please check server connection"
        ) : (
          <div>
            <h2>{userData.length}</h2>
            {userData.map((item) => (
              <h3 key={item.personID}>{item.username}</h3>
            ))}
          </div>
        )}
      </div>
      {/* start after this */}
    </div>
  );
};

export default About;
