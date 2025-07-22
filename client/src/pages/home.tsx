import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import FeaturedArtists from "@/components/featured-artists";
import GalleryGrid from "@/components/gallery-grid";
import logoImg from "../assets/logo.png";

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
    <div className="bg-primary relative">
      {/* Hero Section with background image */}
      <section className="relative py-20 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=300&auto=format&fit=crop&q=60"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row justify-between items-center">
          <div className="max-w-xl mb-16 lg:mb-0 lg:mr-12" data-aos="fade-right">
            <img src={logoImg} alt="REALEVR ART WORKS" className="h-24 w-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Art, <br />
              <span className="text-accent">Without Boundaries</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Create and share immersive virtual galleries that bring your artwork to audiences worldwide.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="font-medium bg-white text-black hover:bg-white/90">
                <Link href="/create-gallery">Create Your Gallery</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium border-white text-black hover:bg-white/10">
                <Link href="/explore">Explore Galleries</Link>
              </Button>
            </div>
          </div>

          {/* Overlapping Artwork Cards */}
          <div className="hidden lg:flex flex-wrap gap-6 items-start" data-aos="fade-left">
            {artworks.map((art, index) => (
              <div
                key={art.id}
                className={`relative h-[460px] w-[300px] shadow-xl rounded-lg overflow-hidden transition-all duration-500 opacity-90 hover:scale-105 cursor-pointer ${index % 2 !== 0 ? "mt-10" : ""}`}
                onClick={() => setSelectedArtwork(art)}
              >
                <img
                  src={art.src}
                  alt={art.title}
                  className="h-full w-full object-cover object-center filter brightness-75"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
                  {art.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500 text-xl"
              onClick={() => setSelectedArtwork(null)}
            >
              &times;
            </button>
            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              className="w-full h-80 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedArtwork.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Artist:</strong> {selectedArtwork.artist}
            </p>
            <p className="text-gray-700">
              <strong>Year:</strong> {selectedArtwork.year}
            </p>
          </div>
        </div>
      )}

      {/* Featured Artists Section */}
      <FeaturedArtists />

      {/* Gallery Grid Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-serif text-3xl font-bold">Explore Virtual Galleries</h2>
            <Link href="/explore" className="font-medium text-sm text-accent hover:underline">
              View all
            </Link>
          </div>
          <GalleryGrid galleries={Array.isArray(featuredGalleries) ? featuredGalleries : []} isLoading={isLoadingGalleries} />
        </div>
      </section>
    </div>
  );
}