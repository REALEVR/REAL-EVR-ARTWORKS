import { useContext, useState } from "react";
import { Link, useLocation } from "wouter";
import { UserContext } from "@/contexts/user-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Plus } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function Header() {
  const [location] = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    // In a real app, we would also clear session data from cookies/storage
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navigation = [
    { name: 'Explore', href: '/explore' },
    { name: 'Artists', href: '/artists' },
    { name: 'Exhibitions', href: '/exhibitions' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={logoImg} alt="REALEVR ART WORKS" className="h-11 w-auto" />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`font-medium text-sm text-white hover:text-accent transition-colors ${
                isActive(item.href) ? 'text-accent' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button asChild variant="outline" className="hidden md:flex text-white border-white hover:bg-white/10">
                <Link href="/create-gallery">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Gallery
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-2 text-white hover:bg-white/10 rounded-full overflow-hidden">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/artist/${user.id}`}>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-gallery">Create Gallery</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild className="md:bg-accent md:text-white">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="hidden md:inline-flex text-white border-white hover:bg-white/10">
                <Link href="/register">Create Gallery</Link>
              </Button>
            </>
          )}
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:max-w-sm">
              <div className="flex flex-col gap-6 pt-6">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`font-medium text-lg ${
                      isActive(item.href) ? 'text-accent' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!user && (
                  <div className="flex flex-col gap-3 mt-4">
                    <Button asChild size="lg">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        Create Gallery
                      </Link>
                    </Button>
                  </div>
                )}
                
                {user && (
                  <div className="flex flex-col gap-3 mt-4">
                    <Button asChild size="lg">
                      <Link href="/create-gallery" onClick={() => setMobileMenuOpen(false)}>
                        Create Gallery
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={`/artist/${user.id}`} onClick={() => setMobileMenuOpen(false)}>
                        My Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start px-2 text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
