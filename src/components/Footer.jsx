import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import rchLogo from '../photos/logo/RCH.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 border-t-2 border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={rchLogo} 
                alt="Roshani Logo" 
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/40 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient">
                  ROSHANI
                </span>
                <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold-light -mt-1 font-semibold">
                  Chaat House
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm text-cream/70 leading-relaxed max-w-sm pt-2">
              Bringing you the finest traditional Nepali and Indian sweet delicacies, handmade using age-old recipes, pure ghee, and fresh ingredients daily.
            </p>
            <div className="flex items-center space-x-3 pt-3">
              <a href="#" className="w-8 h-8 rounded-full bg-coffee hover:bg-gold hover:text-charcoal border border-gold/20 flex items-center justify-center transition-all duration-300">
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-coffee hover:bg-gold hover:text-charcoal border border-gold/20 flex items-center justify-center transition-all duration-300">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-coffee hover:bg-gold hover:text-charcoal border border-gold/20 flex items-center justify-center transition-all duration-300">
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6 border-b border-gold/20 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link to="/" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Home Boutique</Link>
              </li>
              <li>
                <Link to="/menu" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Interactive Menu</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Sweets Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Get in Touch</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6 border-b border-gold/20 pb-2 inline-block">
              Categories
            </h3>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link to="/menu?cat=sweets" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Traditional Sweets</Link>
              </li>
              <li>
                <Link to="/menu?cat=khuwa" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Khuwa Delicacies</Link>
              </li>
              <li>
                <Link to="/menu?cat=snacks" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Chaat & Snacks</Link>
              </li>
              <li>
                <Link to="/menu?cat=milk" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Pure Milk Items</Link>
              </li>
              <li>
                <Link to="/menu?cat=drinks" className="text-cream/80 hover:text-gold transition-colors tracking-wide">Cold Beverages</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif text-lg text-gold font-semibold tracking-wider mb-6 border-b border-gold/20 pb-2 inline-block">
              Hotel Hours
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-cream/80">Golbazar, Province 2, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="text-cream/80">+977 041-520000</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="text-cream/80">info@roshanisweets.com</span>
              </li>
              <li className="pt-2 border-t border-gold/15">
                <p className="text-gold font-medium tracking-wide">Open Daily</p>
                <p className="text-cream/70 text-xs mt-1">5:30 AM – 9:00 PM (NPT)</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gold/10 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 tracking-wider">
          <p>© {currentYear} Roshani Chaat House. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
