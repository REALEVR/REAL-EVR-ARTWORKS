import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryGrid from "@/components/gallery-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import { useAuthPrompt } from "@/contexts/auth-prompt-context";

export default function ArtistProfile() {
  const { id } = useParams();
  const userId = parseInt(id);
  const { user } = useContext(UserContext);
  const { showAuthPrompt } = useAuthPrompt();

  const { data: artistData, isLoading: isLoadingUser } = useQuery({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: userGalleries, isLoading: isLoadingGalleries } = useQuery({
    queryKey: [`/api/users/${userId}/galleries`],
  });

  const { data: userArtworks, isLoading: isLoadingArtworks } = useQuery({
    queryKey: [`/api/users/${userId}/artworks`],
  });

  if (isLoadingUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="h-40 w-40 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-12 w-2/3 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // If no user is found, this would be replaced with proper error handling
  if (!artistData) {
    return <div className="container mx-auto px-4 py-12">Artist not found</div>;
  }

  // Function to prompt login for gallery access
  const handleGalleryClick = () => {
    if (!user) {
      showAuthPrompt(`/gallery/${id}`);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Artist Profile Header - Visible to everyone */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            {artistData.profileImage ? (
              <img 
                src={artistData.profileImage} 
                alt={`${artistData.name}'s profile`} 
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold">
                {artistData.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{artistData.name}</h1>
            <p className="text-gray-500 mb-4">@{artistData.username}</p>
            <p className="text-gray-700 max-w-3xl mb-6">{artistData.bio || "No bio provided"}</p>
            
            {/* Contact buttons only if user is logged in */}
            {user ? (
              <div className="flex space-x-4">
                <Button asChild>
                  <Link href="/message">Contact Artist</Link>
                </Button>
                <Button variant="outline">Follow</Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button onClick={() => showAuthPrompt("/login")}>
                  Sign in to Contact
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="galleries" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="galleries">Galleries</TabsTrigger>
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          {/* Galleries Tab - Shows previews, but requires login to enter */}
          <TabsContent value="galleries" className="pt-2">
            {user ? (
              // Full gallery grid for logged in users
              <GalleryGrid galleries={userGalleries || []} isLoading={isLoadingGalleries} />
            ) : (
              // Preview with sign-in prompt for non-logged in users
              <div>
                {isLoadingGalleries ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, index) => (
                      <Skeleton key={index} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                ) : userGalleries?.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {userGalleries.slice(0, 3).map((gallery: any) => (
                        <div key={gallery.id} 
                          className="relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
                          onClick={handleGalleryClick}
                        >
                          <img 
                            src={gallery.coverImage || '/images/gallery-placeholder.jpg'} 
                            alt={gallery.title}
                            className="w-full h-48 object-cover filter blur-[2px]"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                              <h3 className="font-serif text-xl mb-2">{gallery.title}</h3>
                              <Button size="sm" onClick={handleGalleryClick}>
                                Sign in to View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-6 text-center">
                      <h3 className="text-xl font-medium mb-3">View all {userGalleries.length} galleries</h3>
                      <p className="text-muted-foreground mb-4">Sign in to explore all virtual galleries from this artist</p>
                      <Button onClick={() => showAuthPrompt("/login")}>
                        Sign in to Access
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>No galleries available</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Artworks Tab - Visible to all */}
          <TabsContent value="artworks" className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoadingArtworks ? (
                Array(8).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <Skeleton className="w-full h-64" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
              ) : userArtworks?.length > 0 ? (
                userArtworks.map((artwork: any) => (
                  <div key={artwork.id} className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-semibold mb-1">{artwork.title}</h3>
                      <p className="text-sm text-gray-500">{artwork.medium}</p>
                      {artwork.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">{formatDate(artwork.createdAt)}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No artworks available
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* About Tab - Contact info only visible to logged in users */}
          <TabsContent value="about" className="pt-2">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl font-bold mb-4">About the Artist</h2>
              <p className="text-gray-700 mb-6">{artistData.bio || "No bio provided"}</p>
              
              {user ? (
                <>
                  <h3 className="font-serif text-xl font-bold mb-3">Contact</h3>
                  <p className="text-gray-700">{artistData.email}</p>
                </>
              ) : (
                <div className="bg-muted/20 rounded-lg p-6 mt-8 text-center">
                  <h3 className="text-xl font-medium mb-3">Contact Information</h3>
                  <p className="text-muted-foreground mb-4">Sign in to view contact details and get in touch with this artist</p>
                  <Button onClick={() => showAuthPrompt("/login")}>
                    Sign in to Access
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
