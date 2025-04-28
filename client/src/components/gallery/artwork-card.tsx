import { Link } from "wouter";
import { Artwork } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { truncateText } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
}

const ArtworkCard = ({ artwork, className = "" }: ArtworkCardProps) => {
  return (
    <Card className={`artwork-card rounded-lg overflow-hidden shadow-sm ${className}`}>
      <Link href={`/artwork/${artwork.id}`}>
        <a className="block">
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <h4 className="font-medium text-sm">{truncateText(artwork.title, 30)}</h4>
            <p className="text-xs text-gray-500">{artwork.medium || "Mixed media"}</p>
          </div>
        </a>
      </Link>
    </Card>
  );
};

export default ArtworkCard;
