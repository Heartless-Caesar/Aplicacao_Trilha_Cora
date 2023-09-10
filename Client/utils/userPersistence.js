import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Change the initial value to null
  const [id, setId] = useState(0);

  // Function to set user data
  const setUserData = (userData) => {
    setUser(userData);
    setId(userData.id);
  };

  return (
    <UserContext.Provider value={{ user, setUserData, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
