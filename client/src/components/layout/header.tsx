import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        
        <Link href="/">
          <a className="flex items-center">
            <span className="font-display text-2xl font-bold tracking-tight">Artscape</span>
          </a>
        </Link>
          <Link href="/explore">
            <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/explore" ? "text-accent" : ""}`}>
              Explore
            </a>
          </Link>
          <Link href="/artists">
            <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/artists" ? "text-accent" : ""}`}>
              Artists
            </a>
          </Link>
          <Link href="/exhibitions">
            <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/exhibitions" ? "text-accent" : ""}`}>
              Exhibitions
            </a>
          </Link>
          <Link href="/about">
            <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/about" ? "text-accent" : ""}`}>
              About
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/create-gallery">
                <Button variant="default" className="font-accent text-sm font-medium hidden md:block">
                  Create Gallery
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="font-accent text-sm font-medium"
                onClick={logout}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="default" className="font-accent text-sm font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  variant="outline" 
                  className="font-accent text-sm font-medium border-accent text-accent hover:bg-accent hover:text-white transition-colors hidden md:block"
                >
                  Create Gallery
                </Button>
              </Link>
            </>
          )}
          <Button
              variant="outline"
               className="md:hidden bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm"
              onClick={toggleMobileMenu}
>
  {mobileMenuOpen ? "X" : "≡"}
</Button>

      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link href="/explore">
              <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/explore" ? "text-accent" : ""}`}>
                Explore
              </a>
            </Link>
            <Link href="/artists">
              <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/artists" ? "text-accent" : ""}`}>
                Artists
              </a>
            </Link>
            <Link href="/exhibitions">
              <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/exhibitions" ? "text-accent" : ""}`}>
                Exhibitions
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-accent text-sm font-medium hover:text-accent transition-colors ${location === "/about" ? "text-accent" : ""}`}>
                About
              </a>
            </Link>
            {user && (
              <Link href="/create-gallery">
                <a className="font-accent text-sm font-medium text-accent">
                  Create Gallery
                </a>
              </Link>
            )}
          </nav>
        </div>
      )}
      </div>
    </header>
  );
};

export default Header;
