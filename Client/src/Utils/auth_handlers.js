import axios from "axios";

const Login = async (username, password) => {
  await axios({
    method: "POST",
    url: "http://localhost:3000/Login",
    responseType: "application/json",
  }).then((res) => {});
};
