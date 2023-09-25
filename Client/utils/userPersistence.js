import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useIsConnected } from "react-native-offline";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Change the initial value to null
  const [id, setId] = useState(0);

  const networkState = useIsConnected();

  // Function to set user data
  const setUserData = (userData) => {
    setUser(userData);
    setId(userData.id);
  };

  return (
    <UserContext.Provider
      value={{ user, setUserData, id, setId, networkState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
