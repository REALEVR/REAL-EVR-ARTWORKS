import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Exhibitions() {
  // Exhibition data with the provided URL
  const exhibitions = [
    {
      id: 1,
      title: "XENSION ART SPACE",
      description: "A virtual exhibition space featuring contemporary digital artwork",
      image: "https://images.unsplash.com/photo-1545989253-02cc26577f88?auto=format&fit=crop&w=800&h=450",
      url: "https://realevr.com/XENSION%20ART%20SPACE/",
      date: "Current Exhibition"
    },
    {
      id: 2,
      title: "Digital Renaissance",
      description: "Exploring the intersection of traditional techniques and digital tools",
      image: "https://images.unsplash.com/photo-1573096108468-702f6014ef28?auto=format&fit=crop&w=800&h=450",
      url: "#",
      date: "November 2023 - January 2024"
    },
    {
      id: 3,
      title: "Abstract Horizons",
      description: "A collective exhibition exploring abstract art in the digital era",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&h=450",
      url: "#",
      date: "September - October 2023"
    }
  ];

  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Featured Exhibitions</h1>
        <p className="text-gray-700 max-w-3xl mb-10">
          Explore curated virtual exhibitions featuring exceptional artists and galleries from around the world.
          These exhibitions showcase diverse styles, themes, and artistic approaches.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition) => (
            <Card key={exhibition.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
              <div className="relative h-48">
                <img
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-xl font-semibold mb-2">{exhibition.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{exhibition.date}</p>
                <p className="text-gray-700 mb-6 flex-1">{exhibition.description}</p>
                <Button asChild className="w-full">
                  <a 
                    href={exhibition.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Exhibition
                    <ExternalLink size={16} />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow">
          <h2 className="font-serif text-2xl font-semibold mb-4">Submit Your Exhibition</h2>
          <p className="text-gray-700 mb-6">
            Are you a curator or artist looking to host a virtual exhibition? We invite you to submit your proposal
            for consideration in our featured exhibitions section.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}