import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import type { User } from "@/contexts/user-context";

export function useAuth() {
  const { user, setUser } = useContext(UserContext);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}