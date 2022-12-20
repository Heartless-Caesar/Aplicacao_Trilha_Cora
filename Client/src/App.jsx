import { useState } from "react";
import FileDownload from "js-file-download";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

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
        <UserContext.Provider value={{ logged, setLogged }}>
          <Login />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
