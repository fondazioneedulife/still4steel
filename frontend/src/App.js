import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:3001")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>{message || "Loading..."}</h1>
    </div>
  );
}

export default App;
