import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArtworkSchema, mediumTypes, Gallery } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";

// Extend the insertArtworkSchema for form validation
const formSchema = insertArtworkSchema.extend({
  image: z.instanceof(FileList).refine(files => files.length > 0, {
    message: "Artwork image is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const UploadArtwork = () => {
  const { galleryId } = useParams();
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }
  
  // Fetch gallery to check ownership
  const { data: gallery, isLoading: isLoadingGallery } = useQuery<Gallery>({
    queryKey: [`/api/galleries/${galleryId}`],
  });
  
  // Check if user owns the gallery
  const isOwner = gallery && user && gallery.userId === user.id;
  
  // Redirect if not the owner
  if (!isLoadingGallery && !isOwner) {
    navigate("/explore");
    return null;
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user.id,
      galleryId: parseInt(galleryId || "0"),
      title: "",
      description: "",
      medium: "",
    },
  });
  
  const createArtworkMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const formData = new FormData();
      formData.append("userId", String(data.userId));
      formData.append("galleryId", String(data.galleryId));
      formData.append("title", data.title);
      
      if (data.description) {
        formData.append("description", data.description);
      }
      
      if (data.medium) {
        formData.append("medium", data.medium);
      }
      
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      
      const response = await apiRequest("POST", "/api/artworks", formData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/galleries/${galleryId}/artworks`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user.id}/artworks`] });
      
      toast({
        title: "Artwork uploaded!",
        description: "Your artwork has been added to the gallery.",
      });
      
      navigate(`/gallery/${galleryId}`);
    },
    onError: (error) => {
      toast({
        title: "Error uploading artwork",
        description: error.message || "There was an error uploading your artwork. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: FormValues) => {
    createArtworkMutation.mutate(values);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="link" 
          className="mb-6 pl-0 text-accent"
          onClick={() => navigate(`/gallery/${galleryId}`)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to gallery
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Upload Artwork</CardTitle>
              <CardDescription>
                Add a new piece to your gallery with details about your artwork
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Artwork Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="artworkImage"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleImageChange(e);
                              }}
                              {...fieldProps}
                            />
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                                imagePreview ? 'border-accent' : 'border-gray-300'
                              }`}
                              onClick={() => document.getElementById('artworkImage')?.click()}
                            >
                              {imagePreview ? (
                                <div className="space-y-4">
                                  <img 
                                    src={imagePreview} 
                                    alt="Artwork preview" 
                                    className="mx-auto max-h-64 rounded-md"
                                  />
                                  <p className="text-sm text-gray-500">Click to change image</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                  <p className="text-sm font-medium">Click to upload artwork image</p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artwork Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter artwork title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell the story behind your artwork" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your artwork, inspiration, or techniques used
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select medium" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mediumTypes.map((medium) => (
                              <SelectItem key={medium} value={medium}>
                                {medium}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The primary medium or technique used for this artwork
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate(`/gallery/${galleryId}`)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={createArtworkMutation.isPending}
                    >
                      {createArtworkMutation.isPending ? "Uploading..." : "Upload Artwork"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadArtwork;
