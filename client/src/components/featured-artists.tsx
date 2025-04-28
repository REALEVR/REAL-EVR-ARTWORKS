import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedArtists() {
  // In a real app, you would have a dedicated endpoint for featured artists
  // For now, we'll use the first few users as "featured"
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  // Mock data for the featured artists until we have real data
  const mockFeaturedArtists = [
    {
      id: 1,
      name: "Elena Vasquez",
      username: "elena",
      profileImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=400",
      artType: "Contemporary Abstract",
      artworksCount: 12,
      galleriesCount: 3
    },
    {
      id: 2,
      name: "Marcus Chen",
      username: "marcus",
      profileImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&h=400",
      artType: "Digital Surrealism",
      artworksCount: 24,
      galleriesCount: 5
    },
    {
      id: 3,
      name: "Sophia Kim",
      username: "sophia",
      profileImage: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?auto=format&fit=crop&w=400&h=400",
      artType: "Mixed Media Expressionist",
      artworksCount: 18,
      galleriesCount: 2
    },
    {
      id: 4,
      name: "James Donovan",
      username: "james",
      profileImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&h=400", 
      artType: "Neo-Classical Sculpture",
      artworksCount: 9,
      galleriesCount: 1
    }
  ];

  const featuredArtists = users || mockFeaturedArtists;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-serif text-3xl font-bold">Featured Artists</h2>
          <Link href="/artists" className="font-medium text-sm text-accent hover:underline">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton className="h-64 w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : (
            // Actual artist cards
            featuredArtists.slice(0, 4).map((artist) => (
              <div key={artist.id} className="group">
                <Link href={`/artist/${artist.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src={artist.profileImage} 
                      alt={`${artist.name} - Artist`} 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-medium text-sm">View Profile</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{artist.name}</h3>
                  <p className="text-sm text-gray-600">{artist.artType}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {artist.artworksCount} Artworks · {artist.galleriesCount} Galleries
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
