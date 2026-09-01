import React from 'react';
import { FaStar, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Tilt3DCard from './Tilt3DCard';

export default function ProductCard({ product, onOpenDetails }) {
  // Extract primary price for display
  const primaryPrice = product.priceOptions[0];
  const secondaryPrice = product.priceOptions[1];

  // Helper for category names
  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'sweets': return 'Traditional Sweet';
      case 'khuwa': return 'Khuwa Item';
      case 'snacks': return 'Chaat & Snack';
      case 'milk': return 'Pure Milk Item';
      case 'drinks': return 'Cold Drink';
      default: return 'Specialty';
    }
  };

  return (
    <Tilt3DCard
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-cream border border-gold/20 hover:border-gold rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col h-full w-full"
      >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.popular && (
          <span className="bg-gold text-charcoal text-[9px] font-sans tracking-widest uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
            Popular Choice
          </span>
        )}
        {product.new && (
          <span className="bg-chocolate text-cream text-[9px] font-sans tracking-widest uppercase font-bold px-2.5 py-1 rounded-full shadow-sm border border-gold/10">
            New Item
          </span>
        )}
        {!product.availability && (
          <span className="bg-red-700 text-cream text-[9px] font-sans tracking-widest uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
            Sold Out Today
          </span>
        )}
      </div>

      {/* Image Preview / Floating Sweet Stand Effect */}
      <div className="relative aspect-video w-full bg-gradient-to-b from-[#2C1810] to-[#161616] flex items-center justify-center overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
        
        {/* Sweet Presentation Plate stand representation */}
        <div className="absolute bottom-2 w-32 h-2.5 bg-gold/30 blur-sm rounded-full transform group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-3 w-28 h-1.5 bg-gold/10 rounded-full border border-gold/30 transform group-hover:scale-110 transition-transform duration-700" />

        {/* Display Image or Custom Text Plate */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-28 h-28 object-cover rounded-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 z-10 border-2 border-gold/30"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#3D2517] to-[#2C1810] border-2 border-gold/40 flex items-center justify-center shadow-lg transform group-hover:scale-115 transition-transform duration-700 z-10 group-hover:gold-glow">
            <span className="text-gold font-serif text-3xl font-bold tracking-widest">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-sans tracking-widest uppercase text-chocolate/60 font-semibold">
              {getCategoryLabel(product.category)}
            </span>
            <div className="flex items-center space-x-1 text-gold text-xs">
              <FaStar className="w-3.5 h-3.5 fill-current" />
              <span className="font-sans font-bold text-coffee">{product.rating.toFixed(1)}</span>
              <span className="text-chocolate/40 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="font-serif text-lg text-coffee font-semibold tracking-wide mb-1.5 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h4>

          {/* Short Description */}
          <p className="text-xs text-chocolate/75 font-sans leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Ingredients list snippets */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="bg-beige border border-gold/10 text-[9px] text-chocolate/80 px-2 py-0.5 rounded-full font-medium">
                {ing}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-[9px] text-chocolate/40 font-semibold px-1 py-0.5">+{product.ingredients.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Price & Actions Footer */}
        <div className="pt-3 border-t border-gold/10 flex items-center justify-between">
          <div className="flex flex-col">
            {/* Primary price */}
            <span className="font-serif font-bold text-base text-coffee flex items-baseline">
              Rs. {primaryPrice.price}
              <span className="text-[10px] font-sans text-chocolate/50 font-normal ml-1">/{primaryPrice.unit}</span>
            </span>
            {/* Secondary price if applicable */}
            {secondaryPrice && (
              <span className="text-[10px] text-chocolate/50 font-sans -mt-0.5">
                Rs. {secondaryPrice.price} /{secondaryPrice.unit}
              </span>
            )}
          </div>

          {/* Details CTA Button */}
          <button
            onClick={() => onOpenDetails(product, false)} // Open detail view
            className="flex items-center space-x-1 text-xs font-sans tracking-widest uppercase font-bold text-chocolate group-hover:text-gold transition-colors duration-300"
          >
            <span>Explore</span>
            <FaChevronRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      </motion.div>
    </Tilt3DCard>
  );
}
