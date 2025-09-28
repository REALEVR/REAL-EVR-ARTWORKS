import { motion } from "framer-motion";
import { Parallax } from "@/components/ui/parallax";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImg from "../assets/logo-professional.svg";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60"
            alt="Virtual Art Gallery Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <img src={logoImg} alt="REALEVR ART WORKS" className="h-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Redefining Digital Art Experiences
            </h1>
            <p className="text-xl text-gray-300">
              Where creativity meets technology in immersive virtual art spaces
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Decorative artistic elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-10">🎨</div>
        <div className="absolute top-20 right-20 text-4xl opacity-10">🖌️</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10">🖼️</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-10">✨</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6">
                REALEVR ARTWORKS bridges the gap between creativity and technology, empowering artists
                with dynamic virtual galleries that bring their vision to life. Whether you're showcasing
                a personal collection, hosting a digital art show, or curating a themed exhibition,
                we offer a modern, immersive alternative to traditional art spaces.
              </p>
              <Button asChild className="mt-4">
                <Link href="/explore">Explore Galleries</Link>
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop&q=60"
                alt="Modern Virtual Art Gallery Exhibition"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        {/* Artistic decorative elements */}
        <div className="absolute top-16 left-16 text-2xl opacity-20">🎭</div>
        <div className="absolute top-10 right-16 text-3xl opacity-20">🖼️</div>
        <div className="absolute bottom-16 left-10 text-4xl opacity-20">🎨</div>
        <div className="absolute bottom-20 right-20 text-2xl opacity-20">✨</div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🖼️"
              title="Virtual Art Galleries"
              description="Custom-designed spaces tailored to each artist's theme, style, or collection."
            />
            <FeatureCard
              icon="🥽"
              title="Immersive 3D Tours"
              description="Visitors can walk through your exhibition as if they were there in person."
            />
            <FeatureCard
              icon="🌎"
              title="Global Reach"
              description="Share your work with an international audience, 24/7, without the limits of physical location."
            />
            <FeatureCard
              icon="💰"
              title="Sales Integration"
              description="Link your works directly to purchase platforms or contact forms, enabling sales straight from your gallery."
            />
          </div>
        </div>
      </section>

      {/* Parallax Quote */}
      <Parallax className="py-32 text-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-30 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60"
            alt="Artistic Paint Brushes and Colors"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-serif italic mb-6 max-w-4xl mx-auto leading-relaxed">
            "At REALEVR ARTWORKS, we believe that art should be seen, felt, and explored, no matter where you are.
            By combining artistic expression with virtual technology, we're helping creatives thrive in a digital-first world."
          </h2>
        </div>
      </Parallax>

      {/* For Artists Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Artistic decorative elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-15">🖌️</div>
        <div className="absolute top-16 right-16 text-3xl opacity-15">🎭</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-15">🖼️</div>
        <div className="absolute bottom-16 right-10 text-2xl opacity-15">✨</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden shadow-2xl order-2 md:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&auto=format&fit=crop&q=60"
                alt="Artist Creating Digital Art on Computer"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-white">For Every Creative</h2>
              <p className="text-gray-300 text-lg mb-6">
                Whether you're a painter, photographer, sculptor, digital artist, or curator,
                REALEVR ARTWORKS is your canvas in the cloud. Our platform provides the tools to
                showcase your work in ways that traditional galleries cannot offer - with interactive elements,
                global accessibility, and immersive experiences that bring your art to life.
              </p>
              <Button asChild variant="outline" className="text-lg bg-black text-white">
                <Link href="/register">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900 text-center relative">
        {/* Artistic decorative elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20">🎨</div>
        <div className="absolute top-16 right-20 text-3xl opacity-20">🖼️</div>
        <div className="absolute bottom-20 left-16 text-5xl opacity-20">✨</div>
        <div className="absolute bottom-10 right-16 text-2xl opacity-20">🎭</div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Ready to Transform Your Art Experience?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join REALEVR ARTWORKS today and discover a new dimension for your creative expression
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link href="/create-gallery">Create Your Gallery</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg bg-black text-white">
              <Link href="/explore">Explore Exhibitions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg h-full"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}