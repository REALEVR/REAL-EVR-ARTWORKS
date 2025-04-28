import { Link } from "wouter";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Artscape</h3>
            <p className="text-gray-300 text-sm">
              The premier platform for artists to create and share virtual gallery exhibitions with audiences worldwide.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-accent font-medium mb-4">For Artists</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/create-gallery">
                  <a className="hover:text-white transition-colors">Create Gallery</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="hover:text-white transition-colors">Artist Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="hover:text-white transition-colors">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/success-stories">
                  <a className="hover:text-white transition-colors">Success Stories</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a className="hover:text-white transition-colors">Help Center</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-accent font-medium mb-4">For Visitors</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/explore">
                  <a className="hover:text-white transition-colors">Explore Galleries</a>
                </Link>
              </li>
              <li>
                <Link href="/artists">
                  <a className="hover:text-white transition-colors">Featured Artists</a>
                </Link>
              </li>
              <li>
                <Link href="/exhibitions">
                  <a className="hover:text-white transition-colors">New Exhibitions</a>
                </Link>
              </li>
              <li>
                <Link href="/styles">
                  <a className="hover:text-white transition-colors">Art Styles</a>
                </Link>
              </li>
              <li>
                <Link href="/collect">
                  <a className="hover:text-white transition-colors">Collect Art</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-accent font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/mission">
                  <a className="hover:text-white transition-colors">Our Mission</a>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <a className="hover:text-white transition-colors">Team</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="hover:text-white transition-colors">Press</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="hover:text-white transition-colors">Careers</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} Artscape. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link href="/terms">
              <a className="hover:text-white transition-colors">Terms of Service</a>
            </Link>
            <Link href="/privacy">
              <a className="hover:text-white transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/cookies">
              <a className="hover:text-white transition-colors">Cookies</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
