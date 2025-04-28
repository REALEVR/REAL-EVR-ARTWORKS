import { useState } from "react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import GalleryModal from "@/components/gallery-modal";
import { truncateText } from "@/lib/utils";

interface GalleryGridProps {
  galleries: any[];
  isLoading: boolean;
}

export default function GalleryGrid({ galleries, isLoading }: GalleryGridProps) {
  const [selectedGallery, setSelectedGallery] = useState<any | null>(null);
  
  const openModal = (gallery: any) => {
    setSelectedGallery(gallery);
  };
  
  const closeModal = () => {
    setSelectedGallery(null);
  };

  // Mock data for testing
  const mockGalleries = [
    {
      id: 1,
      title: "Chromatic Dreams",
      description: "A journey through color and abstraction featuring works that challenge conventional perception.",
      coverImage: "https://images.unsplash.com/photo-1577083537648-e453e73f5ec3?auto=format&fit=crop&w=600&h=400",
      isFeatured: true,
      userId: 1,
      user: {
        id: 1,
        name: "Elena Vasquez",
        profileImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=64&h=64"
      },
      artworksCount: 15
    },
    {
      id: 2,
      title: "Fragmented Reality",
      description: "Mixed media works exploring the intersection of technology and human expression.",
      coverImage: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?auto=format&fit=crop&w=600&h=600",
      userId: 3,
      user: {
        id: 3,
        name: "Sophia Kim",
        profileImage: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?auto=format&fit=crop&w=64&h=64"
      },
      artworksCount: 12
    },
    {
      id: 3,
      title: "Form & Void",
      description: "An exploration of negative space and sculptural elements in contemporary art.",
      coverImage: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?auto=format&fit=crop&w=600&h=500",
      userId: 4,
      user: {
        id: 4,
        name: "James Donovan",
        profileImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=64&h=64"
      },
      artworksCount: 9
    },
    {
      id: 4,
      title: "Digital Frontiers",
      description: "Cutting-edge digital artwork pushing the boundaries of technology and imagination.",
      coverImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&h=350",
      userId: 2,
      user: {
        id: 2,
        name: "Marcus Chen",
        profileImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=64&h=64"
      },
      artworksCount: 24
    },
    {
      id: 5,
      title: "Vibrant Expressions",
      description: "Bold colors and dynamic compositions that evoke powerful emotional responses.",
      coverImage: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&h=450",
      userId: 1,
      user: {
        id: 1,
        name: "Elena Vasquez",
        profileImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=64&h=64"
      },
      artworksCount: 8
    }
  ];

  // Use mock galleries for now as a fallback
  const displayGalleries = galleries.length > 0 ? galleries : mockGalleries;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {isLoading ? (
          // Skeleton loading state
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white">
              <Skeleton className="w-full h-64" />
              <div className="p-5">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="w-8 h-8 rounded-full mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))
        ) : (
          displayGalleries.map((gallery) => (
            <div 
              key={gallery.id} 
              className="artwork-card rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg cursor-pointer"
              onClick={() => openModal(gallery)}
            >
              <div className="relative">
                <img 
                  src={gallery.coverImage} 
                  alt={gallery.title} 
                  className="w-full h-64 object-cover" 
                />
                {gallery.isFeatured && (
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold mb-2">{gallery.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{truncateText(gallery.description || "", 100)}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={gallery.user?.profileImage} 
                      alt={`${gallery.user?.name} avatar`} 
                      className="w-8 h-8 rounded-full mr-2 object-cover" 
                    />
                    <span className="text-sm font-medium">{gallery.user?.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{gallery.artworksCount} Artworks</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedGallery && (
        <GalleryModal gallery={selectedGallery} isOpen={!!selectedGallery} onClose={closeModal} />
      )}
    </>
  );
}
