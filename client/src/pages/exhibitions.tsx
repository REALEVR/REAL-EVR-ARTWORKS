import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import logoImg from "../assets/logo-professional.svg";

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
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Exhibitions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore curated virtual exhibitions featuring exceptional artists and galleries from around the world.
              These exhibitions showcase diverse styles, themes, and artistic approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition) => (
              <Card key={exhibition.id} className="professional-card overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300" data-aos="fade-up">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ExternalLink size={16} className="text-gray-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold text-gray-900">{exhibition.title}</h3>
                    <span className="text-sm text-pink-500 font-medium">{exhibition.date}</span>
                  </div>
                  <p className="text-gray-600 mb-6 flex-1 leading-relaxed">{exhibition.description}</p>
                  <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
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

          <div className="mt-20" data-aos="fade-up">
            <Card className="professional-card max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Submit Your Exhibition</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Are you a curator or artist looking to host a virtual exhibition? We invite you to submit your proposal
                  for consideration in our featured exhibitions section. Join our community of creative visionaries!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                    <Link href="/contact">📧 Contact Us</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Link href="/create-gallery">🎨 Create Gallery</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}