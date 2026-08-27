import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaAward, FaCrown, FaLeaf, FaClock } from 'react-icons/fa';
import { initialProducts } from '../data/products';
import rchLogo from '../photos/logo/RCH.png';

// Helper component for floating vector sweets in Hero Background
function FloatingSweet({ delay, x, y, size, icon, name }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.15, 0.45, 0.15],
        scale: [1, 1.1, 1],
        y: [0, -30, 0],
        rotate: [0, 45, 0]
      }}
      transition={{ 
        duration: 8 + delay, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay 
      }}
      style={{ left: x, top: y }}
      className="absolute pointer-events-none select-none z-0"
    >
      <div className="flex flex-col items-center">
        <div className="bg-gold/10 border border-gold/20 backdrop-blur-md rounded-full p-4 text-gold flex items-center justify-center shadow-lg" style={{ width: size, height: size }}>
          <span className="font-serif text-lg font-bold">{icon}</span>
        </div>
        <span className="text-[9px] font-sans tracking-widest text-gold-light mt-1.5 uppercase font-medium bg-charcoal/40 px-2 py-0.5 rounded-full">{name}</span>
      </div>
    </motion.div>
  );
}

export default function Home({ onOpenProduct }) {
  // Select top featured popular sweets for homepage preview
  const featuredSweets = initialProducts
    .filter(p => p.popular && (p.category === 'sweets' || p.category === 'khuwa'))
    .slice(0, 4);

  // Floating sweet coordinates & icons for Hero Section
  const floatingAssets = [
    { delay: 0, x: '8%', y: '25%', size: 64, icon: '❁', name: 'Peda' },
    { delay: 2, x: '85%', y: '18%', size: 72, icon: '✦', name: 'Kaju Katli' },
    { delay: 4, x: '78%', y: '68%', size: 60, icon: '❈', name: 'Laddu' },
    { delay: 1, x: '12%', y: '72%', size: 68, icon: '✹', name: 'Lal Mohan' }
  ];

  return (
    <div className="overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-gold/20 bg-gradient-to-b from-[#2C1810] to-[#161616] py-20">
        <div className="absolute inset-0 bg-luxury-bg-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_60%)] pointer-events-none" />

        {floatingAssets.map((asset, idx) => (
          <FloatingSweet key={idx} {...asset} />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-gold/30 bg-[#24130d]/85 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/60 via-gold-light/20 to-transparent blur-3xl" />
                  <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-[6px] border-gold/70 bg-[#1d110b] p-2 shadow-[0_20px_60px_rgba(212,175,55,0.3)] sm:h-44 sm:w-44">
                    <img
                      src={rchLogo}
                      alt="Roshani Chaat House logo"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 flex justify-center lg:justify-start"
                >
                  <span className="rounded-full border border-gold/30 bg-charcoal/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold shadow-md sm:text-xs">
                    👑 The Royal Taste of Golbazar
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-serif text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl"
                >
                  <span className="block">Floating Luxury</span>
                  <span className="mt-1 block text-gold-gradient">For Every Bite</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mx-auto mt-4 max-w-2xl font-sans text-sm tracking-[0.2em] text-cream/70 sm:text-base lg:mx-0"
                >
                  Traditional sweets, fresh milk delights, and a premium experience wrapped in a floating 3D-inspired welcome.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
                >
                  <Link
                    to="/menu"
                    className="w-full rounded-full border border-gold/30 bg-gradient-to-r from-[#D4AF37] to-[#FFEAB5] px-8 py-3.5 text-center font-sans text-xs font-bold uppercase tracking-widest text-charcoal shadow-lg transition-all duration-500 hover:from-[#FFEAB5] hover:to-[#D4AF37] sm:w-auto"
                  >
                    Explore Menu
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full rounded-full border border-gold/30 bg-charcoal/60 px-8 py-3.5 text-center font-sans text-xs font-bold uppercase tracking-widest text-cream transition-all duration-500 hover:bg-gold/10 sm:w-auto"
                  >
                    Visit Boutique
                  </Link>
                  <Link
                    to="/gallery"
                    className="flex w-full items-center justify-center space-x-1.5 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream transition-all duration-500 hover:text-gold sm:w-auto"
                  >
                    <span>View Gallery</span>
                    <FaChevronRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HERITAGE SECTION ================= */}
      <section className="py-20 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Mockup Stand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square max-w-md mx-auto w-full bg-gradient-to-b from-[#2C1810] to-[#161616] border-2 border-gold/25 rounded-3xl p-6 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
              <div className="w-56 h-56 rounded-full border-4 border-gold/40 flex flex-col items-center justify-center p-2 text-center bg-coffee shadow-2xl overflow-hidden relative">
                <img src={rchLogo} alt="Roshani Chaat House Emblem" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="font-serif italic text-gold text-base">"Fresh milk reduced to golden perfection."</p>
              </div>
            </motion.div>

            {/* Heritage details */}
            <div className="space-y-6 lg:pl-6 text-center lg:text-left">
              <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-bold">Our Heritage</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-coffee font-semibold tracking-wide leading-tight">
                Authentic Craftsmanship & Rich Dairy Legacy
              </h2>
              <div className="h-[2px] w-20 bg-gold mx-auto lg:mx-0" />
              <p className="font-sans text-sm text-chocolate/80 leading-relaxed">
                Roshani Chaat House is Golbazar's premier boutique destination for authentic milk items, rich khuwa fudge, and delicious crispy snacks. Founded on principles of purity and quality, we prepare our products daily using fresh milk sourced from local farms and processed under strict hygienic standards.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 text-left">
                <div className="bg-beige/40 border border-gold/10 p-4 rounded-2xl flex items-start space-x-3">
                  <FaCrown className="text-gold w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-coffee">Pure Ingredients</h4>
                    <p className="text-[11px] text-chocolate/60 font-sans mt-0.5">Cooked strictly in premium pure ghee.</p>
                  </div>
                </div>
                <div className="bg-beige/40 border border-gold/10 p-4 rounded-2xl flex items-start space-x-3">
                  <FaLeaf className="text-gold w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-coffee">Fresh Daily</h4>
                    <p className="text-[11px] text-chocolate/60 font-sans mt-0.5">Sweets prepared every single morning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED BOUTIQUE GALLERY ================= */}
      <section className="py-20 bg-[#FFFDF9] border-t border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-bold">Chef's Recommendations</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-coffee font-semibold tracking-wide">Featured Luxury Delicacies</h2>
            <div className="h-[2px] w-20 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredSweets.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-cream border border-gold/15 hover:border-gold rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 group text-center flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square w-24 h-24 rounded-full bg-coffee border-2 border-gold/40 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-full filter drop-shadow-md"
                      />
                    ) : (
                      <span className="text-gold font-serif text-2xl font-bold">{product.name.charAt(0)}</span>
                    )}
                  </div>
                  <h4 className="font-serif text-base text-coffee font-semibold tracking-wide">{product.name}</h4>
                  <p className="text-xs text-chocolate/50 font-sans mt-1 uppercase tracking-wider">{product.category}</p>
                  <p className="text-xs text-chocolate/70 leading-relaxed font-sans mt-2.5 line-clamp-2 pr-2">{product.description}</p>
                </div>
                <div className="pt-4 border-t border-gold/10 mt-4 flex items-center justify-between">
                  <span className="font-serif font-bold text-coffee">Rs. {product.priceOptions[0].price} <span className="text-[10px] text-chocolate/50 font-sans">/{product.priceOptions[0].unit}</span></span>
                  <button 
                    onClick={() => onOpenProduct(product)}
                    className="text-xs font-sans text-gold hover:text-chocolate uppercase tracking-widest font-bold transition-colors"
                  >
                    View Info
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-12">
            <Link
              to="/menu"
              className="bg-gradient-to-r from-coffee to-chocolate text-cream hover:from-gold hover:to-gold-light hover:text-coffee border border-gold/20 px-8 py-3.5 rounded-full transition-all duration-300 shadow-md font-sans text-xs tracking-widest uppercase font-bold inline-block"
            >
              Explore Full Hotel Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ================= QUALITY CORNERSTONES ================= */}
      <section className="py-20 bg-charcoal text-cream relative">
        <div className="absolute inset-0 bg-luxury-bg-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6 border border-gold/10 rounded-2xl bg-coffee/30">
              <FaAward className="w-8 h-8 text-gold mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-gold tracking-wide">Heritage Recipes</h3>
              <p className="text-sm text-cream/70 font-sans leading-relaxed">Crafted using authentic techniques passed down through generations of sweet artisans.</p>
            </div>
            <div className="text-center space-y-3 p-6 border border-gold/10 rounded-2xl bg-coffee/30">
              <FaClock className="text-gold w-8 h-8 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-gold tracking-wide">Fresh Batches Daily</h3>
              <p className="text-sm text-cream/70 font-sans leading-relaxed">No preservatives. Sweets are prepared early in the morning and sold out completely fresh.</p>
            </div>
            <div className="text-center space-y-3 p-6 border border-gold/10 rounded-2xl bg-coffee/30">
              <FaCrown className="w-8 h-8 text-gold mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-gold tracking-wide">Royal Packaging</h3>
              <p className="text-sm text-cream/70 font-sans leading-relaxed">Deluxe, premium sweet boxes styled in gold and velvet ribbons, perfect for gifting and festivals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
