import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon, PaintbrushIcon, FrameIcon } from "lucide-react";

// Artist card component
const ArtistCard = ({ artist }: { artist: any }) => {
  // Get artist initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(artist.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{artist.name}</CardTitle>
            <CardDescription className="text-sm">@{artist.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold">12</p>
              <p className="text-xs text-muted-foreground">Artworks</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">3</p>
              <p className="text-xs text-muted-foreground">Galleries</p>
            </div>
          </div>
          <Badge variant="outline" className="font-normal">Mixed Media</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href={`/artist/${artist.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Loading skeleton for artist cards
const ArtistCardSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader className="p-4 pb-0">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-4">
          <div className="text-center">
            <Skeleton className="h-4 w-6 mx-auto mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="text-center">
            <Skeleton className="h-4 w-6 mx-auto mb-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex justify-end">
      <Skeleton className="h-8 w-24" />
    </CardFooter>
  </Card>
);

export default function ArtistsList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch artists from the API
  const { data: artists = [], isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  // Filter artists based on search query and active tab
  const filteredArtists = Array.isArray(artists)
    ? artists.filter((artist: any) => {
        const matchesSearch = artist.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesSearch;
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-3">
          Discover Artists
        </h1>
        <p className="text-gray-600">
          Connect with talented artists from around the world showcasing their work
          in our virtual galleries.
        </p>
      </div>

      <div className="mb-6 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search artists by name or style..."
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="absolute right-1 top-1 rounded-full h-9 px-4" variant="default" size="sm">
            Search
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all" className="flex gap-2 items-center">
                <UserIcon className="h-4 w-4" />
                <span>All Artists</span>
              </TabsTrigger>
              <TabsTrigger value="painters" className="flex gap-2 items-center">
                <PaintbrushIcon className="h-4 w-4" />
                <span>Painters</span>
              </TabsTrigger>
              <TabsTrigger value="sculptors" className="flex gap-2 items-center">
                <FrameIcon className="h-4 w-4" />
                <span>Sculptors</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <ArtistCardSkeleton key={index} />
            ))}
        </div>
      ) : filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No artists found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}