import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GalleryGrid from "@/components/gallery-grid";
import { Button } from "@/components/ui/button";
import { getGalleryStyleOptions } from "@/lib/utils";

export default function Explore() {
  const [selectedStyle, setSelectedStyle] = useState("all");
  
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["/api/galleries"],
  });

  const styleOptions = getGalleryStyleOptions();

  // Filter galleries if needed (in a real app, this would likely be done server-side)
  const filteredGalleries = selectedStyle === "all" 
    ? galleries 
    : galleries?.filter((gallery: any) => {
        // This is just a placeholder - in a real app, galleries would have a style property
        // For now, we'll just return all galleries regardless of the filter
        return true;
      });

  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Explore Virtual Galleries</h1>
          
          <div className="flex flex-wrap gap-2">
            {styleOptions.map(style => (
              <Button
                key={style.value}
                variant={selectedStyle === style.value ? "default" : "outline"}
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedStyle === style.value ? "" : "hover:bg-white hover:shadow"
                }`}
                onClick={() => setSelectedStyle(style.value)}
              >
                {style.label}
              </Button>
            ))}
          </div>
        </div>
        
        <GalleryGrid galleries={filteredGalleries || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
