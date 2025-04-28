import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeaturedArtists from "@/components/featured-artists";
import GalleryGrid from "@/components/gallery-grid";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { data: featuredGalleries, isLoading: isLoadingGalleries } = useQuery({
    queryKey: ["/api/galleries/featured"],
  });

  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="relative bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Art, <br />
              <span className="text-accent">Without Boundaries</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Create and share immersive virtual galleries that bring your artwork to audiences worldwide.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="font-medium">
                <Link href="/create-gallery">Create Your Gallery</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link href="/explore">Explore Galleries</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full hidden lg:block">
          <div className="relative h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=500&h=750" 
              alt="Art gallery exhibition" 
              className="absolute h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <FeaturedArtists />

      {/* Gallery Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-serif text-3xl font-bold">Explore Virtual Galleries</h2>
            <div className="flex space-x-4">
              <Link href="/explore" className="font-medium text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
          </div>
          
          <GalleryGrid galleries={featuredGalleries || []} isLoading={isLoadingGalleries} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Create Your Virtual Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and build your artist profile with a bio, contact information, and portfolio highlights.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Upload Your Artwork</h3>
              <p className="text-gray-600">Add high-quality images of your artwork with titles, descriptions, dimensions, and medium details.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Design Your Gallery</h3>
              <p className="text-gray-600">Customize your virtual exhibition space, arrange artworks, and create an immersive viewing experience.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="font-medium">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Showcase Your Artwork?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Join thousands of artists who are expanding their reach, connecting with art lovers, and selling their work through virtual galleries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/explore">Take a Tour</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
