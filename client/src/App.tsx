import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import ArtistProfile from "@/pages/artist/profile";
import ArtistsList from "@/pages/artists";
import GalleryView from "@/pages/gallery/view";
import GalleryCreate from "@/pages/gallery/create";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Exhibitions from "@/pages/exhibitions";
import About from "@/pages/about";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthPromptProvider, useAuthPrompt } from "./contexts/auth-prompt-context";

// User context
type UserContextType = {
  user: { id: number; username: string; name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: number; username: string; name: string } | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

function Router() {
  const { user } = useContext(UserContext);
  const { showAuthPrompt } = useAuthPrompt();
  
  // Protect specific routes that require authentication
  const ProtectedRoute = ({ component: Component, path, ...rest }: { component: React.ComponentType, path: string, [key: string]: any }) => {
    return (
      <Route 
        path={path}
        component={(props) => {
          const location = path;
          
          // If user is not logged in, show auth prompt with this route as redirect target
          useEffect(() => {
            if (!user) {
              showAuthPrompt(location);
            }
          }, [user]);
          
          // Only render the component if user is logged in
          return user ? <Component {...props} {...rest} /> : null;
        }}
      />
    );
  };

  return (
    <Switch>
      {/* Public Routes - Accessible without login */}
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected Routes - Require Authentication */}
      <ProtectedRoute path="/" component={Home} />
      <ProtectedRoute path="/explore" component={Explore} />
      <ProtectedRoute path="/exhibitions" component={Exhibitions} />
      <ProtectedRoute path="/artists" component={ArtistsList} />
      <ProtectedRoute path="/artist/:id" component={ArtistProfile} />
      <ProtectedRoute path="/gallery/:id" component={GalleryView} />
      <ProtectedRoute path="/create-gallery" component={GalleryCreate} />
      
      {/* Default Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [user, setUser] = useState<{ id: number; username: string; name: string } | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <AuthPromptProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Toaster />
                <Router />
              </main>
              <Footer />
            </div>
          </AuthPromptProvider>
        </UserContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
