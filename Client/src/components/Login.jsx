import { UserContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logged, setLogged } = useContext(UserContext);

  const loginUser = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:3000/Login",
      data: {
        email: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        setLogged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
          <button type="button" onClick={() => loginUser()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
