import { createContext, ReactNode, useState } from "react";

// User type
export type User = {
  id: number;
  username: string;
  name: string;
  profileImage?: string;
};

// User context type
export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create the context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// User provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};