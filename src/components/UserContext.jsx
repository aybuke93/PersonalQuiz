import React, { createContext, useState } from "react";

// the UserContext
export const UserContext = createContext();

// the UserProvider component
export default function UserProvider({ children }) {
  const [name, setName] = useState("");

  return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>;
}

//Not: This will let the user add their name to the quiz before they get started so it can appear on the results page once they finish