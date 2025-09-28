import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedArtists() {
  // Get users from the database
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  // Map user data to artist format with additional metadata
  const processedArtists = Array.isArray(users) ? users.map(user => {
    // Extract art type from bio if available
    let artType = "Contemporary Artist";
    if (user.bio) {
      if (user.bio.toLowerCase().includes("abstract")) {
        artType = "Contemporary Abstract";
      } else if (user.bio.toLowerCase().includes("digital")) {
        artType = "Digital Surrealism";
      } else if (user.bio.toLowerCase().includes("mixed media")) {
        artType = "Mixed Media Expressionist";
      } else if (user.bio.toLowerCase().includes("classical") || user.bio.toLowerCase().includes("sculptor")) {
        artType = "Neo-Classical Sculpture";
      }
    }
    
    // For now, generate some gallery and artwork counts (these would come from real counts in a full app)
    const artworksCount = user.id * 3;
    const galleriesCount = Math.max(1, Math.floor(user.id / 2));
    
    return {
      ...user,
      artType,
      artworksCount,
      galleriesCount
    };
  }) : [];

  // Use the user data or empty array if not loaded yet
  const featuredArtists = processedArtists;

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Featured Artists</h2>
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
                  <h3 className="font-serif text-lg font-semibold text-foreground">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground">{artist.artType}</p>
                  <p className="text-sm text-muted-foreground mt-1">
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
