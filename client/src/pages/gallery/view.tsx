import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Share2, Lock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ProtectedContent from "@/components/protected-content";

export default function GalleryView() {
  const { id } = useParams();
  const galleryId = parseInt(id);

  const { data: gallery, isLoading: isLoadingGallery } = useQuery({
    queryKey: [`/api/galleries/${galleryId}`],
  });

  const { data: artworks, isLoading: isLoadingArtworks } = useQuery({
    queryKey: [`/api/galleries/${galleryId}/artworks`],
  });

  const { data: artist, isLoading: isLoadingArtist } = useQuery({
    queryKey: gallery ? [`/api/users/${gallery.userId}`] : null,
    enabled: !!gallery,
  });

  if (isLoadingGallery || isLoadingArtworks || isLoadingArtist) {
    return (
      <div className="min-h-screen bg-white">
        <Skeleton className="w-full h-64 md:h-80" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-2/3 mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-12 w-12 rounded-full mr-3" />
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-24 w-full mb-8" />
          
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-3">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return <div className="container mx-auto px-4 py-12">Gallery not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Cover Image */}
      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        {gallery.coverImage ? (
          <img 
            src={gallery.coverImage} 
            alt={gallery.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No cover image available
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4 bg-white/80 hover:bg-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">{gallery.title}</h1>
            
            {artist && (
              <div className="flex items-center mb-6">
                {artist.profileImage ? (
                  <img 
                    src={artist.profileImage} 
                    alt={artist.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                    {artist.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{artist.name}</p>
                  {gallery.createdAt && (
                    <p className="text-sm text-gray-500">Created {formatDate(gallery.createdAt)}</p>
                  )}
                </div>
              </div>
            )}
            
            <p className="text-gray-700 max-w-2xl mb-6">
              {gallery.description || "No description provided."}
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex space-x-3">
            <Button className="gap-2">
              <ExternalLink size={16} />
              Enter Virtual Gallery
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 size={16} />
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold mb-6">Gallery Artworks</h2>
          
          <ProtectedContent
            fallback={
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 blur-sm opacity-70">
                  {artworks?.length > 0 ? artworks.slice(0, 4).map((artwork: any) => (
                    <div key={artwork.id} className="rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-3">
                        <h3 className="font-medium text-lg">{artwork.title}</h3>
                        <p className="text-sm text-gray-500">{artwork.medium}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                      No artworks available in this gallery
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white p-6 rounded-lg text-center max-w-md backdrop-blur-sm">
                    <Lock className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Premium Artwork</h3>
                    <p className="mb-4">Sign in to view all artworks in this gallery and unlock the full experience.</p>
                    <Button className="w-full">Sign in to Continue</Button>
                  </div>
                </div>
              </div>
            }
          >
            {artworks?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artworks.map((artwork: any) => (
                  <div key={artwork.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-lg">{artwork.title}</h3>
                      <p className="text-sm text-gray-500">{artwork.medium}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                No artworks available in this gallery
              </div>
            )}
          </ProtectedContent>
        </div>
        
        {artist && (
          <div className="pt-6 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-semibold mb-4">About the Artist</h2>
            <p className="text-gray-700">
              {artist.bio || `${artist.name} has not provided a bio yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
