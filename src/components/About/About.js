import React, { useEffect, useState } from "react";

const About = () => {
  // STANDARD GET REQUEST
  const userDataUrl =
    "http://localhost/jess-backend/api/read/getperson.php?api_key=RXru1LUOOeKFX03LGSo7";
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

  // STANDARD POST REQUEST
  // POST - (WORKING FINE)

  const [inputText, setInputText] = useState("");
  let formData = new FormData();
  formData.append("text", inputText); // "text" should be in the back end

  // to Display the key/value pairs
  // for (var pair of formData.entries()) {
  //   console.log("Form Data: ", pair[0] + ", " + pair[1]);
  // }

  const sendData = () => {
    const urlToPost = `http://localhost/jess-backend/api/create/createperson.php`;

    fetch(urlToPost, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => console.log("BE Response: ", response))
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

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
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={sendData}>Click To Insert</button>
    </div>
  );
};

export default About;

// POST BACKEND CODE FOR PHP
// <?php
//     require_once '../../connection.php';

//     $recText = $_POST['text'];
//     echo $_POST;

//     $query = "INSERT INTO react_php (`id`, `text`)  VALUES (NULL, '$recText')";

//         if ($connection->query($query) === TRUE) {
//             echo "New record created successfully";
//         } else {
//             echo "Error: " . $query . "<br>" . $connection->error;
//         }
//         $connection->close();
// ?>
