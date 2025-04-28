import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Artwork, Gallery, User } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from "@/components/gallery/artwork-card";
import { useAuth } from "@/hooks/use-auth";
import { Edit, ArrowLeft, Plus } from "lucide-react";

const GalleryPage = () => {
  const { id: galleryId } = useParams();
  const { user: currentUser } = useAuth();
  
  const { data: gallery, isLoading: isLoadingGallery } = useQuery<Gallery>({
    queryKey: [`/api/galleries/${galleryId}`],
  });
  
  const { data: artworks, isLoading: isLoadingArtworks } = useQuery<Artwork[]>({
    queryKey: [`/api/galleries/${galleryId}/artworks`],
  });
  
  const { data: artist, isLoading: isLoadingArtist } = useQuery<User>({
    queryKey: [`/api/users/${gallery?.userId}`],
    enabled: !!gallery?.userId,
  });
  
  const isOwner = currentUser && gallery && currentUser.id === gallery.userId;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Header */}
      <div className="w-full">
        {isLoadingGallery ? (
          <Skeleton className="w-full h-64 md:h-80" />
        ) : gallery?.coverImage ? (
          <img 
            src={gallery.coverImage} 
            alt={gallery.title} 
            className="w-full h-64 md:h-80 object-cover"
          />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No cover image</p>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/explore">
          <a className="inline-flex items-center text-accent mb-4 hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to explore
          </a>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            {isLoadingGallery ? (
              <>
                <Skeleton className="h-10 w-64 mb-4" />
                <div className="flex items-center mb-4">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full max-w-2xl" />
              </>
            ) : gallery ? (
              <>
                <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{gallery.title}</h1>
                <div className="flex items-center mb-4">
                  {isLoadingArtist ? (
                    <>
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </>
                  ) : artist ? (
                    <>
                      <img 
                        src={artist.profileImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=64&h=64"} 
                        alt={artist.name} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-sm text-gray-500">Created {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                      </div>
                    </>
                  ) : null}
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {gallery.description || "No description provided."}
                </p>
              </>
            ) : (
              <p>Gallery not found</p>
            )}
          </div>
          
          <div className="mt-6 md:mt-0">
            {isOwner && (
              <div className="space-y-2">
                <Link href={`/upload-artwork/${galleryId}`}>
                  <Button className="w-full md:w-auto">
                    <Plus size={16} className="mr-2" />
                    Add Artwork
                  </Button>
                </Link>
                <Link href={`/edit-gallery/${galleryId}`}>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Edit size={16} className="mr-2" />
                    Edit Gallery
                  </Button>
                </Link>
              </div>
            )}
            
            {!isOwner && !isLoadingGallery && gallery && (
              <Button className="bg-accent text-white font-accent font-medium rounded-md px-4 py-2 shadow-sm hover:shadow transition-shadow w-full md:w-auto">
                Enter Virtual Gallery
              </Button>
            )}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <h2 className="font-display text-xl font-semibold mb-6">Gallery Artwork</h2>
        
        {isLoadingArtworks ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="w-full h-40" />
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : artworks && artworks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="font-display text-lg font-semibold mb-2">No artwork in this gallery yet</h3>
            {isOwner ? (
              <>
                <p className="text-gray-600 mb-6">Add your first artwork to get started</p>
                <Link href={`/upload-artwork/${galleryId}`}>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Add Artwork
                  </Button>
                </Link>
              </>
            ) : (
              <p className="text-gray-600">The artist hasn't added any artwork to this gallery yet.</p>
            )}
          </div>
        )}
        
        {!artworks && !isLoadingArtworks && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ArtworkCard 
              artwork={{
                id: 1,
                userId: 1,
                galleryId: parseInt(galleryId!),
                title: "Emotional Currents #3",
                description: "Exploring the depth of human emotion through color.",
                medium: "Acrylic on canvas",
                image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=400&h=300"
              } as Artwork} 
            />
            <ArtworkCard 
              artwork={{
                id: 2,
                userId: 1,
                galleryId: parseInt(galleryId!),
                title: "Chromatic Cascade",
                description: "A study in color transitions and movement.",
                medium: "Oil on panel",
                image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&h=300"
              } as Artwork} 
            />
            <ArtworkCard 
              artwork={{
                id: 3,
                userId: 1,
                galleryId: parseInt(galleryId!),
                title: "Structured Chaos",
                description: "Finding order in apparent randomness.",
                medium: "Mixed media",
                image: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=400&h=300"
              } as Artwork} 
            />
          </div>
        )}
        
        <Separator className="my-8" />
        
        <div className="mb-8">
          <h3 className="font-display text-xl font-semibold mb-4">About the Artist</h3>
          {isLoadingArtist ? (
            <Skeleton className="h-24 w-full max-w-3xl" />
          ) : artist ? (
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img 
                src={artist.profileImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&h=200"} 
                alt={artist.name} 
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-display text-lg font-semibold mb-2">{artist.name}</h4>
                <p className="text-gray-600">
                  {artist.bio || "No artist bio provided."}
                </p>
                <Link href={`/artist/${artist.id}`}>
                  <a className="text-accent hover:underline mt-3 inline-block">View full profile</a>
                </Link>
              </div>
            </div>
          ) : (
            <p>Artist information not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
