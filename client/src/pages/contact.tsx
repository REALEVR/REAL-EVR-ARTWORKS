import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div className="text-lg font-bold">REAL EVR ARTWORKS</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="/explore" className="hover:text-gray-300">Explore</a>
          <a href="/artists" className="hover:text-gray-300">Artists</a>
          <a href="/exhibitions" className="hover:text-gray-300">Exhibitions</a>
          <a href="/about" className="hover:text-gray-300">About</a>
        </nav>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
          <button className="bg-white text-black px-4 py-2 rounded">Join</button>
        </div>
      </header>

      {/* Contact Form */}
      <main className="flex-grow py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mb-10">
            We'd love to hear from you! Fill out the form below and our team will get back to you.
          </p>
          <form className="grid grid-cols-1 gap-6">
            <input type="text" placeholder="Your Name" className="p-4 border rounded w-full" />
            <input type="email" placeholder="Your Email" className="p-4 border rounded w-full" />
            <textarea placeholder="Your Message" rows={6} className="p-4 border rounded w-full" />
            <button type="submit" className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 w-full">
              Send Message
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="font-bold text-lg mb-4">REAL EVR ARTWORKS</div>
            <p className="text-sm mb-4">The premier platform for artists to create and share virtual gallery exhibitions with audiences worldwide.</p>
            <div className="flex space-x-4">
              <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
              <a href="#"><img src="/icons/twitter.svg" alt="Twitter" /></a>
              <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">For Artists</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/.create-gallery">Create Gallery</a></li>
              <li><a href="artist-resources">Artist Resources</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/success-stories">Success Stories</a></li>
              <li><a href="/help-center">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">For Visitors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore-galleries">Explore Galleries</a></li>
              <li><a href="/featured-artists">Featured Artists</a></li>
              <li><a href="/new-exhibitons">New Exhibitions</a></li>
              <li><a href="/art-styles">Art Styles</a></li>
              <li><a href="/collect-art">Collect Art</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-800" />
        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© 2025 REALEVR ART WORKS. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
