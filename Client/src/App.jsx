import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* 
  TODO Add main page component where the context is provided to all components
  ! Add context so that user persistence is possible
*/

export const UserContext = createContext({});

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

  return (
    <div className="App">
      <UserContext.Provider value={{ logged, setLogged }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
