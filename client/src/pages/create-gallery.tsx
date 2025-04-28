import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGallerySchema } from "@shared/schema";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Upload } from "lucide-react";

// Extend the insertGallerySchema for form validation
const formSchema = insertGallerySchema.extend({
  coverImage: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateGallery = () => {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user.id,
      title: "",
      description: "",
      featured: false,
    },
  });
  
  const createGalleryMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const formData = new FormData();
      formData.append("userId", String(data.userId));
      formData.append("title", data.title);
      
      if (data.description) {
        formData.append("description", data.description);
      }
      
      formData.append("featured", String(data.featured));
      
      if (data.coverImage && data.coverImage.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }
      
      const response = await apiRequest("POST", "/api/galleries", formData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/galleries'] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user.id}/galleries`] });
      
      toast({
        title: "Gallery created!",
        description: "Your gallery has been created successfully.",
      });
      
      navigate(`/gallery/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error creating gallery",
        description: error.message || "There was an error creating your gallery. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: FormValues) => {
    createGalleryMutation.mutate(values);
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverImagePreview(null);
    }
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="link" 
          className="mb-6 pl-0 text-accent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Create New Gallery</CardTitle>
              <CardDescription>
                Design your virtual gallery space to showcase your artwork collection
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallery Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter gallery title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Give your gallery a descriptive name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallery Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your gallery and the artwork it contains" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide context about your gallery and the artwork it contains
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="coverImage"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleCoverImageChange(e);
                              }}
                              {...fieldProps}
                            />
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                                coverImagePreview ? 'border-accent' : 'border-gray-300'
                              }`}
                              onClick={() => document.getElementById('coverImage')?.click()}
                            >
                              {coverImagePreview ? (
                                <div className="space-y-4">
                                  <img 
                                    src={coverImagePreview} 
                                    alt="Cover preview" 
                                    className="mx-auto max-h-64 rounded-md"
                                  />
                                  <p className="text-sm text-gray-500">Click to change image</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                  <p className="text-sm font-medium">Click to upload a cover image</p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          An engaging cover image helps attract visitors to your gallery
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Feature this gallery</FormLabel>
                          <FormDescription>
                            Request to have this gallery featured on the homepage (subject to approval)
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={createGalleryMutation.isPending}
                    >
                      {createGalleryMutation.isPending ? "Creating..." : "Create Gallery"}
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

export default CreateGallery;
