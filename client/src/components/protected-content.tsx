import { useContext, ReactNode } from "react";
import { UserContext } from "@/App";
import { useAuthPrompt } from "@/contexts/auth-prompt-context";

interface ProtectedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedContent({ children, fallback }: ProtectedContentProps) {
  const { user } = useContext(UserContext);
  const { showAuthPrompt } = useAuthPrompt();

  if (user) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // If no fallback is provided, trigger the auth prompt and render nothing
  showAuthPrompt();
  return null;
}