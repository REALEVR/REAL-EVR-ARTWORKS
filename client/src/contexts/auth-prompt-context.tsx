import React, { createContext, useContext, useState, ReactNode } from "react";
import AuthPromptModal from "@/components/auth-prompt-modal";
import { useLocation } from "wouter";

type AuthPromptContextType = {
  showAuthPrompt: (targetUrl?: string) => void;
  hideAuthPrompt: () => void;
};

const AuthPromptContext = createContext<AuthPromptContextType | undefined>(undefined);

export function AuthPromptProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string>("");

  const showAuthPrompt = (url?: string) => {
    setTargetUrl(url || location);
    setIsOpen(true);
  };

  const hideAuthPrompt = () => {
    setIsOpen(false);
  };

  return (
    <AuthPromptContext.Provider value={{ showAuthPrompt, hideAuthPrompt }}>
      {children}
      <AuthPromptModal 
        isOpen={isOpen} 
        onClose={hideAuthPrompt} 
        targetUrl={targetUrl} 
      />
    </AuthPromptContext.Provider>
  );
}

export function useAuthPrompt() {
  const context = useContext(AuthPromptContext);
  if (context === undefined) {
    throw new Error("useAuthPrompt must be used within an AuthPromptProvider");
  }
  return context;
}