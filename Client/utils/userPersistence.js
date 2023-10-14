import React, { createContext, useContext, useState } from "react";
import { useIsConnected } from "react-native-offline";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(0);
  const [locals, setLocals] = useState([]);

  const networkState = useIsConnected();

  const setUserData = (userData) => {
    setUser(userData.user);
    setId(userData.id);
    //console.log(id);
  };

  const setUserLocals = (userLocals) => {
    setLocals(userLocals);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
        id,
        setId,
        networkState,
        locals,
        setUserLocals,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
