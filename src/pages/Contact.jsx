import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('sweets-order');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending inquiry
    const inquiry = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString().split('T')[0]
    };

    const stored = localStorage.getItem('roshani_inquiries') || '[]';
    const parsed = JSON.parse(stored);
    parsed.push(inquiry);
    localStorage.setItem('roshani_inquiries', JSON.stringify(parsed));

    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ================= HEADER ================= */}
      <div className="text-center space-y-4 mb-16">
        <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-bold">
          Connect With Us
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-coffee font-semibold tracking-wide">
          Hotel Location & Inquiries
        </h2>
        <div className="h-[2px] w-20 bg-gold mx-auto" />
        <p className="font-sans text-sm text-chocolate/75 max-w-2xl mx-auto leading-relaxed">
          Order bulk sweets for weddings, religious ceremonies, and family gatherings. Visit our premium  sweet shop in Golbazar Chowk, Siraha, Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact details & Map (col-span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Details Card */}
          <div className="bg-cream border border-gold/20 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            <h3 className="font-serif text-xl text-coffee font-bold tracking-wide border-b border-gold/10 pb-3">
              Hotel Details
            </h3>

            <div className="space-y-4 text-sm font-sans text-chocolate">
              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <FaMapMarkerAlt className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-coffee">Hotel Location</p>
                  <p className="text-xs text-chocolate/70 mt-0.5">Golbazar Chowk, Siraha, Nepal</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3.5">
                <FaPhoneAlt className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-coffee">Direct Line</p>
                  <a href="tel:+977041520000" className="text-xs text-chocolate/70 hover:text-gold transition-colors mt-0.5 block">+977 041-520000</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3.5">
                <FaWhatsapp className="w-4.5 h-4.5 text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-coffee">WhatsApp Concierge</p>
                  <a 
                    href="https://wa.me/9779800000000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-chocolate/70 hover:text-gold transition-colors mt-0.5 block"
                  >
                    +977 980-0000000 (Click to Chat)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <FaEnvelope className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-coffee">Email Address</p>
                  <a href="mailto:info@roshanisweets.com" className="text-xs text-chocolate/70 hover:text-gold transition-colors mt-0.5 block">info@roshanisweets.com</a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3.5 border-t border-gold/10 pt-4 mt-2">
                <FaClock className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-coffee">Hotel Operating Hours</p>
                  <p className="text-xs text-chocolate/70 mt-0.5">Monday – Sunday: 7:00 AM – 9:30 PM (NPT)</p>
                  <p className="text-[10px] text-gold font-semibold tracking-wider uppercase mt-1">Open on all public holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Chat CTAs */}
          <div className="flex gap-4">
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-2xl shadow-md font-sans text-xs tracking-wider uppercase font-bold transition-colors duration-300"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="tel:+977041520000"
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/25 py-3.5 rounded-2xl shadow-md font-sans text-xs tracking-wider uppercase font-bold transition-all duration-300"
            >
              <FaPhoneAlt className="w-3.5 h-3.5" />
              <span>Call Direct</span>
            </a>
          </div>
        </div>

        {/* Right Side: Inquiry Form & Map Embed (col-span 7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Glassmorphic Contact Form */}
          <div className="bg-[#FFFDF9] border border-gold/15 p-6 sm:p-8 rounded-3xl shadow-sm">
            <h3 className="font-serif text-xl text-coffee font-bold tracking-wide mb-6">
              Send a Special Request or Order Inquiry
            </h3>

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-3 rounded-xl flex items-center space-x-2 mb-6"
              >
                <FaCheckCircle className="text-green-600 w-4 h-4 shrink-0" />
                <span className="font-medium">Thank you! Your inquiry has been sent to our boutique team. We will contact you soon.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Bibek Sah"
                    className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold transition-colors text-coffee"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., bibek@gmail.com"
                    className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold transition-colors text-coffee"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Inquiry Type</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold transition-colors text-coffee cursor-pointer font-sans"
                >
                  <option value="sweets-order">Custom Sweets Box Order</option>
                  <option value="catering">Wedding / Festival Catering</option>
                  <option value="feedback">General Inquiry / Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Inquiry Details</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Details about quantities, delivery dates, or specific sweet items..."
                  className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors text-coffee resize-none"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/20 px-8 py-3 rounded-xl transition-all duration-300 shadow-md font-sans text-xs tracking-widest uppercase font-bold flex items-center justify-center space-x-2 mx-auto sm:mr-0"
                >
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="w-full h-80 rounded-3xl overflow-hidden border border-gold/25 shadow-md bg-cream relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.203929424759!2d85.92211634597014!3d26.726839352932148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec133fd88d5e1f%3A0xe54d3e23cbf9ec3b!2sRamanand%20Chowk%2C%20Janakpur%2045200!5e0!3m2!1sen!2snp!4v1719660000000!5e0!3m2!1sen!2snp!4v1719660000000!5e0"
              className="w-full h-full border-0 filter contrast-105 brightness-95" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Roshani Sweet Hotel Map Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
