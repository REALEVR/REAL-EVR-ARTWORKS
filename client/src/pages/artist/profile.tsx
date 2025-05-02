import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryGrid from "@/components/gallery-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import ProtectedContent from "@/components/protected-content";

export default function ArtistProfile() {
  const { id } = useParams();
  const userId = parseInt(id);

  const { data: user, isLoading: isLoadingUser } = useQuery({
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
  if (!user) {
    return <div className="container mx-auto px-4 py-12">Artist not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={`${user.name}'s profile`} 
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-500 mb-4">@{user.username}</p>
            <p className="text-gray-700 max-w-3xl mb-6">{user.bio || "No bio provided"}</p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/message">Contact Artist</Link>
              </Button>
              <Button variant="outline">Follow</Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="galleries" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="galleries">Galleries</TabsTrigger>
            <TabsTrigger value="artworks">Artworks</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="galleries" className="pt-2">
            <GalleryGrid galleries={userGalleries || []} isLoading={isLoadingGalleries} />
          </TabsContent>
          
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
          
          <TabsContent value="about" className="pt-2">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl font-bold mb-4">About the Artist</h2>
              <p className="text-gray-700 mb-6">{user.bio || "No bio provided"}</p>
              
              <h3 className="font-serif text-xl font-bold mb-3">Contact</h3>
              <p className="text-gray-700">{user.email}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
