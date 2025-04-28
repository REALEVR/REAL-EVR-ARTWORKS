import { Link } from "wouter";
import { Gallery, User } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/lib/utils";

interface GalleryCardProps {
  gallery: Gallery;
  className?: string;
}

const GalleryCard = ({ gallery, className = "" }: GalleryCardProps) => {
  const { data: artist } = useQuery<User>({
    queryKey: [`/api/users/${gallery.userId}`],
    enabled: !!gallery.userId,
  });

  const artistInitials = artist?.name
    ? artist.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "AR";

  return (
    <Card className={`artwork-card rounded-lg overflow-hidden shadow-md bg-white ${className}`}>
      <Link href={`/gallery/${gallery.id}`}>
        <a className="block">
          <div className="relative">
            <img
              src={gallery.coverImage || "https://images.unsplash.com/photo-1577083537648-e453e73f5ec3?auto=format&fit=crop&w=600&h=400"}
              alt={gallery.title}
              className="w-full h-64 object-cover"
            />
            {gallery.featured && (
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-accent shadow-sm">
                Featured
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold mb-2">{gallery.title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {truncateText(gallery.description || "No description provided.", 100)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage 
                    src={artist?.profileImage} 
                    alt={artist?.name || "Artist"} 
                  />
                  <AvatarFallback>{artistInitials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{artist?.name || "Artist"}</span>
              </div>
              <Badge variant="outline" className="text-xs text-gray-500">
                Gallery
              </Badge>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default GalleryCard;
