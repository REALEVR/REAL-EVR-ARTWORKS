import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import type { User } from "@/contexts/user-context";

export function useAuth() {
  const { user, setUser } = useContext(UserContext);

  const login = (userData: User, token: string) => {
    localStorage.setItem('access_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}