import React from 'react';
import { Facebook, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">

          {/* Column 1: Our Mission */}
          <div>
            <h4 className="font-heading font-bold text-xl uppercase mb-6 text-white border-l-4 border-brand-red pl-3">
              Our Mission
            </h4>
            <ul className="space-y-3 text-gray-400 text-[15px] italic leading-relaxed list-disc pl-4 marker:text-brand-red">
              <li>To deliver high-quality programs and instruction for all ages</li>
              <li>To help every participant reach their goals and build confidence</li>
              <li>To create a positive impact for everyone and community growth</li>
            </ul>
          </div>

          {/* Column 2: Quick Links & Connect */}
          <div>
            <h4 className="font-heading font-bold text-xl uppercase mb-6 text-white border-l-4 border-brand-red pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[15px] text-gray-400 mb-8">
              <li><Link to="/" className="hover:text-brand-red transition-colors flex items-center"><span className="mr-2">›</span>Home</Link></li>
              <li><Link to="/programs" className="hover:text-brand-red transition-colors flex items-center"><span className="mr-2">›</span>Programs</Link></li>
              <li><Link to="/schedule" className="hover:text-brand-red transition-colors flex items-center"><span className="mr-2">›</span>Class Schedule</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors flex items-center"><span className="mr-2">›</span>Contact</Link></li>
            </ul>

            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors text-white">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] transition-colors text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 3: Our Location */}
          <div>
            <h4 className="font-heading font-bold text-xl uppercase mb-6 text-white border-l-4 border-brand-red pl-3">
              Our Location
            </h4>
            <div className="text-gray-400 text-[15px] leading-loose mb-6">
              <p className="font-bold text-white">Demo Academy</p>
              <p>123 Main Street</p>
              <p>Suite 100</p>
              <p>Your City, ST 12345</p>
              <p className="text-white mt-2">(555) 123-4567</p>
              <p className="text-white mt-2">hello@demo-academy.example</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-[13px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} Demo Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;