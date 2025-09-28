import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import logoImg from "../assets/logo-professional.svg";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src={logoImg} alt="REALEVR ART WORKS" className="h-11 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="font-medium text-sm text-white hover:text-accent transition-colors">
              Explore
            </Link>
            <Link href="/artists" className="font-medium text-sm text-white hover:text-accent transition-colors">
              Artists
            </Link>
            <Link href="/exhibitions" className="font-medium text-sm text-white hover:text-accent transition-colors">
              Exhibitions
            </Link>
            <Link href="/about" className="font-medium text-sm text-white hover:text-accent transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/register">Join</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Contact Form */}
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Have questions about creating your virtual gallery? Want to collaborate on an exhibition?
              Or just want to say hello? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1" data-aos="fade-right">
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <MessageCircle className="w-6 h-6 text-pink-500" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600">realevrug@gmail.com</p>
                      <p className="text-gray-600">srealevrug@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">+256 771891323</p>
                      <p className="text-gray-600">Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600">Kampala-Uganda</p>
                      <p className="text-gray-600">New Portbell Road</p>
                       <p className="text-gray-600">UICT-Nakawa Campus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2" data-aos="fade-left">
              <Card className="professional-card">
                <CardHeader>
                  <CardTitle className="text-xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20" data-aos="fade-up">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-xl text-center">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How do I create a virtual gallery?</h3>
                    <p className="text-gray-600 text-sm">Sign up for a free account and follow our step-by-step guide to create your first virtual exhibition space.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Is there a cost to use the platform?</h3>
                    <p className="text-gray-600 text-sm">We offer both free and premium plans. Basic galleries are free, with premium features available for advanced users.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can I sell artwork through the platform?</h3>
                    <p className="text-gray-600 text-sm">Yes! You can integrate with various e-commerce platforms or use our built-in sales tools to monetize your exhibitions.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How do I get featured on the homepage?</h3>
                    <p className="text-gray-600 text-sm">Outstanding galleries are selected by our curation team. Focus on quality content and unique exhibitions to increase your chances.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="REALEVR ART WORKS" className="h-8 w-auto" />
                <span className="font-bold text-lg">REAL EVR ARTWORKS</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">The premier platform for artists to create and share virtual gallery exhibitions with audiences worldwide.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">For Artists</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/create-gallery" className="hover:text-pink-500 transition-colors">Create Gallery</Link></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Artist Resources</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">For Visitors</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/explore" className="hover:text-pink-500 transition-colors">Explore Galleries</Link></li>
                <li><Link href="/artists" className="hover:text-pink-500 transition-colors">Featured Artists</Link></li>
                <li><Link href="/exhibitions" className="hover:text-pink-500 transition-colors">New Exhibitions</Link></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Art Styles</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Collect Art</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">About</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-pink-500 transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Press</a></li>
                <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-gray-800" />
          <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
            <p>© 2025 REALEVR ART WORKS. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
