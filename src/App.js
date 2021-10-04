import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const url = "http://localhost/person.php";

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      {user.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
    </div>
  );
}

export default App;
