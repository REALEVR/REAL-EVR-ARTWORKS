import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import FeaturedArtists from "@/components/featured-artists";
import GalleryGrid from "@/components/gallery-grid";
import logoImg from "../assets/logo-professional.svg";

const artworks = [
  {
    id: 1,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "1503",
    src: "https://www.thedigitalpictureframe.com/wp-content/uploads/Mona-Lisa-690x1024.jpg",
    description: "Discover iconic works like the Mona Lisa inside our immersive digital exhibitions.",
  },
  {
    id: 2,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1498",
    src: "https://www.thedigitalpictureframe.com/wp-content/uploads/The-last-supper-1.jpg",
    description: "Experience timeless masterpieces like The Last Supper reimagined in virtual space.",
  },
  {
    id: 3,
    title: "Abstract Color Field",
    artist: "Mariette Katarahweire",
    year: "2023",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60",
    description: "Dive into vibrant compositions that redefine modern abstraction.",
  },
  {
    id: 4,
    title: "Mountain Mist",
    artist: "Ivan Orisa",
    year: "2022",
    src: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=300&auto=format&fit=crop&q=60",
    description: "Feel the serenity of nature through expressive mountain sceneries.",
  },
  {
    id: 5,
    title: "Tranquil Reflection",
    artist: "Michelle Munira",
    year: "2024",
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&auto=format&fit=crop&q=60",
    description: "Witness peaceful stillness captured through gentle color and form.",
  },
];

export default function Home() {
  const { data: featuredGalleries, isLoading: isLoadingGalleries } = useQuery({
    queryKey: ["/api/galleries/featured"],
  });

  const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with background image */}
      <section className="relative py-20 md:py-32 text-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=300&auto=format&fit=crop&q=60"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <img src={logoImg} alt="REALEVR ART WORKS" className="h-20 w-auto mx-auto mb-8 drop-shadow-lg" />
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-shadow-lg">
              Transform Your Art Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">Digital Masterpieces</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Create immersive virtual galleries that showcase your artwork in stunning digital environments. Reach art enthusiasts worldwide and transcend the limitations of traditional exhibition spaces with our cutting-edge platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button asChild size="lg" className="font-semibold px-8 py-4 btn-primary">
                <Link href="/create-gallery">Start Creating</Link>
              </Button>
              <Button asChild size="lg" className="font-semibold px-8 py-4 btn-secondary">
                <Link href="/explore">Discover Art</Link>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">10,000+</div>
                <div className="text-muted-foreground">Artworks Displayed</div>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-muted-foreground">Artists Featured</div>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="600">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1M+</div>
                <div className="text-muted-foreground">Visitors Engaged</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg max-w-lg w-full shadow-xl p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-foreground hover:text-destructive text-xl"
              onClick={() => setSelectedArtwork(null)}
            >
              &times;
            </button>
            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              className="w-full h-80 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-foreground">{selectedArtwork.title}</h2>
            <p className="text-muted-foreground mb-1">
              <strong>Artist:</strong> {selectedArtwork.artist}
            </p>
            <p className="text-muted-foreground">
              <strong>Year:</strong> {selectedArtwork.year}
            </p>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">RealEVR Artworks?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Experience the next evolution in art exhibition with our advanced virtual gallery platform designed for the modern creative professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Immersive 3D Galleries</h3>
              <p className="text-muted-foreground">
                Design sophisticated virtual environments that present your artwork with unparalleled depth and interactivity
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Global Reach</h3>
              <p className="text-muted-foreground">
                Expand your audience beyond borders with seamless access for art collectors and enthusiasts across the globe
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="600">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Interactive Experience</h3>
              <p className="text-muted-foreground">
                Captivate your audience with rich interactions, comprehensive artwork details, and integrated social connectivity
              </p>
            </div>
          </div>

          {/* Overlapping Artwork Showcase */}
          <div className="hidden lg:flex justify-center items-center mt-16" data-aos="fade-up" data-aos-delay="800">
            <div className="relative">
              {artworks.slice(0, 3).map((art, index) => (
                <div
                  key={art.id}
                  className={`absolute h-[300px] w-[200px] shadow-2xl rounded-lg overflow-hidden transition-all duration-500 hover:scale-110 cursor-pointer glass ${
                    index === 0 ? "z-30 left-0 top-0" : ""
                  } ${
                    index === 1 ? "z-20 left-16 top-8" : ""
                  } ${
                    index === 2 ? "z-10 left-32 top-4" : ""
                  }`}
                  onClick={() => setSelectedArtwork(art)}
                >
                  <img
                    src={art.src}
                    alt={art.title}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs">
                    <div className="font-bold">{art.title}</div>
                    <div className="text-gray-300">{art.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Artists Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Discover how leading artists and creative professionals are transforming their practice with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-foreground">Mariette Katarahweire</h4>
                  <p className="text-muted-foreground">Digital Artist</p>
                </div>
              </div>
              <p className="text-card-foreground italic">
                "RealEVR Artworks has fundamentally transformed my artistic practice. The sophisticated gallery environments elevate my digital work to unprecedented levels of engagement and professionalism."
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  I
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-foreground">Ivan Orisa</h4>
                  <p className="text-muted-foreground">Contemporary Painter</p>
                </div>
              </div>
              <p className="text-card-foreground italic">
                "The international accessibility is remarkable. My traditional paintings now reach discerning collectors globally, eliminating the constraints of physical gallery spaces entirely."
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border" data-aos="fade-up" data-aos-delay="600">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-foreground">Michelle Munira</h4>
                  <p className="text-muted-foreground">Mixed Media Artist</p>
                </div>
              </div>
              <p className="text-card-foreground italic">
                "The advanced interactive capabilities enable genuine engagement with my artwork. It's equivalent to maintaining a dedicated, perpetually accessible gallery space."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <FeaturedArtists />

      {/* Gallery Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Virtual Galleries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover breathtaking collections from talented artists around the world
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              View All Galleries
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <GalleryGrid galleries={Array.isArray(featuredGalleries) ? featuredGalleries : []} isLoading={isLoadingGalleries} />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Elevate</span> Your Art?
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-muted-foreground">
              Join the forefront of digital art exhibition. Establish your professional virtual gallery and connect your creative vision with discerning art enthusiasts worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="font-semibold px-8 py-4 btn-primary">
                <Link href="/create-gallery">Begin Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold px-8 py-4 btn-secondary">
                <Link href="/register">Join the Platform</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}