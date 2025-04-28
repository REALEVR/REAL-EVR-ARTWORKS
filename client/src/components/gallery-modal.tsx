import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface GalleryModalProps {
  gallery: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ gallery, isOpen, onClose }: GalleryModalProps) {
  if (!gallery) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-auto p-0">
        <img 
          src={gallery.coverImage} 
          alt={`${gallery.title} cover`} 
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <DialogTitle className="font-serif text-2xl md:text-3xl font-bold mb-2">
                {gallery.title}
              </DialogTitle>
              
              <div className="flex items-center mb-4">
                <img 
                  src={gallery.user?.profileImage} 
                  alt={`${gallery.user?.name} avatar`} 
                  className="w-10 h-10 rounded-full mr-3 object-cover" 
                />
                <div>
                  <p className="font-medium">{gallery.user?.name}</p>
                  {gallery.createdAt && (
                    <p className="text-sm text-gray-500">Created {formatDate(gallery.createdAt)}</p>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 max-w-2xl">
                {gallery.description || "No description provided."}
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <Button asChild>
                <Link href={`/gallery/${gallery.id}`} className="flex items-center gap-2">
                  Enter Virtual Gallery
                  <ExternalLink size={16} />
                </Link>
              </Button>
            </div>
          </div>
          
          <h3 className="font-serif text-xl font-semibold mb-4">Gallery Highlights</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* We would fetch the actual artworks here, for now using mock data */}
            <div className="artwork-card rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=400&h=300" 
                alt="Abstract painting" 
                className="w-full h-40 object-cover" 
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">Emotional Currents #3</h4>
                <p className="text-xs text-gray-500">Acrylic on canvas</p>
              </div>
            </div>
            
            <div className="artwork-card rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&h=300" 
                alt="Abstract painting" 
                className="w-full h-40 object-cover" 
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">Chromatic Cascade</h4>
                <p className="text-xs text-gray-500">Oil on panel</p>
              </div>
            </div>
            
            <div className="artwork-card rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=400&h=300" 
                alt="Abstract painting" 
                className="w-full h-40 object-cover" 
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">Structured Chaos</h4>
                <p className="text-xs text-gray-500">Mixed media</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-serif text-xl font-semibold mb-4">About the Artist</h3>
            <p className="text-gray-600">
              {gallery.user?.bio || `${gallery.user?.name} is a contemporary artist sharing their work through virtual galleries.`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
