import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Gallery, User } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import GalleryCard from "@/components/gallery/gallery-card";
import { useAuth } from "@/hooks/use-auth";
import { Edit, Mail, Globe, ArrowLeft } from "lucide-react";

const ArtistPage = () => {
  const { id: artistId } = useParams();
  const { user: currentUser } = useAuth();
  
  const { data: artist, isLoading: isLoadingArtist } = useQuery<User>({
    queryKey: [`/api/users/${artistId}`],
  });
  
  const { data: galleries, isLoading: isLoadingGalleries } = useQuery<Gallery[]>({
    queryKey: [`/api/users/${artistId}/galleries`],
    enabled: !!artistId,
  });
  
  const isOwner = currentUser && artist && currentUser.id === artist.id;
  
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <Link href="/explore">
          <a className="inline-flex items-center text-accent mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to explore
          </a>
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          {isLoadingArtist ? (
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="h-48 w-48 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-10 w-64 mb-4" />
                  <Skeleton className="h-4 w-32 mb-6" />
                  <Skeleton className="h-24 w-full max-w-3xl mb-4" />
                  <div className="flex space-x-3">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            </div>
          ) : artist ? (
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <img 
                  src={artist.profileImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&h=300"} 
                  alt={artist.name} 
                  className="h-48 w-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="font-display text-3xl font-bold mb-2">{artist.name}</h1>
                  <p className="text-gray-600 mb-6">@{artist.username}</p>
                  
                  <p className="text-gray-800 mb-6">
                    {artist.bio || "No artist bio provided."}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {isOwner ? (
                      <Link href="/profile/edit">
                        <Button variant="outline">
                          <Edit size={16} className="mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                    ) : (
                      <Button>
                        <Mail size={16} className="mr-2" />
                        Contact Artist
                      </Button>
                    )}
                    <Button variant="outline">
                      <Globe size={16} className="mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <p>Artist not found</p>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="galleries" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="galleries">Galleries</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="galleries">
            {isLoadingGalleries ? (
              <div className="masonry-grid">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-5">
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : galleries && galleries.length > 0 ? (
              <div className="masonry-grid">
                {galleries.map(gallery => (
                  <GalleryCard key={gallery.id} gallery={gallery} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="font-display text-lg font-semibold mb-2">No galleries yet</h3>
                {isOwner ? (
                  <>
                    <p className="text-gray-600 mb-6">Create your first gallery to showcase your art</p>
                    <Link href="/create-gallery">
                      <Button>Create Gallery</Button>
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-600">This artist hasn't created any galleries yet.</p>
                )}
              </div>
            )}
            
            {!galleries && !isLoadingGalleries && (
              <div className="masonry-grid">
                <GalleryCard 
                  gallery={{
                    id: 1,
                    userId: parseInt(artistId!),
                    title: "Chromatic Dreams",
                    description: "A journey through color and abstraction featuring works that challenge conventional perception.",
                    coverImage: "https://images.unsplash.com/photo-1577083537648-e453e73f5ec3?auto=format&fit=crop&w=600&h=400",
                    featured: true
                  } as Gallery} 
                />
                <GalleryCard 
                  gallery={{
                    id: 2,
                    userId: parseInt(artistId!),
                    title: "Vibrant Expressions",
                    description: "Bold colors and dynamic compositions that evoke powerful emotional responses.",
                    coverImage: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&h=450",
                    featured: false
                  } as Gallery} 
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {isLoadingArtist ? (
                <div className="space-y-6">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : artist ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">Biography</h3>
                    <p className="text-gray-600">
                      {artist.bio || "No biography provided."}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">Artist Statement</h3>
                    <p className="text-gray-600">
                      As an artist, I aim to create work that challenges viewers' perceptions and invites them to see the world through a different lens. My practice is rooted in exploring the intersection of color, form, and emotion, drawing inspiration from both urban environments and natural landscapes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-3">Exhibitions</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>Solo Exhibition, Contemporary Art Gallery, New York, 2023</li>
                      <li>Group Show, Modern Art Museum, Los Angeles, 2022</li>
                      <li>Emerging Artists Showcase, International Art Fair, Berlin, 2021</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Artist information not available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistPage;
