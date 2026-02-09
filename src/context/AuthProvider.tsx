import React, { createContext, useState, useContext, type ReactNode } from "react";

// Define types
export type AuthType = {
  auth: object;
  setAuth: (val: object) => void;
};

// Create context
const AuthContext = createContext<AuthType | undefined>(undefined);

// Create provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<object>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
