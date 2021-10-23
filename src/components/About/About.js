import React, { useEffect, useState } from "react";

const About = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  let [userData, setUserData] = useState([]);

  // GET
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }, []);

  // GET  // POST   // PUT  // DELETE

  // const userObj = {
  //   name: "Sun Chao",
  //   text: "HELLO",
  //   id: 101,
  // };

  // POST
  // const sendData = () => {
  //   const urlToPost = `http://localhost/api/create/createperson.php`;
  //   fetch(urlToPost, {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       // Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userObj),
  //   }).then(() => alert());
  //   // .then((response) => response.json())
  //   // .then((data) => console.log(data));
  // };
  //   sendData();

  // GET
  // const getData = () => {
  //   const urlToGet = `http://localhost/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7`;

  //   fetch(urlToGet, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };
  //   getData();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ABOUT</h1>
      <h2>{userData.length}</h2>
      {userData.map((item) => (
        <h3>{item.name}</h3>
      ))}
    </div>
  );
};

export default About;
