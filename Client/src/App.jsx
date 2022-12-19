import { useState } from "react";
import FileDownload from "js-file-download";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const download_pdf = async () => {
    await axios({
      url: "http://localhost:3000/download",
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        console.log(res.data);
        FileDownload(res.data, "certificate.pdf");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {logged == true ? (
        <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => download_pdf()}>Download PDF</button>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      ) : (
        <div>
          <div className="login-container">
            <div className="credential-div">
              <label for="username" className="cred-text">
                Username
              </label>
              <input
                className="input"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="credential-div">
              <label for="password" className="cred-text">
                Password
              </label>
              <input
                className="input"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="button-div">
              <button type="button">Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
