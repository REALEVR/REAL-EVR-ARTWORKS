import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "@/contexts/user-context";
import ArtworkUpload from "@/components/artwork-upload";
import { apiRequest } from "@/lib/queryClient";

export default function GalleryCreate() {
  const [location, setLocation] = useLocation();
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [isCreatingGallery, setIsCreatingGallery] = useState(true);
  const [galleryData, setGalleryData] = useState({
    title: "",
    description: "",
    coverImage: null as File | null
  });
  const [createdGalleryId, setCreatedGalleryId] = useState<number | null>(null);

  // Redirect to login if not authenticated
  if (!user) {
    setLocation("/login?redirect=/create-gallery");
    return null;
  }

  const createGalleryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/galleries", formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Gallery created successfully!",
        description: "Now you can add artworks to your gallery.",
      });
      setIsCreatingGallery(false);
      setCreatedGalleryId(data.id);
    },
    onError: (error) => {
      toast({
        title: "Failed to create gallery",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!galleryData.title.trim()) {
      toast({
        title: "Gallery title required",
        description: "Please provide a title for your gallery.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", galleryData.title);
    formData.append("description", galleryData.description || "");
    formData.append("userId", user.id.toString());
    
    if (galleryData.coverImage) {
      formData.append("coverImage", galleryData.coverImage);
    }

    createGalleryMutation.mutate(formData);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryData({
        ...galleryData,
        coverImage: e.target.files[0]
      });
    }
  };

  const handleFinish = () => {
    if (createdGalleryId) {
      setLocation(`/gallery/${createdGalleryId}`);
    }
  };

  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">
          {isCreatingGallery ? "Create a New Gallery" : "Add Artworks to Your Gallery"}
        </h1>

        {isCreatingGallery ? (
          <Card className="max-w-2xl">
            <CardContent className="pt-6">
              <form onSubmit={handleCreateGallery}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Gallery Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter gallery title"
                      value={galleryData.title}
                      onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Gallery Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your gallery"
                      rows={4}
                      value={galleryData.description}
                      onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Gallery Cover Image</Label>
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                    {galleryData.coverImage && (
                      <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={URL.createObjectURL(galleryData.coverImage)}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={createGalleryMutation.isPending}
                    >
                      {createGalleryMutation.isPending ? "Creating..." : "Create Gallery"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div>
            <ArtworkUpload 
              galleryId={createdGalleryId!} 
              userId={user.id}
              onFinish={handleFinish}
            />
          </div>
        )}
      </div>
    </div>
  );
}
