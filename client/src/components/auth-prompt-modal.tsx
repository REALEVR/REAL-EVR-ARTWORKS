import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logoImg from "../assets/logo.png";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export default function AuthPromptModal({ isOpen, onClose, targetUrl }: AuthPromptModalProps) {
  // Handle the close event by both calling the provided onClose handler
  // and dispatching a custom event that our components can listen for
  const handleClose = () => {
    // Call the provided onClose handler
    onClose();
    
    // Dispatch a custom event that our components can listen for
    const closeEvent = new CustomEvent('authPromptClosed', {
      detail: { targetUrl }
    });
    document.dispatchEvent(closeEvent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logoImg} alt="REALEVR ART WORKS" className="h-14 w-auto" />
          </div>
          <DialogTitle className="text-2xl font-bold">Join REALEVR ART WORKS</DialogTitle>
          <DialogDescription>
            Sign in or create an account to view artist profiles, artwork details, and interact with our virtual galleries.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <Button asChild className="w-full font-medium bg-black hover:bg-black/80">
            <Link href={`/login?redirect=${encodeURIComponent(targetUrl)}`}>
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full font-medium">
            <Link href={`/register?redirect=${encodeURIComponent(targetUrl)}`}>
              Create Account
            </Link>
          </Button>
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>By joining, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
        <button 
          onClick={handleClose} 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}