import React, { createContext, useContext, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [id, setId] = useState(0);

  const token = "your-jwt-token-here";

  // Your JWT secret key (the same key used to sign the token on the server)
  const secretKey = "your-secret-key";

  // Verify and decode the token
  try {
    const decodedToken = jwt.verify(token, secretKey);

    // The decodedToken variable now contains the data from the token
    console.log("Decoded Token:", decodedToken);

    // You can access specific data fields from the token
    const username = decodedToken.username;
    const userId = decodedToken.userId;

    // Use the extracted data as needed
    setUser(username);
    setId(id);
    console.log("Username:", username);
    console.log("User ID:", userId);
  } catch (error) {
    console.error("Token verification failed:", error.message);
  }

  return (
    <UserContext.Provider value={{ user, id }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
