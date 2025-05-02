import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext } from "react";
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
  
  const ProtectedComponent = ({ component: Component, ...props }: { component: React.ComponentType, [key: string]: any }) => {
    if (user) {
      return <Component {...props} />;
    } else {
      // Show auth prompt
      showAuthPrompt();
      return null;
    }
  };

  return (
    <Switch>
      <Route path="/" component={(props) => <ProtectedComponent component={Home} {...props} />} />
      <Route path="/explore" component={(props) => <ProtectedComponent component={Explore} {...props} />} />
      <Route path="/exhibitions" component={(props) => <ProtectedComponent component={Exhibitions} {...props} />} />
      <Route path="/artists" component={(props) => <ProtectedComponent component={ArtistsList} {...props} />} />
      <Route path="/artist/:id" component={(props) => <ProtectedComponent component={ArtistProfile} {...props} />} />
      <Route path="/gallery/:id" component={(props) => <ProtectedComponent component={GalleryView} {...props} />} />
      <Route path="/create-gallery" component={(props) => <ProtectedComponent component={GalleryCreate} {...props} />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about" component={About} />
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
