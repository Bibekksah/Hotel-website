import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaPhoneAlt, FaQrcode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import QRCodeModal from './QRCodeModal';
import rchLogo from '../photos/logo/RCH.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu & Boutique', path: '/menu' },
    { name: 'Sweets Gallery', path: '/gallery' },
    { name: 'Contact Boutique', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-gold/15 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand Name */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img 
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                src={rchLogo} 
                alt="Roshani Chaat House Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-gold/50 shadow-lg group-hover:gold-glow transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient">
                  ROSHANI
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-chocolate/80 -mt-1 font-semibold">
                  Chaat House
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-sans text-sm tracking-widest uppercase transition-colors duration-300 py-1 ${
                    isActive(link.path)
                      ? 'text-gold font-semibold'
                      : 'text-chocolate/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Luxury Contact & QR Code Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center space-x-1.5 bg-gold/15 hover:bg-gold hover:text-charcoal text-gold border border-gold/40 px-3.5 py-2 rounded-full transition-all duration-300 shadow-md font-sans text-xs tracking-wider uppercase font-bold"
                title="Scan QR Code to open offline on phone"
              >
                <FaQrcode className="w-3.5 h-3.5" />
                <span>Offline QR</span>
              </button>

              <a
                href="https://wa.me/9779800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-chocolate hover:bg-gold hover:text-coffee text-cream rounded-full transition-all duration-300 shadow-md flex items-center justify-center border border-gold/20"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="tel:+977014000000"
                className="flex items-center space-x-2 bg-gradient-to-r from-coffee to-chocolate text-cream hover:from-gold hover:to-gold-light hover:text-coffee border border-gold/30 px-4 py-2 rounded-full transition-all duration-300 shadow-md font-sans text-xs tracking-widest uppercase font-semibold"
              >
                <FaPhoneAlt className="w-3 h-3 text-gold hover:text-coffee" />
                <span>Call</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="p-2 text-gold hover:text-gold-light border border-gold/30 rounded-full bg-gold/10"
                title="Scan QR Code for Offline Menu"
              >
                <FaQrcode className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-chocolate hover:text-gold focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t border-gold/15"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-lg font-sans text-sm tracking-widest uppercase font-medium ${
                      isActive(link.path)
                        ? 'bg-gold/10 text-gold font-semibold'
                        : 'text-chocolate hover:bg-gold/5 hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsQRModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gold text-charcoal py-3 rounded-xl font-sans text-xs tracking-widest uppercase font-bold shadow-md"
                >
                  <FaQrcode className="w-4 h-4" />
                  <span>Scan QR Code (Offline Menu)</span>
                </button>

                <div className="pt-4 border-t border-gold/10 flex items-center justify-between px-3">
                  <span className="text-xs text-chocolate/60 tracking-wider">Connect with us:</span>
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://wa.me/9779800000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-chocolate text-cream rounded-full"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                    <a
                      href="tel:+977014000000"
                      className="p-2.5 bg-chocolate text-cream rounded-full"
                    >
                      <FaPhoneAlt className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </>
  );
}

