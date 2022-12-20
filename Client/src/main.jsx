import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { createContext } from "react";
import React from "react";
import App from "./App";
import "./index.css";
import Login from "./components/Login";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/Home",
        element: <App />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
