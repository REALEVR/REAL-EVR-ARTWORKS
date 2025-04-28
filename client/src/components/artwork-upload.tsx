import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getArtMediumOptions } from "@/lib/utils";
import { PlusCircle, ImagePlus, X, Upload } from "lucide-react";

interface ArtworkUploadProps {
  galleryId: number;
  userId: number;
  onFinish: () => void;
}

export default function ArtworkUpload({ galleryId, userId, onFinish }: ArtworkUploadProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [artworks, setArtworks] = useState<{ 
    title: string;
    description: string;
    medium: string;
    image: File | null;
    preview: string;
  }[]>([{ 
    title: "", 
    description: "", 
    medium: "oil", 
    image: null,
    preview: ""
  }]);

  const mediumOptions = getArtMediumOptions();

  const uploadArtworkMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/artworks", formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/galleries/${galleryId}/artworks`] });
    },
    onError: (error) => {
      toast({
        title: "Failed to upload artwork",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleAddArtwork = () => {
    setArtworks([
      ...artworks,
      { title: "", description: "", medium: "oil", image: null, preview: "" }
    ]);
  };

  const handleRemoveArtwork = (index: number) => {
    if (artworks.length > 1) {
      const newArtworks = [...artworks];
      newArtworks.splice(index, 1);
      setArtworks(newArtworks);
    }
  };

  const handleArtworkChange = (index: number, field: string, value: string) => {
    const newArtworks = [...artworks];
    newArtworks[index] = { ...newArtworks[index], [field]: value };
    setArtworks(newArtworks);
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newArtworks = [...artworks];
      newArtworks[index] = { 
        ...newArtworks[index], 
        image: file,
        preview: URL.createObjectURL(file)
      };
      setArtworks(newArtworks);
    }
  };

  const handleSubmit = async () => {
    const hasEmptyFields = artworks.some(artwork => !artwork.title || !artwork.image);
    
    if (hasEmptyFields) {
      toast({
        title: "Missing information",
        description: "Please provide a title and image for each artwork.",
        variant: "destructive",
      });
      return;
    }

    let allUploaded = true;

    for (const artwork of artworks) {
      const formData = new FormData();
      formData.append("title", artwork.title);
      formData.append("description", artwork.description || "");
      formData.append("medium", artwork.medium);
      formData.append("galleryId", galleryId.toString());
      formData.append("userId", userId.toString());
      
      if (artwork.image) {
        formData.append("image", artwork.image);
      }

      try {
        await uploadArtworkMutation.mutateAsync(formData);
      } catch (error) {
        allUploaded = false;
      }
    }

    if (allUploaded) {
      toast({
        title: "Artworks uploaded successfully!",
        description: "Your gallery is now complete.",
      });
      onFinish();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-2xl font-bold">Add Artworks to Your Gallery</h2>
        <Button onClick={handleAddArtwork} variant="outline" className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Another Artwork
        </Button>
      </div>

      {artworks.map((artwork, index) => (
        <Card key={index} className="relative">
          {artworks.length > 1 && (
            <Button
              onClick={() => handleRemoveArtwork(index)}
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
            >
              <X size={18} />
            </Button>
          )}
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Artwork Title</Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="Enter artwork title"
                    value={artwork.title}
                    onChange={(e) => handleArtworkChange(index, "title", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`medium-${index}`}>Medium</Label>
                  <Select
                    value={artwork.medium}
                    onValueChange={(value) => handleArtworkChange(index, "medium", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediumOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    placeholder="Describe your artwork"
                    rows={4}
                    value={artwork.description}
                    onChange={(e) => handleArtworkChange(index, "description", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor={`image-${index}`}>Artwork Image</Label>
                {!artwork.preview ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-64 p-4 cursor-pointer hover:bg-gray-50">
                    <Input
                      id={`image-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    <Label htmlFor={`image-${index}`} className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <ImagePlus size={36} className="mb-2" />
                        <span className="text-sm font-medium">Click to upload image</span>
                        <span className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </div>
                    </Label>
                  </div>
                ) : (
                  <div className="relative border rounded-md overflow-hidden h-64">
                    <img
                      src={artwork.preview}
                      alt="Artwork preview"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={() => {
                        const newArtworks = [...artworks];
                        newArtworks[index] = { ...newArtworks[index], image: null, preview: "" };
                        setArtworks(newArtworks);
                      }}
                    >
                      Replace
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end space-x-4 mt-8">
        <Button variant="outline" onClick={onFinish}>
          Skip for Now
        </Button>
        <Button onClick={handleSubmit} disabled={uploadArtworkMutation.isPending} className="flex items-center gap-2">
          {uploadArtworkMutation.isPending ? "Uploading..." : "Upload Artworks"}
          <Upload size={16} />
        </Button>
      </div>
    </div>
  );
}
