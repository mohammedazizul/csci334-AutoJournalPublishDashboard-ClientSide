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
