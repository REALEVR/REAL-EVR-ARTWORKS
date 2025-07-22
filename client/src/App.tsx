import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
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
import { UserContext, UserProvider } from "./contexts/user-context";
import Settings from "./pages/settings";

function Router() {
  const { user } = useContext(UserContext);
  const { showAuthPrompt } = useAuthPrompt();
  
  // Component for routes that require authentication but still allow viewing non-protected content
  const ProtectedRoute = ({ component: Component, path }: { component: React.ComponentType<any>, path: string }) => {
    // Wrapper component to handle authentication logic
    const ProtectedWrapper = (props: any) => {
      const [showPrompt, setShowPrompt] = useState(false);
      const [showFallback, setShowFallback] = useState(false);

      useEffect(() => {
        if (!user && !showPrompt && !showFallback) {
          showAuthPrompt(path);
          setShowPrompt(true);
        }
      }, [user, path, showPrompt, showFallback]);

      useEffect(() => {
        const handleAuthClosed = () => {
          if (!user && showPrompt) {
            setShowFallback(true);
          }
        };
        document.addEventListener('authPromptClosed', handleAuthClosed);
        return () => {
          document.removeEventListener('authPromptClosed', handleAuthClosed);
        };
      }, [user, showPrompt]);

      if (user) {
        return <Component {...props} />;
      }

      if (showFallback) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="mb-6 text-muted-foreground max-w-md">
              You need to be signed in to view this content. You can go back or try signing in again.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => window.history.back()} variant="outline">
                Go Back
              </Button>
              <Button onClick={() => {
                setShowFallback(false);
                setShowPrompt(false);
              }}>
                Sign In
              </Button>
            </div>
          </div>
        );
      }

      return null;
    };

    return <Route path={path} component={ProtectedWrapper} />;
  };

  return (
    <Switch>
      {/* Public Routes - Accessible without login */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/explore" component={Explore} />
      <Route path="/exhibitions" component={Exhibitions} />
      <Route path="/artists" component={ArtistsList} />
      <Route path="/artist/:id" component={ArtistProfile} />
      
      
      {/* Protected Routes - Require Authentication */}
      <ProtectedRoute path="/gallery/:id" component={GalleryView} />
      <ProtectedRoute path="/create-gallery" component={GalleryCreate} />
      
      {/* Default Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
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
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
