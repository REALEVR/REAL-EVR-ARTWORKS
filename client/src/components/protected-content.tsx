import { useContext, ReactNode, useEffect, useState } from "react";
import { UserContext } from "@/App";
import { useAuthPrompt } from "@/contexts/auth-prompt-context";
import { useLocation } from "wouter";

interface ProtectedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedContent({ children, fallback }: ProtectedContentProps) {
  const { user } = useContext(UserContext);
  const { showAuthPrompt } = useAuthPrompt();
  const [location] = useLocation();
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    // Only show auth prompt if user is not logged in and no fallback is provided
    if (!user && !fallback && !shouldShow) {
      showAuthPrompt(location);
      setShouldShow(true);
    }
  }, [user, fallback, location, shouldShow, showAuthPrompt]);

  if (user) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Return null when not authenticated and no fallback
  return null;
}