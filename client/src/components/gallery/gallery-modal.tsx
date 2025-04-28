import { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gallery, Artwork, User } from "@shared/schema";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import ArtworkCard from "./artwork-card";

interface GalleryModalProps {
  galleryId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryModal = ({ galleryId, isOpen, onClose }: GalleryModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const { data: gallery } = useQuery<Gallery>({
    queryKey: [`/api/galleries/${galleryId}`],
    enabled: isOpen && !!galleryId,
  });

  const { data: artist } = useQuery<User>({
    queryKey: [`/api/users/${gallery?.userId}`],
    enabled: isOpen && !!gallery?.userId,
  });

  const { data: artworks } = useQuery<Artwork[]>({
    queryKey: [`/api/galleries/${galleryId}/artworks`],
    enabled: isOpen && !!galleryId,
  });

  const artistInitials = artist?.name
    ? artist.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "A";

  if (!isOpen || !galleryId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-auto" ref={contentRef}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {gallery && (
          <>
            <img 
              src={gallery.coverImage || "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&h=600"} 
              alt="Gallery cover" 
              className="w-full h-64 md:h-80 object-cover"
            />
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                <div>
                  <DialogTitle className="font-display text-2xl md:text-3xl font-bold mb-2">
                    {gallery.title}
                  </DialogTitle>
                  <div className="flex items-center mb-4">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={artist?.profileImage} alt={artist?.name || "Artist"} />
                      <AvatarFallback>{artistInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{artist?.name}</p>
                      <p className="text-sm text-gray-500">
                        Created {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                  <DialogDescription className="text-gray-600 max-w-2xl">
                    {gallery.description || "No description provided."}
                  </DialogDescription>
                </div>
                
                <div className="mt-6 md:mt-0">
                  <Button className="w-full md:w-auto">
                    Enter Virtual Gallery
                  </Button>
                </div>
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-4">Gallery Highlights</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {artworks && artworks.length > 0 
                  ? artworks.slice(0, 3).map(artwork => (
                      <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))
                  : Array(3).fill(0).map((_, i) => (
                      <div key={i} className="artwork-card rounded-lg overflow-hidden shadow-sm">
                        <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                          <p className="text-gray-400 text-sm">No artwork</p>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm">Artwork Title</h4>
                          <p className="text-xs text-gray-500">Artwork Medium</p>
                        </div>
                      </div>
                    ))
                }
              </div>
              
              <Separator className="my-8" />
              
              <h3 className="font-display text-xl font-semibold mb-4">About the Artist</h3>
              <p className="text-gray-600">
                {artist?.bio || "No artist bio provided."}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
