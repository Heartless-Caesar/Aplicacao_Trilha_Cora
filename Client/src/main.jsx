import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import ReactDOM from "react-dom/client";
import { createContext } from "react";
import React from "react";
import App from "./App";
import "./index.css";

export const UserContext = createContext({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/Home",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
