import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const Register = () => {
  const { logged, setLogged } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:3000/Register",
      data: {
        email: username,
        username: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        setLogged(true);
        navigate("/Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="login-container">
        <div className="credential-div">
          <label htmlFor="username" className="cred-text">
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
          <label htmlFor="email" className="cred-text">
            Email
          </label>
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="credential-div">
          <label htmlFor="password" className="cred-text">
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
          <button type="button" onClick={() => registerUser()}>
            Register
          </button>
        </div>
        <div id="button-div">
          <button
            style={{ marginTop: "10px" }}
            type="button"
            onClick={() => navigate("/Home")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
