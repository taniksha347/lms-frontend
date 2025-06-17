import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false); // you can initialize with a default user object
  const [loginUser,setLoginUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser ,loginUser,setLoginUser}}>
      {children}
    </UserContext.Provider>
  );
};
