import { Link } from "wouter";
import { User } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { truncateText } from "@/lib/utils";

interface ArtistCardProps {
  artist: User;
  className?: string;
}

const ArtistCard = ({ artist, className = "" }: ArtistCardProps) => {
  // Get the number of artworks and galleries for this artist
  const { data: galleries } = useQuery({
    queryKey: [`/api/users/${artist.id}/galleries`],
    enabled: !!artist.id,
  });

  const { data: artworks } = useQuery({
    queryKey: [`/api/users/${artist.id}/artworks`],
    enabled: !!artist.id,
  });
  
  const artworkCount = artworks?.length || 0;
  const galleryCount = galleries?.length || 0;

  return (
    <div className={`group ${className}`}>
      <Link href={`/artist/${artist.id}`}>
        <a className="block">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <img 
              src={artist.profileImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=400"} 
              alt={`Artist ${artist.name}`} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-accent text-sm font-medium">View Profile</span>
            </div>
          </div>
          <h3 className="font-display text-lg font-semibold">{artist.name}</h3>
          <p className="text-sm text-gray-600">{truncateText(artist.bio || "", 30)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {artworkCount} {artworkCount === 1 ? "Artwork" : "Artworks"} · {galleryCount} {galleryCount === 1 ? "Gallery" : "Galleries"}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default ArtistCard;
