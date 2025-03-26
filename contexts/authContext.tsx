import { PrismUser } from "@/interfaces/user";
import { usePrivy } from "@privy-io/expo";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: PrismUser | null;
  loginGlobal: (userData: any) => void;
  logoutGlobal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PrismUser | null>(null);

  const loginGlobal = (sanitizeduser) => {
    setUser(sanitizeduser);
  };
  const logoutGlobal = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginGlobal, logoutGlobal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
